import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// 导入语言包
const messages = {
  en: {
    plcStatus: {
      connected: 'PLC Conn.',
      disconnected: 'PLC Disconn.'
    },
    login: {
      loginTitle: 'Full-Automatic Under-Beam Conveying CCS System',
      loginIntroduce: 'Welcome to the Full-Automatic Under-Beam Conveying CCS System. With a simple and user-friendly interface, our fully automated management system is dedicated to helping you improve efficiency.',
      userNameWord: 'Please enter your username',
      userPasswordWord: 'Please enter your password',
      noUser: "Don't have an account？",
      nowRegister: 'Sign up',
      forgetPassword: 'forget the password？',
      loginword: 'log in',
      xitongqidong: 'System is starting up',
      qingshaohou: 'Please wait'
    },
    register: {
      title: 'Create Account',
      haveAccount: 'Already have an account？',
      loginword: 'log in',
      userNameWord: 'Please enter your name.',
      registerWord: 'Please enter your login account.',
      passwordWord: 'Please enter your password.',
      confirmPasswordWord: 'Confirm password.',
      register: 'register',
      userNameTip: 'Name of the person logging in, used for recording the order operator.',
      userCodeTip: 'The registration account must consist of numbers, letters, and underscores, and is used to log in to the system.'
    },
    welcome: {
      hello: 'Hello !',
      hello1: 'Welcome to the system',
      hello2: 'Simple and easy to use, efficient and stable',
      hello3: 'We are dedicated to serving you',
      hello4: 'Your satisfaction is our greatest pursuit',
      hello5: 'Wishing you good health and success in your work',
    },
    homePage: {
      title: 'Full-Automatic Under-Beam Conveying System',
      index1: 'Home',
      index2: 'Business Processing',
      index3: 'Report Management',
      index4: 'Configuration Management',
      index5: 'About',
      full: 'Full Screen/Exit',
      zhuxiao: 'Delete User',
      xiugai: 'Change Password',
      tuichu: 'Sign Out'
    },
    processParameters: {
      title: 'Process Parameters',
      dingdanbianhao: 'Order Number',
      dingdanmingcheng: 'Order Name',
      fanzhuan: 'Rotate',
      tuopan: 'Pallet',
      paizhao: 'Photo Mode',
      miejunpihao: 'Batch Number',
      chanpinmingcheng: 'Product Name',
      gongyimingcheng: 'Process Name',
      zhuangzaifangshi: 'Load Method',
      lujingmingcheng: 'Path Name',
      quanshu: 'Turns',
      xiangzichangdu: 'Box Length',
      xiangzigaodu: 'Box Height',
      xiangzikuandu: 'Box Width',
      xiangzizhongliang: 'Box Weight',
      shuxiasuduxiaxian: 'Speed L Lim',
      shuxiasuduzhi: 'Speed Value',
      shuxiasudushangxian: 'Speed U Lim',
      shuliuxiaxian: 'Flow L Lim',
      shuliusheding: 'Flow Value',
      shuliushangxina: 'Flow U Lim',
      gonglvxiaxian: 'Power L Lim',
      gonglvsheding: 'Power Value',
      gonglvshangxian: 'Power U Lim',
      saokuanxiaxian: 'Scan L Lim',
      saokuansheding: 'Scan Value',
      saokuanshangxian: 'Scan U Lim',
      saomiaopinlvxiaxian: 'Freq L Lim',
      saomiaopinlvsheding: 'Freq Value',
      saomiaopinlvshangxian: 'Freq U Lim',
      pfnxiaxian: 'PFN L Lim',
      pfnsheding: 'PFN Value',
      pfnshangxian: 'PFN U Lim',
      nengliangxiaxian: 'Energy L Lim',
      nengliangshedingzhi: 'Energy Value',
      nengliangshangxian: 'Energy U Lim',
      caozuoyuan: 'Operator'
    },
    orderList: {
      scanCode: 'Scan to Add',
      save: 'Save',
      update: 'Edit',
      cancel: 'Cancel',
      yinrupeifang: 'Introduce Template：',
      yinrupeifangTip: 'Text Input Search Template',
      xinjian: 'Create New',
      refresh: 'Refresh',
      nowOrderTip: 'Current Running Orders：',
      dingwei: 'Click to quickly locate running orders →',
      xuhao: 'No.',
      laiyuan: 'Source',
      shoudong: 'Manual',
      caozuo: 'Operation',
      bianji: 'Edit',
      kaishi: 'Start',
      yixuanzhong: 'Selected',
      tingzhi: 'Stop',
      wancheng: 'Complete',
      dongtaitu: 'Dynamic',
      gongyimoban: 'Temp late',
      weihugongyipeifangmuban: 'Maintain Process Formula Template',
      tableTitle: {
        orderId: 'Task Number',
        revertFlag: 'Rotate',
        batchId: 'Batch Number',
        orderNo: 'Order Number',
        orderName: 'Order Name',
        planNum: 'Planned Quantity',
        productName: 'Product Name',
        loadMethod: 'Loading Method',
        pathName: 'Path Name',
        artName: 'Process Name'
      }
    },
    dictOrder: {
      xinjian: 'Create New Template',
      refresh: 'Refresh',
      xiugainame: 'Modify Template Name',
      baocun: 'Save',
      baocunTip: 'Deletion is irreversible. Are you sure you want to proceed with the deletion?',
      zuofei: 'Delete Template',
      zanwu: 'No process template available at the moment!',
      shurupeifangming: 'Please enter the template name',
      queding: 'Confirm',
      quxiao: 'Cancel',
      xiugaipeifangming: 'Modify Template Name：',
      qingshurupei: 'Please enter the template name'
    },
    report: {
      reportTitle: 'Report Design',
      xiangbaogaomuban: 'Box Report Template',
      pibaogaomuban: 'Batch Report Template',
      wenjianlujing: 'File Path',
      xiangsheji: 'Box Report Design',
      pisheji: 'Batch Report Design',
      dingdanbianhao: 'Order Number',
      qingshurudingdanbianhao: 'Please enter the order number.',
      pihao: 'Batch Number',
      qingshurupihao: 'Please enter the batch number.',
      xiangbianhao: 'Box Number',
      qingshuruxiangbianhao: 'Please enter the box number.',
      chaxun: 'Query',
      xiugaiyiwanchengdingdan: 'Modify Completed Order',
      pibaogao: 'Batch Report',
      xiangbaogao: 'Box Report',
      xuhao: 'No.',
      caozuo: 'Operation',
      orderId: 'Task Number',
      createTime: 'Order Date'
    },
    viewOrderlist: {
      dingdanbianhao: 'Order Number',
      qingshurudingdanbianhao: 'Please enter the order number.',
      pihao: 'Batch Number',
      qingshurupihao: 'Please enter the batch number.',
      chaxun: 'Query',
      xuhao: 'No.',
      caozuo: 'Operation',
      orderId: 'Task Number',
      createTime: 'Order Date',
      update: 'Modify',
      yuanshijilu: 'Original Record',
      dingdanxiangxi: 'Order Details',
      dingdanshijian: 'Order Time',
      fuzhaoshuliang: 'Radiation Quantity',
      xiangxinxi: 'Box Information',
      tianjiaxiangzi: 'Add Box',
      xiangbianhao: 'Box：',
      saoma: 'Code：',
      quanshu: 'Turns：',
      yisicunzai: 'Suspected accidental touch situation, accelerator data not read！',
      dianjichakan: 'Click to view reasons for non-compliance',
      zhiliang: 'Qual：',
      hege: 'Y',
      buhege: 'N',
      xiugaimoniid: 'Modify Box Simulation ID：',
      qingshuru: 'Please enter the simulation ID：',
      queding: 'Confirm',
      quxiao: 'Cancel'
    },
    config: {
      peizhiliebiao: 'Configuration List',
      ipaddress: 'IP Address：',
      port: 'Port：',
      yuyanshezhi: 'Language Settings',
      shuqianchuansongdaichangdu: 'Conveyor Belt Length Before Bundling',
      l11length: 'L1-1 Length (mm)：',
      l2length: 'L2 Length (mm)：',
      halength: 'H-A Length',
      jlength: 'J Length (mm)：',
      klength: 'K Length (mm)：',
      llength: 'L Length (mm)：',
      dianwei: 'Point',
      panduanjinzhi: 'Restricted Loading Point：',
      ghconfig: 'G-H Photoelectric Configuration',
      x1length: 'X1 Length (mm)：',
      x2length: 'X2 Length (mm)：',
      v1p: 'V1 Coefficient Ratio：',
      v2p: 'V2 Coefficient Ratio：',
      gdelay: 'G Delay Time (ms)：',
      yemiansuodingTip: 'The page is locked. Click to modify configuration.',
      save: 'Save',
      cancel: 'Cancel'
    },
    dynamicGraph: {
      ceshijiasuqi: 'Test Accelerator',
      shishishuju: 'Real-time Data Monitoring',
      miejunpihao: 'Batch Number',
      xiangzichangdu: 'Box Length',
      xiangzikuandu: 'Box Width',
      xiangzigaodu: 'Box Height',
      shuxiashezhisudu: 'Speed Setting',
      fenzhong: 'min',
      shuxiashishi: 'Real-time Speed',
      dingdanquanshu: 'Order Turns',
      mode: 'Mode',
      photoMode: 'Photo Mode',
      photoModeOn: 'On',
      photoModeOff: 'Off',
      tuopanmoshi: 'Tray Mode',
      fanzhuanmoshi: 'Flip Mode',
      huiliumoshi: 'Return Mode',
      caozuoqu: 'Operation Area',
      quanxian: 'Full',
      zanting: 'Pause',
      qidong: 'Start',
      tingzhi: 'Stop',
      guzhang: 'Fault',
      fuwei: 'Reset',
      qingkong: 'Clear',
      qiehuan: 'Switch',
      dingdan: 'Order',
      caozuorizhi:'Log',
      baojingrizhi: 'ErrorLog',
      shishijiankong: 'Real-time Status Monitoring',
      idinfo: 'ID',
      shanghuosaoma: 'Load Scan',
      dangqianshanghuo: 'Load Num',
      xiahuosaoma: 'Unload Scan',
      dangqianxiahuo: 'Unload Num',
      shuxiadangqianhuowu: 'Current ID',
      dangqiantichu: 'Rejection Num',
      dianji: 'Motor',
      cacheQu: 'Cache Queue',
      tichuhuancun: 'Rejected Queue',
      xiahuohuancun: 'Unload Queue',
      jinzhishanghuo: 'No Loading',
      xiahuowancheng: 'Unloading Completed',
      yidongtitle: 'Quick Move - Drag the Table to Switch Queues',
      drawerTitle: {
        xuhao: 'No.',
        dingdanhao: 'Order Number',
        xiangbianhao: 'Box Number',
        erweima: 'QR Code',
        jinrushijian: 'Entry Time',
        quanshu: 'Turns',
        fanzhuan: 'Flip',
        yiwancheng: 'Completed',
        hege: 'Qualified',
        zhuangtai: 'Status',
        caozuo: 'Operation',
        hegem: 'Qualified',
        buhegem: 'Non-Qualified',
        yixiahuo: 'Unloaded',
        daitichu: 'Pending Rejection',
        yitichu: 'Rejected',
        zhixingzhong: 'In Progress',
        quedingyaojiang: 'Are you sure you want to remove ',
        zaiduilieshanchu: ' from the queue?？',
        quyuduilie: 'Area Queue',
        tichuhuancun: 'Rejected Queue',
        xiahuohuancun: 'Unload Queue'
      },
      qiehuandingdan: {
        title: 'Switch Orders',
        xuhao: 'No.',
        laiyuan: 'Source',
        shoudong: 'Manual',
        caozuo: 'Operation',
        dangqianyunxing: 'Current Running Order',
        qiehuan: 'Switch',
        tableTitle: {
          orderId: 'Task Number',
          revertFlag: 'Flip',
          batchId: 'Batch Number',
          orderNo: 'Order Number',
          orderName: 'Order Name',
          planNum: 'Planned Quantity',
          productName: 'Product Name',
          loadMethod: 'Loading Method',
          pathName: 'Path Name',
          artName: 'Process Name'
        }
      }
    }
  },
  zh: {
    plcStatus: {
      connected: 'PLC已连接',
      disconnected: 'PLC未连接'
    },
    login: {
      loginTitle: '全自动束下输送CCS系统',
      loginIntroduce: '欢迎使用全自动束下输送系统。简洁、易用的操作页面，全自动化管理全力帮助您提高效率。',
      userNameWord: '请输入用户名',
      userPasswordWord: '请输入密码',
      noUser: '没有账户？',
      nowRegister: '立即注册',
      forgetPassword: '忘记密码？',
      loginword: '登录',
      register: '立即注册',
      xitongqidong: '系统正在启动中',
      qingshaohou: '请稍后'
    },
    register: {
      title: '创建账户',
      haveAccount: '已有帐户？',
      loginword: '登录',
      userNameWord: '请输入姓名',
      registerWord: '请输入注册账号',
      passwordWord: '请输入密码',
      confirmPasswordWord: '确认密码',
      userNameTip: '登录人姓名，用于记录订单操作人。',
      userCodeTip: '注册账号为数字字母下划线，用于登录系统'
    },
    welcome: {
      hello: '您好',
      hello1: '欢迎使用全自动束下输送CCS系统',
      hello2: '简单易用 高效稳定',
      hello3: '我们将竭诚为您服务',
      hello4: '您的满意是我们最大的追求',
      hello5: '祝您身体健康 工作顺利',
    },
    homePage: {
      title: '全自动束下输送系统',
      index1: '首页',
      index2: '业务处理',
      index3: '报表管理',
      index4: '配置管理',
      index5: '关于',
      full: '全屏/取消全屏',
      zhuxiao: '注销用户',
      xiugai: '修改密码',
      tuichu: '退出登录'
    },
    processParameters: {
      title: '工艺参数',
      dingdanbianhao: '订单编号',
      dingdanmingcheng: '订单名称',
      fanzhuan: '翻转',
      tuopan: '托盘',
      paizhao: '拍照模式',
      miejunpihao: '灭菌批号',
      chanpinmingcheng: '产品名称',
      gongyimingcheng: '工艺名称',
      zhuangzaifangshi: '装载方式',
      lujingmingcheng: '路径名称',
      quanshu: '圈数',
      xiangzichangdu: '箱子长度',
      xiangzigaodu: '箱子高度',
      xiangzikuandu: '箱子宽度',
      xiangzizhongliang: '箱子重量',
      shuxiasuduxiaxian: '束下速度下限',
      shuxiasuduzhi: '束下速度值',
      shuxiasudushangxian: '束下速度上限',
      shuliuxiaxian: '束流下限',
      shuliusheding: '束流设定值',
      shuliushangxina: '束流上限',
      gonglvxiaxian: '功率下限',
      gonglvsheding: '功率设定值',
      gonglvshangxian: '功率上限',
      saokuanxiaxian: '扫宽下限',
      saokuansheding: '扫宽设定值',
      saokuanshangxian: '扫宽上限',
      saomiaopinlvxiaxian: '扫描频率下限',
      saomiaopinlvsheding: '扫描频率设定',
      saomiaopinlvshangxian: '扫描频率上限',
      pfnxiaxian: 'PFN电压下限',
      pfnsheding: 'PFN电压设定',
      pfnshangxian: 'PFN电压上限',
      nengliangxiaxian: '能量下限',
      nengliangshedingzhi: '能量设定值',
      nengliangshangxian: '能量上限',
      caozuoyuan: '操作员'
    },
    orderList: {
      scanCode: '扫码添加',
      save: '保存',
      update: '修改',
      cancel: '取消',
      yinrupeifang: '引入模版：',
      yinrupeifangTip: '可输入文字检索模版',
      xinjian: '新建',
      refresh: '刷新',
      nowOrderTip: '当前正在运行的订单：',
      dingwei: '点击快速定位到运行订单→',
      xuhao: '序号',
      laiyuan: '来源',
      shoudong: '手动',
      caozuo: '操作',
      bianji: '编辑',
      kaishi: '开始',
      yixuanzhong: '已选中',
      tingzhi: '停止',
      wancheng: '完成',
      dongtaitu: '动态图',
      gongyimoban: '工艺配方',
      weihugongyipeifangmuban: '维护工艺配方模板',
      tableTitle: {
        orderId: '任务编号',
        revertFlag: '翻转',
        batchId: '灭菌批号',
        orderNo: '订单编号',
        orderName: '订单名称',
        planNum: '计划数量',
        productName: '产品名称',
        loadMethod: '装载方式',
        pathName: '路径名称',
        artName: '工艺名称'
      }
    },
    dictOrder: {
      xinjian: '新建配方',
      refresh: '刷新',
      xiugainame: '修改配方名称',
      baocun: '保 存',
      baocunTip: '删除后不可恢复，请确认是否删除？',
      zuofei: '作废配方',
      zanwu: '暂无工艺配方模板！',
      shurupeifangming: '请输入配方名称',
      queding: '确 定',
      quxiao: '取 消',
      xiugaipeifangming: '修改配方名称：',
      qingshurupei: '请输入配方名称'
    },
    report: {
      reportTitle: '报表设计',
      xiangbaogaomuban: '箱报告模板',
      pibaogaomuban: '批报告模板',
      wenjianlujing: '文件路径',
      xiangsheji: '箱设计',
      pisheji: '批设计',
      dingdanbianhao: '订单编号',
      qingshurudingdanbianhao: '请输入订单编号',
      pihao: '灭菌批号',
      qingshurupihao: '请输入灭菌批号',
      xiangbianhao: '箱编号',
      qingshuruxiangbianhao: '请输入箱编号',
      chaxun: '查询',
      xiugaiyiwanchengdingdan: '修改已完成订单',
      pibaogao: '批报告',
      xiangbaogao: '箱报告',
      xuhao: '序号',
      caozuo: '操作',
      orderId: '任务编号',
      createTime: '订单日期'
    },
    viewOrderlist: {
      dingdanbianhao: '订单编号',
      qingshurudingdanbianhao: '请输入订单编号',
      pihao: '灭菌批号',
      qingshurupihao: '请输入灭菌批号',
      chaxun: '查询',
      xuhao: '序号',
      caozuo: '操作',
      orderId: '任务编号',
      createTime: '订单日期',
      update: '修改',
      yuanshijilu: '原始记录',
      dingdanxiangxi: '订单详细信息',
      dingdanshijian: '订单时间',
      fuzhaoshuliang: '辐照数量',
      xiangxinxi: '箱信息',
      tianjiaxiangzi: '添加箱子',
      xiangbianhao: '箱编号：',
      saoma: '扫码：',
      quanshu: '圈数：',
      yisicunzai: '疑似存在误触情况，未读取到加速器数据！',
      dianjichakan: '点击查看不合格原因',
      zhiliang: '质量：',
      hege: '合格',
      buhege: '不合格',
      xiugaimoniid: '修改箱子模拟id：',
      qingshuru: '请输入模拟id',
      queding: '确 定',
      quxiao: '取 消'
    },
    config: {
      peizhiliebiao: '配置列表',
      ipaddress: 'ip地址：',
      port: '端口：',
      yuyanshezhi: '语言设置',
      shuqianchuansongdaichangdu: '束前传送带长度',
      l11length: 'L1-1长度(mm)：',
      l2length: 'L2长度(mm)：',
      halength: 'H-A点传送带长度',
      jlength: 'J长度(mm)：',
      klength: 'K长度(mm)：',
      llength: 'L长度(mm)：',
      dianwei: '点位',
      panduanjinzhi: '判断禁止上货点位：',
      ghconfig: 'G-H光电配置',
      x1length: 'X1长度(mm)：',
      x2length: 'X2长度(mm)：',
      v1p: 'V1系数比：',
      v2p: 'V2系数比：',
      gdelay: 'G点延迟时间(ms)：',
      yemiansuodingTip: '页面已锁定，点击修改配置',
      save: '保存',
      cancel: '取消'
    },
    dynamicGraph: {
      ceshijiasuqi: '测试加速器',
      shishishuju: '实时数据监控',
      miejunpihao: '灭菌批号',
      xiangzichangdu: '箱子长度',
      xiangzikuandu: '箱子宽度',
      xiangzigaodu: '箱子高度',
      shuxiashezhisudu: '束下设置速度',
      fenzhong: '分钟',
      shuxiashishi: '束下实时速度',
      dingdanquanshu: '订单圈数',
      mode: '模式',
      photoMode: '拍照模式',
      photoModeOn: '开启',
      photoModeOff: '关闭',
      tuopanmoshi: '托盘模式',
      fanzhuanmoshi: '翻转模式',
      huiliumoshi: '回流模式',
      caozuoqu: '操作区',
      quanxian: '全线',
      zanting: '暂停',
      qidong: '启动',
      tingzhi: '停止',
      guzhang: '故障',
      fuwei: '复位',
      qingkong: '清空',
      qiehuan: '切换',
      dingdan: '订单',
      caozuorizhi:'操作日志',
      baojingrizhi: '报警日志',
      shishijiankong: '实时状态监控',
      idinfo: 'ID信息',
      shanghuosaoma: '上货扫码信息',
      dangqianshanghuo: '当前上货数量',
      xiahuosaoma: '下货扫码信息',
      dangqianxiahuo: '当前下货数量',
      shuxiadangqianhuowu: '束下当前货物ID',
      dangqiantichu: '当前剔除数量',
      dianji: '电机',
      cacheQu: '缓存队列',
      tichuhuancun: '剔除货物缓存队列',
      xiahuohuancun: '下货区缓存队列',
      jinzhishanghuo: '禁止上货',
      xiahuowancheng: '下货完成',
      yidongtitle: '快捷移动-拖动表格切换队列',
      drawerTitle: {
        xuhao: '序号',
        dingdanhao: '订单号',
        xiangbianhao: '箱编号',
        erweima: '一维/二维码信息',
        jinrushijian: '进入时间',
        quanshu: '圈数',
        fanzhuan: '翻转',
        yiwancheng: '已完成',
        hege: '合格',
        zhuangtai: '状态',
        caozuo: '操作',
        hegem: '合格',
        buhegem: '不合格',
        yixiahuo: '已下货',
        daitichu: '待剔除',
        yitichu: '已剔除',
        zhixingzhong: '执行中',
        quedingyaojiang: '确定要将',
        zaiduilieshanchu: '在队列中删除吗？',
        quyuduilie: '区域队列',
        tichuhuancun: '剔除货物缓存队列',
        xiahuohuancun: '下货区缓存队列'
      },
      qiehuandingdan: {
        title: '切换订单',
        xuhao: '序号',
        laiyuan: '来源',
        shoudong: '手动',
        caozuo: '操作',
        dangqianyunxing: '当前运行订单',
        qiehuan: '切换',
        tableTitle: {
          orderId: '任务编号',
          revertFlag: '翻转',
          batchId: '灭菌批号',
          orderNo: '订单编号',
          orderName: '订单名称',
          planNum: '计划数量',
          productName: '产品名称',
          loadMethod: '装载方式',
          pathName: '路径名称',
          artName: '工艺名称'
        }
      }
    }
  }
};

// 创建 i18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置默认语言
  messages, // 设置语言包
});

export default i18n;