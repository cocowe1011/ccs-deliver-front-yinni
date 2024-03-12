<template>
  <div style="width: 100%;height: 100%;">
    <div class="orderlist" v-show="!isDynamicGraphShow">
      <div>
        <div class="formDiv">
          <div class="card-title">工艺参数</div>
          <div class="card-content">
            <el-form :inline="true" label-position="right" label-width="115px" :model="orderMainForm" class="demo-form-inline">
              <el-form-item label="订单编号：">
                <el-input size="small" v-model="orderMainForm.orderNo" placeholder="订单编号" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="订单名称：">
                <el-input size="small" v-model="orderMainForm.orderName" placeholder="订单名称" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="orderMainForm.revertFlag" :disabled="!(isNewSave || isEdit) || ((isNewSave || isEdit) && orderMainForm.trayFlag)">翻转</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="orderMainForm.trayFlag" :disabled="!(isNewSave || isEdit) || ((isNewSave || isEdit) &&orderMainForm.revertFlag)">托盘模式</el-checkbox>
              </el-form-item>
              <br/>
              <el-form-item label="灭菌批号：">
                <el-input size="small" v-model="orderMainForm.batchId" placeholder="灭菌批号" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="产品名称：">
                <el-input size="small" v-model="orderMainForm.productName" placeholder="产品名称" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="工艺名称：">
                <el-input size="small" v-model="orderMainForm.artName" placeholder="工艺名称" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="装载方式：">
                <el-input size="small" v-model="orderMainForm.loadMethod" placeholder="装载方式" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="路径名称：">
                <el-input size="small" v-model="orderMainForm.pathName" placeholder="路径名称" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="圈数：">
                <el-input type="number" size="small" v-model="orderMainForm.numberTurns" placeholder="圈数" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="箱子长度：">
                <el-input type="number" size="small" v-model="orderMainForm.boxLength" placeholder="箱子长度" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="箱子高度：">
                <el-input type="number" size="small" v-model="orderMainForm.boxHeight" placeholder="箱子高度" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="箱子宽度：">
                <el-input type="number" size="small" v-model="orderMainForm.boxWidth" placeholder="箱子宽度" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="箱子重量：">
                <el-input type="number" size="small" v-model="orderMainForm.boxWeight" placeholder="箱子重量" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="订单箱数：" v-show="false">
                <el-input type="number" size="small" v-model="orderMainForm.orderBoxNum" placeholder="订单箱数" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <!-- <el-form-item label="剔除箱数：">
                <el-input size="small" v-model="orderMainForm.eliminateBoxNum" placeholder="剔除箱数" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="上货箱数：">
                <el-input size="small" v-model="orderMainForm.exhibitBoxNum" placeholder="上货箱数" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="合格箱数：">
                <el-input size="small" v-model="orderMainForm.qualifiedBoxNum" placeholder="合格箱数" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item> -->
              <el-form-item label="束下速度下限：">
                <el-input type="number" size="small" v-model="orderMainForm.sxSpeedLowerLimit" placeholder="束下速度下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="束下速度值：">
                <el-input type="number" size="small" v-model="orderMainForm.sxSpeedSet" placeholder="束下速度值" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="束下速度上限：">
                <el-input type="number" size="small" v-model="orderMainForm.sxSpeedUpperLimit" placeholder="束下速度上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="束流下限：">
                <el-input type="number" size="small" v-model="orderMainForm.slLowerLimit" placeholder="束流下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="束流设定值：">
                <el-input type="number" size="small" v-model="orderMainForm.slSet" placeholder="束流设定值" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="束流上限：">
                <el-input type="number" size="small" v-model="orderMainForm.slUpperLimit" placeholder="束流上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="功率下限：">
                <el-input type="number" size="small" v-model="orderMainForm.glLowerLimit" placeholder="功率下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="功率设定值：">
                <el-input type="number" size="small" v-model="orderMainForm.glSet" placeholder="功率设定值" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="功率上限：">
                <el-input type="number" size="small" v-model="orderMainForm.glUpperLimit" placeholder="功率上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫宽下限：">
                <el-input type="number" size="small" v-model="orderMainForm.skLowerLimit" placeholder="扫宽下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫宽设定值：">
                <el-input type="number" size="small" v-model="orderMainForm.skSet" placeholder="扫宽设定值" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫宽上限：">
                <el-input type="number" size="small" v-model="orderMainForm.skUpperLimit" placeholder="扫宽上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率下限：">
                <el-input type="number" size="small" v-model="orderMainForm.smplLowerLimit" placeholder="扫描频率下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率设定：">
                <el-input type="number" size="small" v-model="orderMainForm.smplSet" placeholder="扫描频率设定" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率上限：">
                <el-input type="number" size="small" v-model="orderMainForm.smplUpperLimit" placeholder="扫描频率上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压下限：">
                <el-input type="number" size="small" v-model="orderMainForm.pfnLowerLimit" placeholder="PFN电压下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压设定：">
                <el-input type="number" size="small" v-model="orderMainForm.pfnSet" placeholder="PFN电压设定" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压上限：">
                <el-input type="number" size="small" v-model="orderMainForm.pfnUpperLimit" placeholder="PFN电压上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="能量下限：">
                <el-input type="number" size="small" v-model="orderMainForm.nlLowerLimit" placeholder="能量下限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="能量设定值：">
                <el-input type="number" size="small" v-model="orderMainForm.nlSet" placeholder="能量设定值" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="能量上限：">
                <el-input type="number" size="small" v-model="orderMainForm.nlUpperLimit" placeholder="能量上限" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
              <el-form-item label="操作员：">
                <el-input size="small" v-model="orderMainForm.creatorName" placeholder="操作员" :readonly="!(isNewSave || isEdit)"></el-input>
              </el-form-item>
            </el-form>
            <div class="content-bottom" v-show="isNewSave || isEdit">
              <el-button type="warning" plain size="small" v-if="isNewSave" style="margin-right: 6px;">
                <i class="iconfont icon-saoma" style="font-size: 12px;"></i>
                扫码添加
              </el-button>
              <el-divider direction="vertical" style="height: 1.2em;" v-if="isNewSave"></el-divider>
              <el-button type="primary" style="margin-left: 6px;" size="small" icon="el-icon-success" @click="saveOrder" :loading="saveLoading" v-if="isNewSave">保存</el-button>
              <el-button type="primary" size="small" icon="el-icon-success" @click="updateOrder" :loading="editLoading" v-else>修改</el-button>
              <el-button size="small" style="margin-left: 15px;" icon="el-icon-error" @click="cancelEditOrSave">取消</el-button>
              <div v-if="isNewSave" style="height: 30px;width: 72px;display: flex;align-items: center;margin-left: 30px;font-size: 14px;font-weight: 600;">引入配方：</div>
              <el-select v-model="selectTemp" v-if="isNewSave" filterable placeholder="可输入汉字检索配方" @visible-change="getDictOrder" @change="selectDictOrder" size="small">
                <el-option
                  v-for="(item, index) in dictOrderList"
                  :key="index"
                  :label="item.dictName"
                  :value="index"
                  >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="listDiv">
          <div class="list-top">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="newOrderClick">新建</el-button>
            <el-button icon="el-icon-refresh-right" size="small" @click="getOrderList" style="margin-left: 15px;margin-right: 6px;">刷新</el-button>
            <el-divider direction="vertical" style="height: 1.2em;" v-if="nowRunOrderId != ''"></el-divider>
            <el-tooltip content="点击快速定位到运行订单→" placement="top" v-if="nowRunOrderId != ''">
              <el-button type="primary" plain size="small" icon="el-icon-loading" style="margin-left: 6px;" @click="positionOrder">当前正在运行的订单：{{ nowRunOrderId }}</el-button>
            </el-tooltip>
          </div>
          <div class="list-middle" ref="listMiddle">
            <el-table
              :data="tableData"
              ref="singleTable"
              border
              style="width: 100%"
              :max-height="tableMaxHeight"
              highlight-current-row
              @current-change="handleCurrentChange"
              v-loading="getOrderListLoading">
              <el-table-column type="index" width="80" :index="indexMethod" fixed="left" label="序号">
              </el-table-column>
              <el-table-column v-for="item in tableTitle"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
              </el-table-column>
              <el-table-column
                prop="tag"
                label="来源"
                width="100"
                fixed="right">
                <template>
                  <el-tag type="success" disable-transitions>手动</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="320">
                <template slot-scope="scope">
                  <el-link type="primary" icon="el-icon-edit" @click.stop="editClick(scope.row)">编辑</el-link>
                  <el-link type="success" icon="el-icon-switch-button" style="margin-left: 10px;" v-if="scope.row.orderId != nowRunOrderId" :disabled="(scope.row.orderId !== currentSelect.orderId) || (nowRunOrderId != '' && scope.row.orderId != nowRunOrderId)" @click="chooseOrder(scope.row, false)">开始</el-link>
                  <el-link type="success" icon="el-icon-loading" style="margin-left: 10px;" v-else :disabled="(scope.row.orderId !== currentSelect.orderId) || (nowRunOrderId != '' && scope.row.orderId != nowRunOrderId)">已选中</el-link>
                  <el-link type="danger" icon="el-icon-error" style="margin-left: 10px;" @click="cancelOrder(scope.row)" :disabled="(scope.row.orderId !== currentSelect.orderId) || (nowRunOrderId != '' && scope.row.orderId != nowRunOrderId) || nowRunOrderId == ''">停止</el-link>
                  <el-link type="primary" icon="el-icon-success" style="margin-left: 10px;" :disabled="(scope.row.orderId !== currentSelect.orderId) || (nowRunOrderId != '' && scope.row.orderId != nowRunOrderId)" @click="generateBatchReport">完成</el-link>
                  <el-link type="primary" icon="el-icon-pie-chart" style="margin-left: 10px;" @click="showDynamicGraph(scope.row)" :disabled="(scope.row.orderId !== currentSelect.orderId) || (nowRunOrderId != '' && scope.row.orderId != nowRunOrderId) || nowRunOrderId == ''">动态图</el-link>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;height: 100%;" v-show="isDynamicGraphShow">
      <DynamicGraph @closeDynamicGraphShow="closeDynamicGraphShow" @returnGenerateBatchReport="returnGenerateBatchReport" @cancelOrder="cancelOrder"  @chooseOrder="chooseOrder" ref="dynamicGraph"></DynamicGraph>
    </div>
    <div :class="zhankaiflag ? 'zhankai-div' : ''" @click.self="zhankaiflag = false">
      <div :class="['patlist', zhankaiflag?'open':'']">
        <div class="huakuai" style="z-index: 1000" @click="zhankai()">
          <i v-show="!zhankaiflag" class="el-icon-caret-left"></i>
          <i v-show="zhankaiflag" class="el-icon-caret-right"></i>
          <span style="font-size: 15px;">
            工艺配方
          </span>
        </div>
        <div class="patlist-container">
          <div class="patlist-container-wrapper">
            <span class="patlist-container-wrapper-title">维护工艺配方模板</span>
            <span class="patlist-container-wrapper-close" @click="zhankaiflag = false"><i class="el-icon-close"></i></span>
          </div>
          <div class="patlist-container-inner">
            <DictOrder v-if="zhankaiflag"></DictOrder>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpUtil from '@/utils/HttpUtil'
import { Debugger, ipcRenderer } from 'electron'
import DynamicGraph from '../dynamicgraph/DynamicGraph.vue'
import DictOrder from './DictOrder.vue'
import moment from 'moment';
export default {
  name: "OrderList",
  components: {
    DynamicGraph,
    DictOrder
  },
  props: {},
  data() {
    return {
      zhankaiflag: false,
      orderMainForm: {},
      tableTitle:[
        {prop:"orderId",label:"任务编号",width:"200"},{prop:"revertFlag",label:"翻转",width:"150"},
        {prop:"batchId",label:"灭菌批号",width:"150"},{prop:"orderNo",label:"订单编号",width:"150"},{prop:"orderName",label:"订单名称",width:"150"},
        {prop:"planNum",label:"计划数量",width:"150"},{prop:"productName",label:"产品名称",width:"150"},{prop:"loadMethod",label:"装载方式",width:"150"},
        {prop:"pathName",label:"路径名称",width:"150"},{prop:"artName",label:"工艺名称",width:"150"},{prop:"acceleratorKValue",label:"加速器k值",width:"150"}
      ],
      dictOrderList: [],
      tableData: [],
      saveLoading: false,
      editLoading: false,
      isEdit: false,
      isNewSave: false,
      currentSelect: {},
      isDynamicGraphShow: false,
      getOrderListLoading: false,
      nowRunOrderId: '',
      tableMaxHeight: 0,
      selectTemp: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    zhankai() {
      if (this.zhankaiflag) {
        this.zhankaiflag = false;
      } else {
        this.zhankaiflag = true;
      }
    },
    cancelEditOrSave() {
      this.isNewSave = false;
      this.isEdit = false;
    },
    newOrderClick() {
      this.selectTemp = null
      this.isNewSave = true;
      this.orderMainForm = {};
    },
    editClick(val) {
      this.isEdit = true;
      this.orderMainForm = JSON.parse(JSON.stringify(val));
      this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '翻转' ? true : false
      this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
      this.currentSelect = val;
      // alert(JSON.stringify(orderMain))
    },
    async saveOrder() {
      if(this.orderMainForm.orderNo == '' || this.orderMainForm.orderNo == undefined ) {
        this.$message.error('订单编号必须填写！');
        return false;
      }
      if(this.orderMainForm.batchId == '' || this.orderMainForm.batchId == undefined ) {
        this.$message.error('灭菌批号必须填写！');
        return false;
      }
      this.saveLoading = true;
      this.orderMainForm.revertFlag = this.orderMainForm.revertFlag ? '1' : '0'
      this.orderMainForm.trayFlag = this.orderMainForm.trayFlag ? '1' : '0'
      await HttpUtil.post('/order/save', this.orderMainForm).then((res)=> {
        if(res.data === 1) {
          this.$message.success('保存成功！');
          // 查询订单信息
          this.getOrderList();
        } else {
          this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '1' ? true : false
          this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
          this.$message.error('保存失败，请检查信息是否填写完整！');
        }
        this.saveLoading = false;
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '1' ? true : false
          this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
        this.$message.error('保存失败，请检查信息是否填写完整！' + err);
        this.saveLoading = false;
      });
    },
    async updateOrder() {
      this.editLoading = true;
      this.orderMainForm.revertFlag = this.orderMainForm.revertFlag ? '1' : '0'
      this.orderMainForm.trayFlag = this.orderMainForm.trayFlag ? '1' : '0'
      await HttpUtil.post('/order/update', this.orderMainForm).then((res)=> {
        if(res.data === 1) {
          this.$message.success('修改成功！');
          // 将修改的订单信息同步到动态图组件
          this.$nextTick(() => {
            this.$refs.dynamicGraph.replaceOrderData(this.orderMainForm);
          });
          // 查询订单信息
          this.getOrderList();
        } else {
          this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '1' ? true : false
          this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
          this.$message.error('修改失败！');
        }
        this.editLoading = false;
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '1' ? true : false
          this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
        this.$message.error('修改失败！' + err);
        this.editLoading = false;
      });
    },
    async getOrderList() {
      this.getOrderListLoading = true
      await HttpUtil.get('/order/getOrderList').then((res)=> {
        this.tableData = res.data
        this.tableData.forEach(item => {
          item.revertFlag = item.revertFlag == '1' ? '翻转' : ''
        })
        this.orderMainForm = {};
        this.isNewSave = false;
        this.isEdit = false;
        setTimeout(() => {
          this.getOrderListLoading = false
        }, 500);
      }).catch((err)=> {
        setTimeout(() => {
          this.getOrderListLoading = false
        }, 500);
        // 网络异常 稍后再试
        this.$message.error('查询失败！' + err);
      });
      // this.tableData = [{revertFlag: '翻转', orderId: '202306160001', orderName: '威高一次性管路'}];
    },
    showDynamicGraph() {
      this.isDynamicGraphShow = true;
    },
    closeDynamicGraphShow() {
      this.isDynamicGraphShow = false
    },
    async getId() {
      await HttpUtil.post('/box/getId').then((res)=> {
        if(res.data >= 0) {
          this.$nextTick(() => {
            this.$refs.dynamicGraph.setBeginCountNum(res.data)
          });
        } else {
          throw new Error();
        }
      }).catch((err)=> {
        throw new Error();
      });
    },
    async chooseOrder(obj, changeFlag) {
      // 启动前的准备工作，不符合则不让启动
      // 1、首先判断本次模拟id0~9999数字起始的数字
      try {
        await this.getId();
      } catch (error) {
        this.$message.error('获取模拟id方法错误！请重新尝试！');
        throw new Error("A 方法异常");
      }
      const param = {
        orderId: obj.orderId,
        startTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        orderStatus: 200
      }
      // 更新订单开始时间
      HttpUtil.post('/order/update', param).then((res)=> {
        if(res.data == 1) {
          this.$message.success('开始订单！更新订单开始时间成功！')
          // 运行
          this.nowRunOrderId = obj.orderId;
        } else {
          this.$message.error('开始失败！更新订单开始时间失败！')
        }
      }).catch((err)=> {
        this.$message.error('开始失败！更新订单开始时间失败！')
      });
      // 将订单信息同步到动态图组件
      this.$nextTick(() => {
        this.$refs.dynamicGraph.showOrderInfo(obj, changeFlag);
      });
    },
    cancelOrder(obj) {
      // 更新订单状态300
      const param = {
        orderId: obj.orderId,
        orderStatus: 300
      }
      // 更新300状态
      HttpUtil.post('/order/update', param).then((res)=> {
        if(res.data != 1) {
          this.$message.error('更新订单运行状态失败！')
        } else {
          this.$message.success('已停止！更新订单运行状态！')
          this.nowRunOrderId = '';
        }
      }).catch((err)=> {
        this.$message.error('更新订单运行状态失败！')
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    handleCurrentChange(val) {
      if(val != null) {
        this.orderMainForm = JSON.parse(JSON.stringify(val));
        this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '翻转' ? true : false
        this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
        this.currentSelect = val;
        this.isNewSave = false;
        this.isEdit = false;
      }
    },
    generateBatchReport() {
      this.getOrderListLoading = true;
      this.$nextTick(() => {
        this.$refs.dynamicGraph.generateBatchReport()
      });
    },
    returnGenerateBatchReport(res) {
      this.getOrderListLoading = false;
      if (res) {
        this.$message.success('生成成功！');
        this.getOrderList();
        this.nowRunOrderId = '';
      } else {
        this.$message.error('生成失败！请重试！');
      }
    },
    positionOrder() {
      // 通过 nowRunOrderId 定位当前运行订单在tableData的index
      const index = this.tableData.findIndex(element => element.orderId == this.nowRunOrderId);
      this.$nextTick(() => {
        this.$refs.singleTable.setCurrentRow(this.tableData[index]);
      });
    },
    autoCalMaxHeight() {
      this.tableMaxHeight = this.$refs.listMiddle.offsetHeight - 55;
    },
    getDictOrder() {
      this.dictOrderList = []
      HttpUtil.get('/dict/getDictOrder').then((res)=> {
        if(res.data) {
          this.dictOrderList = res.data
        }
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.$message.error('获取配方失败！' + err);
      });
    },
    selectDictOrder(value) {
      this.orderMainForm = this.dictOrderList[value]
      this.orderMainForm.revertFlag = this.orderMainForm.revertFlag == '1' ? true : false
      this.orderMainForm.trayFlag = this.orderMainForm.trayFlag == '1' ? true : false
    }
  },
  created() {
    this.getOrderList()
  },
  mounted() {
    this.$nextTick(() => {
      this.tableMaxHeight = this.$refs.listMiddle.offsetHeight - 55;
      window.addEventListener('resize', this.autoCalMaxHeight);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.autoCalMaxHeight);
  }
};
</script>
<style lang="less" scoped>
.orderlist {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  > div {
    width: 100%;
    height: 100%;
    opacity: 1;
    border-radius: 20px;
    background: rgb(255, 255, 255);
    box-shadow: 0px 60px 90px 0px rgba(0, 0, 0, 0.2);
    // backdrop-filter: blur(88px);
    .formDiv {
      .card-title {
        height: 30px;
        width: 100%;
        font-weight: 550;
        letter-spacing: 0px;
        color: rgba(0, 0, 0, 1);
        text-align: left;
        vertical-align: top;
        display: flex;
        align-items: flex-end;
        padding-left: 23px;
      }
      .card-content {
        height: calc(100% - 37px);
        width: 100%;
        padding: 10px 0px 0px 16px;
        box-sizing: border-box;
        .content-bottom {
          height: 48px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        ::v-deep .el-form-item {
          margin-bottom: 9px;
        }
        ::v-deep .el-form-item__label {
          color: black;
          padding: 0 2px 0 0;
          border-width: 1px;
          border-style: solid;
          border-radius: 2px 0 0 2px;
          background-color: #fafafa;
          border-color: #eee;
          box-sizing: border-box;
          overflow: hidden;
          height: 32px;
          line-height: 32px;
        }
        ::v-deep .el-form-item__content {
          line-height: 32px;
          .el-input {
            left: -1px;
          }
          .el-input__inner {
            border-radius: 0px;
            border: 1px #eee solid;
            width: 140px;
            padding-right: 0px;
          }
        }
      }
    }
    ::v-deep .el-divider--horizontal{
      margin: 5px;
    }
    .listDiv {
      box-sizing: border-box;
      padding: 0px 16px;
      height: calc(100% - 330px);
      ::v-deep {
        .el-link [class*=el-icon-]+span {
          margin-left: 2px;
        }
      }
      .list-top {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .list-middle {
        height: calc(100% - 50px);
        width: 100%;
      }
    }
  }
}
.patlist {
  position: absolute;
  width: 0;
  background-color: #fff;
  box-shadow: 0 0 10px #888;
  z-index: 999;
  height: calc(100vh - 180px);
  transition: width 0.15s linear;
  top: 45px;
  right: 6px;
  .huakuai {
    position: absolute;
    height: 58px;
    width: 50px;
    top: calc(50% - 150px);
    left: -50px;
    background-color: #459df5;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: white;
  }
  .patlist-container {
    height: 100%;
    .patlist-container-wrapper {
      position: relative;
      text-align: right;
      height: 40px;
      background: #eef2fd;
      line-height: 40px;
      color: rgba(0, 0, 0, 0.65);
      &-title {
        font-weight: bold;
        margin-left: 10px;
        float: left;
      }
      &-close {
        cursor: pointer;
        width: 40px;
        height: 40px;
        font-size: 20px;
        margin-right: 20px;
      }
    }
    .patlist-container-inner {
      margin: 8px;
      height: calc(100% - 60px);
    }
  }
}
.zhankai-div {
  width: 100%;
  height: calc(100% - 55px);
  position: absolute;
  top: 0;
  background: #ffffff6b;
  margin-top: 55px;
}
.open {
  width: 1215px !important;
  opacity: 1 !important;
}
</style>