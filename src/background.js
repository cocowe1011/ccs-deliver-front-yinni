import { app, BrowserWindow, globalShortcut, ipcMain, Menu, dialog, Tray, screen } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import nodes7 from 'nodes7';
import HttpUtil from '@/utils/HttpUtil'
import logger from 'electron-log'
// 设置日志文件的保存路径
logger.transports.file.file = app.getPath("userData") + "/app.log";

// 初始化日志记录器
logger.transports.file.level = "info";
logger.transports.console.level = "info";
// 日期样式
logger.transports.file.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}'
console.log(app.getPath("userData"))
logger.transports.file.file = app.getPath("userData") + "/app.log";

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
var appTray = null;
let closeStatus = false;
var conn = new nodes7;
var pollingST = null;

// 全局变量定义
let javaProcess = null;
let healthCheckInterval = null;
let lastSuccessfulCheck = Date.now();
let isRestarting = false;
let restartAttempts = 0;
const MAX_RESTART_ATTEMPTS = 5;
const RESTART_ATTEMPT_RESET_INTERVAL = 1000 * 60 * 30; // 30分钟
const HEALTH_CHECK_INTERVAL = 2000; // 2秒
const HTTP_REQUEST_TIMEOUT = 2000;  // HTTP请求超时时间设为2秒

// 记录日志的辅助函数
function logToFile(message) {
  const timestamp = new Date().toLocaleString();
  const logPath = "D://css_temp_data/log/" + new Date().toLocaleDateString().replaceAll('/','-') + "runlog.txt";
  fs.appendFile(logPath, `[${timestamp}] ${message}\n`, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
}

// electron 开启热更新
try {
  require('electron-reloader')(module,{});
} catch (_) {}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

global.sharedObject = {
  userInfo: {}
}
let mainWindow = null;
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
    icon: './build/icons/icon.ico'
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    mainWindow.loadURL('app://./index.html');
    // mainWindow.webContents.openDevTools();
  }
  ipcMain.on('logStatus', (event, arg) => {
    console.log(arg)
    if(arg === 'login') {
      mainWindow.setResizable(true)
      mainWindow.setBounds({ x: 0, y: 0, width: screen.getPrimaryDisplay().workAreaSize.width, height: screen.getPrimaryDisplay().workAreaSize.height });
    } else {
      // 太几把坑了，windows系统setSize center方法失效 必须先mainWindow.unmaximize()
      mainWindow.unmaximize()
      mainWindow.setSize(1100, 600);
      mainWindow.center();
      global.sharedObject.userInfo = {}
      // mainWindow.setResizable(false)
    }
  })
  // 定义自定义事件
  ipcMain.on('close-window', function() {
    mainWindow.close();
  })
  // 定义自定义事件
  ipcMain.on('min-window', (event, arg) => {
    mainWindow.minimize();
  })
  // writeValuesToPLC
  ipcMain.on('writeValuesToPLC', (event, arg1, arg2) => {
    writeValuesToPLC(arg1, arg2);
  })
  // 定义自定义事件
  ipcMain.on('max-window', (event, arg) => {
    if (arg === 'max-window') {
      return mainWindow.maximize()
    }
    mainWindow.unmaximize()
    mainWindow.setBounds({ x: 10, y: 10, width: screen.getPrimaryDisplay().workAreaSize.width - 20, height: screen.getPrimaryDisplay().workAreaSize.height - 20 });
  })
  // 启动plc conPLC
  ipcMain.on('conPLC', (event, arg1, arg2) => {
    if (process.env.NODE_ENV === 'production') {
      conPLC();
    }
    // setInterval(() => {
    //   console.log(writeStrArr.toString());
    // }, 50);
    // sendHeartToPLC()
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('mainWin-max', 'max-window')
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('mainWin-max', 'unmax-window')
  })
  mainWindow.on('close', (e) => {
    closeStatus = true;
    e.preventDefault(); //先阻止一下默认行为，不然直接关了，提示框只会闪一下
    dialog.showMessageBox({
      type: 'warning',
      title: '提醒！',
      message:'确认关闭程序吗？',
      buttons: ['关闭程序', '放入托盘','取消'],   //选择按钮，点击确认则下面的idx为0，取消为1
      cancelId: 2, //这个的值是如果直接把提示框×掉返回的值，这里设置成和"取消"按钮一样的值，下面的idx也会是1
    }).then(idx => {
      if (idx.response == 2) {
        e.preventDefault();
      } else if(idx.response == 0) {
        mainWindow = null
        app.exit();
      }else{
        mainWindow.setSkipTaskbar(true);
        mainWindow.hide();
      }
    })
  });
  if (process.env.NODE_ENV === 'development') {
    let revert = false;
    setInterval(() => {
      if(mainWindow) {
        if(revert) {
          mainWindow.webContents.send('receivedMsg', {DBW60:0,DBW62:0, DBW68:35580,DBW70:512,DBW72: -1793,DBB100:'HF800SR-1-H                   ',DBB130:'83048880004868800784          ',DBW76:195,DBW80:6000,DBW82:6000,DBW84:6000}, writeStrArr.toString())
        } else {
          mainWindow.webContents.send('receivedMsg', {DBW60:1,DBW62:0, DBW68:35580,DBW70:512,DBW72: -1793,DBB100:'HF800SR-1-H                   ',DBB130:'83048880004868800784          ',DBW76:195,DBW80:6000,DBW82:6000,DBW84:6000}, writeStrArr.toString())
        }
        revert = !revert;
      }
    }, 100);
  }
  setAppTray();
  const platform = os.platform();
  if (platform === 'win32') {
    // 启动Java进程
    javaProcess = startJavaProcess(() => {
        // 移除这里的setInterval，统一使用startHealthCheck中的健康检查
        logToFile('Java进程启动回调执行');
    });
  }

  // 开发者工具
  globalShortcut.register('CommandOrControl+L', () => {
    mainWindow.webContents.openDevTools()
  })
  globalShortcut.register('CommandOrControl+F11', () => {
    mainWindow.isFullScreen() ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true);
  })
  // 定义自定义事件
  ipcMain.on('full_screen', function() {
    mainWindow.isFullScreen() ? mainWindow.setFullScreen(false) : mainWindow.setFullScreen(true);
  })
  // 程序启动时判断是否存在报表、日志等本地文件夹，没有就创建
  createFile('batchReport.grf');
  createFile('boxreport.grf');
  createFile('printBarcodeQRcode.grf');
  // 定义自定义事件
  ipcMain.on('writeLogToLocal', (event, arg) => {
    fs.appendFile("D://css_temp_data/log/" + ((new Date()).toLocaleDateString() + ".txt").replaceAll('/','-'), arg + '\n', function(err) {});
  })
  // 同步映射加速器数据
  synAccData();
});

// 在app.on('ready')之前添加退出清理
app.on('before-quit', () => {
    logToFile('应用程序准备退出，清理资源...');
    clearProcessTimers(javaProcess);
    if (javaProcess) {
        isRestarting = true; // 防止触发重启
        killJavaProcess(javaProcess.pid, () => {
            logToFile('Java进程已清理');
            javaProcess = null;
        });
    }
});

function synAccData() {
  HttpUtil.get('/box/synAccData').then(() => {
    pollingST = setTimeout(() => {
      clearTimeout(pollingST);
      synAccData();
    }, 2000);
  }).catch((err)=> {
    HttpUtil.get('/box/recoverAccData').catch(()=> {});
    pollingST = setTimeout(() => {
      clearTimeout(pollingST);
      synAccData();
    }, 2000);
  });
}

function conPLC() {
  logger.info('开始连接PLC')
  // 查询配置
  HttpUtil.get('/cssConfig/getConfig').then((res)=> {
    logger.info(JSON.stringify(res))
    if(!res.data.plcPort) {
      logger.info('配置查询失败')
      // We have an error. Maybe the PLC is not reachable.
      conPLC();
      return false;
    }
    conn.initiateConnection( { port: Number(res.data.plcPort), host: res.data.plcIp, rack: 0, slot: 1, debug: false }, (err) => {
      if (typeof(err) !== "undefined") {
        logger.info('连接PLC失败' + JSON.stringify(err))
        // We have an error. Maybe the PLC is not reachable.
        conPLC();
        return false;
        // process.exit();
      }
      conn.setTranslationCB(function(tag) { return variables[tag]; }); // This sets the "translation" to allow us to work with object names
      logger.info('连接PLC成功')
      // PLC看门狗心跳
      conn.addItems('DBW60')
      // 输送线自动运行 DBW62
      conn.addItems('DBW62')
      // 故障信息
      conn.addItems('DBW66')
      // 输送线不允许加速器写
      conn.addItems('DBW64')
      // 束下实时反馈速度
      conn.addItems('DBW68')
      // 关键点光电信号
      conn.addItems('DBW70');
      // 电机运行信号
      conn.addItems('DBW72');
      // 束下前输送速度比
      conn.addItems('DBW76');
      // 上料固定扫码
      conn.addItems('DBB100');
      // 迷宫出口固定扫码
      conn.addItems('DBB130');
      // J区速度
      conn.addItems('DBW80');
      // K区速度
      conn.addItems('DBW82');
      // L区速度
      conn.addItems('DBW84');
      
      // 读DBW6和DBW62
      setInterval(() => {
        conn.readAllItems(valuesReady);
      }, 50);
      setInterval(() => {
        // nodes7 代码
        conn.writeItems(writeAddArr, writeStrArr, valuesWritten);
      }, 100);
      // 发送心跳
      sendHeartToPLC()
    });
  }).catch((err)=> {
    logger.info('config error!')
  });
}
let times = 1;
let nowValue = 0;
function sendHeartToPLC() {
  setInterval(() => {
    if(times > 5) {
        times = 1;
        nowValue = 1 - nowValue;
    }
    times++;
    writeValuesToPLC('DBW0', nowValue);
  }, 200); // 每200毫秒执行一次交替
}

function createFile(fileNameVal) {
  const sourcePath = path.join(__static, './report', fileNameVal);// 要复制的文件的路径=
  const destinationPath = 'D://css_temp_data/report'; // 目标文件夹的路径

  // 检查源文件是否存在
  if (!fs.existsSync(sourcePath)) {
    console.error('源文件不存在');
    return;
  }

  // 获取源文件的文件名
  const fileName = path.basename(sourcePath);

  // 构建目标文件的完整路径
  const destinationFilePath = path.join(destinationPath, fileName);

  // 检查目标文件夹是否存在，如果不存在则创建它
  if (!fs.existsSync(destinationPath)) {
    try {
      fs.mkdirSync(destinationPath, { recursive: true });
      console.log('目标文件夹已成功创建');
    } catch (err) {
      console.error('创建目标文件夹时出现错误：', err);
      return;
    }
  }

  const destinationLogPath = 'D://css_temp_data/log'; // 目标文件夹的路径

  // 创建日志的文件夹
  if (!fs.existsSync(destinationLogPath)) {
    try {
      fs.mkdirSync(destinationLogPath, { recursive: true });
      console.log('目标文件夹已成功创建');
    } catch (err) {
      console.error('创建目标文件夹时出现错误：', err);
      return;
    }
  }

  // 检查目标文件是否已经存在
  if (fs.existsSync(destinationFilePath)) {
    console.log('目标文件已存在，跳过复制操作');
  } else {
    try {
      // 使用流的方式复制文件
      fs.copyFileSync(sourcePath, destinationFilePath);
      console.log('文件已成功复制到目标文件夹');
    } catch (err) {
      console.error('文件复制过程中出现错误：', err);
    }
  }
}

var variables = {
  DBW0: 'DB101,INT0', // 心跳
  DBW2: 'DB101,INT2', // 加速器设定输送线速度
  DBW4: 'DB101,INT4', // 加速器允许货物进入辐照区
  DBW6: 'DB101,INT6', // 暂停按钮
  DBW8: 'DB101,INT8', // 启动输送线
  DBW10: 'DB101,INT10', // 停止输送线
  DBW12: 'DB101,INT12', // 翻转模式
  DBW14: 'DB101,INT14', // 回流模式
  DBW16: 'DB101,INT16', // 下货
  DBW18: 'DB101,INT18', // 剔除指令
  DBW20: 'DB101,INT20', // 单独启动105
  DBW22: 'DB101,INT22', // 纸箱宽度
  DBW24: 'DB101,INT24', // 纸箱长度
  DBW26: 'DB101,INT26', // 不允许上货
  DBW34: 'DB101,INT34', // 扫码信息不一致报警
  DBW36: 'DB101,INT36', // 允许上货
  DBW38: 'DB101,INT38', // 下货报警
  DBW40: 'DB101,INT40', // 调节自动居中
  DBW42: 'DB101,INT42', // 故障复位
  DBW44: 'DB101,INT44', // 下货完成
  DBW46: 'DB101,INT46', // 托盘模式
  DBW60: 'DB101,INT60', // 看门狗心跳
  DBW62: 'DB101,INT62', // 输送系统自动运行
  DBW64: 'DB101,INT64',
  DBW66: 'DB101,INT66', // 故障信息
  DBW68: 'DB101,INT68',
  DBW70: 'DB101,INT70',
  DBW72: 'DB101,INT72',
  DBW76: 'DB101,INT76', // 束下前输送速度比
  DBW80: 'DB101,INT80', // J区速度
  DBW82: 'DB101,INT82', // K区速度
  DBW84: 'DB101,INT84', // L区速度
  DBB100: 'DB101,C100.30',
  DBB130: 'DB101,C130.30'
};

var writeStrArr = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var writeAddArr = ['DBW0', 'DBW2', 'DBW4', 'DBW6', 'DBW8', 'DBW10', 'DBW12', 'DBW14', 'DBW16', 'DBW18', 'DBW22', 'DBW24', 'DBW26', 'DBW34', 'DBW36', 'DBW38', 'DBW40', 'DBW42', 'DBW44', 'DBW46'];

// 给PLC写值
function writeValuesToPLC(add, values) {
  switch (add) {
    case 'DBW0':
      writeStrArr[0] = values;
      break;
    case 'DBW2':
      writeStrArr[1] = values;
      break;
    case 'DBW4':
      writeStrArr[2] = values;
      break;
    case 'DBW6':
      writeStrArr[3] = values;
      break;
    case 'DBW8':
      writeStrArr[4] = values;
      break;
    case 'DBW10':
      writeStrArr[5] = values;
      break;
    case 'DBW12':
      writeStrArr[6] = values;
      break;
    case 'DBW14':
      writeStrArr[7] = values;
      break;
    case 'DBW16':
      writeStrArr[8] = values;
      break;
    case 'DBW18':
      writeStrArr[9] = values;
      break;
    case 'DBW22':
      writeStrArr[10] = values;
      break;
    case 'DBW24':
      writeStrArr[11] = values;
      break;
    case 'DBW26':
      writeStrArr[12] = values;
      break;
    case 'DBW34':
      writeStrArr[13] = values;
      break;
    case 'DBW36':
      writeStrArr[14] = values;
      break;
    case 'DBW38':
      writeStrArr[15] = values;
      break;
    case 'DBW40':
      writeStrArr[16] = values;
      break;
    case 'DBW42':
      writeStrArr[17] = values;
      break;
    case 'DBW44':
      writeStrArr[18] = values;
      break;
    case 'DBW46':
      writeStrArr[19] = values;
      break;
    default:
      break;
  }
}

function valuesWritten(anythingBad) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
}

function valuesReady(anythingBad, values) {
  if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
  // console.log(values)
  mainWindow.webContents.send('receivedMsg', values, writeStrArr.toString())
}

const setAppTray = () => {  
  // 系统托盘右键菜单
  var trayMenuTemplate = [
      {
          label: '退出',
          click: function() {
              app.quit()
          }
      }
  ]

  console.log()
  // 系统托盘图标目录
  appTray = new Tray(path.join(__static, './icon.ico'))

  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

  // 设置此托盘图标的悬停提示内容
  appTray.setToolTip('全自动束下输送系统(ccs)')

  // 设置此图标的上下文菜单
  appTray.setContextMenu(contextMenu)

  appTray.on("click", function(){
    //主窗口显示隐藏切换
    if(mainWindow.isVisible()){
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
    }else{
      mainWindow.show();
      mainWindow.setSkipTaskbar(false);
    }
  })
}

// 启动 Java 程序的函数
function startJavaProcess(callback) {
  logToFile('开始启动Java程序...');
  try {
    const javaPath = path.join(__static, './jre', 'jre1.8.0_251', 'bin', 'java');
    const jarPath = path.join(__static, './jarlib', 'ccs-deliver-middle.jar');

    // 优化的Java启动参数
    const javaOpts = [
      // 内存设置
      '-Xmx4096m',                    // 最大堆内存
      '-Xms4096m',                    // 初始堆内存
      '-XX:MaxMetaspaceSize=512m',    // 最大元空间大小
      '-XX:MetaspaceSize=256m',       // 初始元空间大小
      
      // GC设置
      '-XX:+UseG1GC',                 // 使用G1垃圾收集器
      '-XX:MaxGCPauseMillis=200',     // 最大GC停顿时间
      '-XX:+HeapDumpOnOutOfMemoryError', // 内存溢出时导出堆转储
      '-XX:HeapDumpPath=D://css_temp_data/dump',  // 堆转储文件路径
      
      // 性能优化
      '-XX:+DisableExplicitGC',       // 禁止显式GC调用
      '-XX:+UseStringDeduplication',   // 开启字符串去重
      '-XX:+OptimizeStringConcat',     // 优化字符串连接
      
      // 监控和调试
      '-XX:+PrintGCDetails',          // 打印GC详细信息
      '-XX:+PrintGCDateStamps',       // 打印GC时间戳
      '-Xloggc:D://css_temp_data/log/gc.log',  // GC日志文件
      '-XX:+HeapDumpBeforeFullGC',    // Full GC前生成堆转储
      '-XX:+PrintGCApplicationStoppedTime', // 打印应用暂停时间
      
      // 错误处理
      '-XX:+ExitOnOutOfMemoryError',  // 发生OOM时退出
      '-XX:ErrorFile=D://css_temp_data/log/hs_err_%p.log',  // JVM错误日志
      
      // 应用参数
      '-jar',
      jarPath
    ];

    // 确保日志目录存在
    const logDir = 'D://css_temp_data/log';
    const dumpDir = 'D://css_temp_data/dump';
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    if (!fs.existsSync(dumpDir)) {
      fs.mkdirSync(dumpDir, { recursive: true });
    }

    logToFile(`启动Java进程，使用参数: ${javaOpts.join(' ')}`);
    const process = spawn(javaPath, javaOpts);

    process.on('error', (err) => {
      logToFile(`Java程序启动错误: ${err.message}`);
      clearProcessTimers(process);
      if (javaProcess === process) {
        javaProcess = null;
      }
      isRestarting = false;
      handleJavaProcessFailure();
    });

    process.on('exit', (code, signal) => {
      logToFile(`Java程序退出，退出码: ${code}, 信号: ${signal}`);
      clearProcessTimers(process);
      
      if (javaProcess === process) {
        const oldProcess = javaProcess;
        javaProcess = null;
        isRestarting = false;
        
        if (code !== 0 && !closeStatus && oldProcess) {
          handleJavaProcessFailure();
        }
      }
    });

    startHealthCheck(process, callback);
    return process;
  } catch (error) {
    logToFile(`Java程序启动异常: ${error.message}`);
    isRestarting = false;
    return null;
  }
}

// 启动健康检查
function startHealthCheck(process, callback) {
  let startupTimeout = setTimeout(() => {
    logToFile('Java程序启动超时');
    clearInterval(checkStartup);
    if (callback) callback(false);
  }, 30000);

  const checkStartup = setInterval(() => {
    if (!process || process.killed) {
      clearInterval(checkStartup);
      clearTimeout(startupTimeout);
      if (callback) callback(false);
      return;
    }

    HttpUtil.post('/status/check', null, { timeout: HTTP_REQUEST_TIMEOUT })
      .then((response) => {
        if (response === 'OK') {
          logToFile('Java程序启动成功');
          clearInterval(checkStartup);
          clearTimeout(startupTimeout);
          
          // 确保在启动成功时重置状态
          lastSuccessfulCheck = Date.now();
          if (callback) callback(true);
          
          // 启动定期健康检查
          if (healthCheckInterval) {
            clearInterval(healthCheckInterval);
          }
          healthCheckInterval = setInterval(() => {
            if (!process || process.killed) {
              clearInterval(healthCheckInterval);
              healthCheckInterval = null;
              handleJavaProcessFailure();  // 进程已死，触发重启
              return;
            }
            healthCheck(process);
          }, HEALTH_CHECK_INTERVAL);
        }
      })
      .catch((error) => {
        logToFile('等待Java程序启动...');
      });
  }, 2000);

  if (process) {
    process.startupInterval = checkStartup;
    process.startupTimeout = startupTimeout;
  }
}

// 健康检查函数 - 作为额外的保障
async function healthCheck(process) {
  if (isRestarting || !process) return;

  try {
    const response = await HttpUtil.post('/status/check', null, { timeout: HTTP_REQUEST_TIMEOUT });
    if (response === 'OK') {
      lastSuccessfulCheck = Date.now();
      if (restartAttempts > 0) {
        logToFile('Java程序恢复正常，重置重启计数');
        restartAttempts = 0;
      }
    }
  } catch (error) {
    logToFile(`健康检查失败: ${error.message}`);
    handleJavaProcessFailure();
  }
}

// 处理Java进程失败的情况
function handleJavaProcessFailure() {
  // 更严格的状态检查
  if (isRestarting || !javaProcess || closeStatus) return;
  
  const now = Date.now();
  if (now - lastSuccessfulCheck < 1000) {
    logToFile('距离上次检查时间太短，跳过本次重启');
    return;
  }
  
  restartAttempts++;
  logToFile(`Java程序崩溃，立即重启，这是第 ${restartAttempts} 次重启（30分钟内）`);

  if (restartAttempts > MAX_RESTART_ATTEMPTS) {
    logToFile('30分钟内达到最大重启次数，停止重启尝试');
    clearInterval(healthCheckInterval);
    isRestarting = false; // 确保状态重置
    return;
  }

  isRestarting = true;
  restartJavaProcess();
}

// 重启Java进程
function restartJavaProcess() {
  logToFile('开始重启Java进程...');
  
  clearProcessTimers(javaProcess);
  
  checkAndKillJavaPort(7005, () => {
    // 确保之前的进程引用被清理
    if (javaProcess) {
      javaProcess = null;
    }
    
    javaProcess = startJavaProcess((success) => {
      isRestarting = false;
      if (success) {
        lastSuccessfulCheck = Date.now();
        logToFile('Java进程重启成功');
      } else {
        logToFile('Java进程重启失败');
        // 重启失败时的清理
        if (javaProcess) {
          javaProcess = null;
        }
      }
    });
  });
}

// 检查并杀死占用指定端口的进程
function checkAndKillJavaPort(port, callback) {
  logToFile(`检查端口 ${port} 占用情况`);
  
  const command = `netstat -ano | findstr :${port}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      logToFile(`检查端口错误: ${stderr}`);
      callback();
      return;
    }

    const lines = stdout.trim().split('\n');
    const pids = lines
      .map(line => line.trim().split(/\s+/).pop())
      .filter(Boolean)
      .filter((value, index, self) => self.indexOf(value) === index); // 去重

    if (pids.length === 0) {
      logToFile('没有找到占用端口的进程');
      callback();
      return;
    }

    let killCount = 0;
    pids.forEach(pid => {
      isJavaProcess(pid, (isJava) => {
        if (isJava) {
          killJavaProcess(pid, () => {
            killCount++;
            if (killCount === pids.length) {
              callback();
            }
          });
        } else {
          killCount++;
          if (killCount === pids.length) {
            callback();
          }
        }
      });
    });
  });
}

// 判断是否是 Java 进程
function isJavaProcess(pid, callback) {
  const command = `wmic process where processid=${pid} get commandline`;
  
  exec(command, (err, stdout, stderr) => {
    if (err) {
      logToFile(`检查进程 ${pid} 失败: ${stderr}`);
      callback(false);
      return;
    }

    const commandLine = stdout.trim().toLowerCase();
    const isJava = commandLine.includes('java') && 
                   commandLine.includes('ccs-deliver-middle.jar') &&
                   !commandLine.includes('electron');
    
    logToFile(`进程 ${pid} ${isJava ? '是' : '不是'} Java进程`);
    callback(isJava);
  });
}

// 杀死Java进程
function killJavaProcess(pid, callback) {
  logToFile(`准备终止Java进程 ${pid}`);
  
  const killCommand = `taskkill /PID ${pid} /F`;
  exec(killCommand, (err, stdout, stderr) => {
    if (err) {
      logToFile(`终止进程 ${pid} 失败: ${stderr}`);
    } else {
      logToFile(`成功终止进程 ${pid}`);
    }
    callback();
  });
}
// 定期重置重启计数
setInterval(() => {
  if (restartAttempts > 0) {
    restartAttempts = 0;
    logToFile('重置重启尝试计数');
  }
}, RESTART_ATTEMPT_RESET_INTERVAL);

// 清理进程相关的所有定时器
function clearProcessTimers(process) {
  if (process) {
    if (process.startupInterval) {
      clearInterval(process.startupInterval);
      process.startupInterval = null;
    }
    if (process.startupTimeout) {
      clearTimeout(process.startupTimeout);
      process.startupTimeout = null;
    }
  }
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval);
    healthCheckInterval = null;
  }
}
