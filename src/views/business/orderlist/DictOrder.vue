<template>
  <div style="width: 100%;height: 100%;">
    <div class="dict-order-top">
      <el-button type="primary" icon="el-icon-plus" @click="addNew()" style="margin-left: 2px;">新建配方</el-button>
      <el-button type="info" icon="el-icon-refresh" @click="getDictOrder()">刷新</el-button>
    </div>
    <div class="dict-order-down">
        <div v-if="dictOrderList.length > 0" style="width: 100%;height: 100%;box-sizing: border-box;padding:8px;background-color: rgb(214, 220, 230);display: flex;">
          <div style="width: 300px;height: 100%;background-color: white;overflow: auto;">
            <div :class="['dict-list-card', activeIndex == index ? 'dict-list-card-active': '']" v-for="(item, index) in dictOrderList" :key="index" @click="clickCard(index)">
              <div class="tag-div"><el-tag>{{ index + 1 }}</el-tag></div>
              <span class="dict-name-span">{{ item.dictName }}</span>
              <div class="edit-dict-div">
                <el-tooltip class="item" effect="dark" content="修改配方名称" placement="right">
                  <el-button icon="el-icon-edit" circle size="mini" @click="editDictOrderName"></el-button>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div style="width: calc(100% - 308px); margin-left: 10px; height: 100%; background-color: white; box-sizing:border-box; padding: 10px 0px 0px 20px;overflow: auto;" v-loading="dictOrderLoading">
            <el-form :inline="true" label-position="right" label-width="130px" :model="dictOrderForm" class="demo-form-inline">
              <el-form-item label="订单名称：">
                <el-input size="small" v-model="dictOrderForm.orderName" placeholder="订单名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="dictOrderForm.revertFlag">翻转</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="dictOrderForm.trayFlag">托盘模式</el-checkbox>
              </el-form-item>
              <br/>
              <el-form-item label="产品名称：">
                <el-input size="small" v-model="dictOrderForm.productName" placeholder="产品名称"></el-input>
              </el-form-item>
              <el-form-item label="工艺名称：">
                <el-input size="small" v-model="dictOrderForm.artName" placeholder="工艺名称"></el-input>
              </el-form-item>
              <el-form-item label="装载方式：">
                <el-input size="small" v-model="dictOrderForm.loadMethod" placeholder="装载方式"></el-input>
              </el-form-item>
              <el-form-item label="路径名称：">
                <el-input size="small" v-model="dictOrderForm.pathName" placeholder="路径名称"></el-input>
              </el-form-item>
              <el-form-item label="圈数：">
                <el-input type="number" size="small" v-model="dictOrderForm.numberTurns" placeholder="圈数"></el-input>
              </el-form-item>
              <el-form-item label="箱子长度：">
                <el-input type="number" size="small" v-model="dictOrderForm.boxLength" placeholder="箱子长度"></el-input>
              </el-form-item>
              <el-form-item label="箱子高度：">
                <el-input type="number" size="small" v-model="dictOrderForm.boxHeight" placeholder="箱子高度"></el-input>
              </el-form-item>
              <el-form-item label="箱子宽度：">
                <el-input type="number" size="small" v-model="dictOrderForm.boxWidth" placeholder="箱子宽度"></el-input>
              </el-form-item>
              <el-form-item label="箱子重量：">
                <el-input type="number" size="small" v-model="dictOrderForm.boxWeight" placeholder="箱子重量"></el-input>
              </el-form-item>
              <el-form-item label="束下速度下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.sxSpeedLowerLimit" placeholder="束下速度下限"></el-input>
              </el-form-item>
              <el-form-item label="束下速度值：">
                <el-input type="number" size="small" v-model="dictOrderForm.sxSpeedSet" placeholder="束下速度值"></el-input>
              </el-form-item>
              <el-form-item label="束下速度上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.sxSpeedUpperLimit" placeholder="束下速度上限"></el-input>
              </el-form-item>
              <el-form-item label="束流下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.slLowerLimit" placeholder="束流下限"></el-input>
              </el-form-item>
              <el-form-item label="束流设定值：">
                <el-input type="number" size="small" v-model="dictOrderForm.slSet" placeholder="束流设定值"></el-input>
              </el-form-item>
              <el-form-item label="束流上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.slUpperLimit" placeholder="束流上限"></el-input>
              </el-form-item>
              <el-form-item label="功率下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.glLowerLimit" placeholder="功率下限"></el-input>
              </el-form-item>
              <el-form-item label="功率设定值：">
                <el-input type="number" size="small" v-model="dictOrderForm.glSet" placeholder="功率设定值"></el-input>
              </el-form-item>
              <el-form-item label="功率上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.glUpperLimit" placeholder="功率上限"></el-input>
              </el-form-item>
              <el-form-item label="扫宽下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.skLowerLimit" placeholder="扫宽下限"></el-input>
              </el-form-item>
              <el-form-item label="扫宽设定值：">
                <el-input type="number" size="small" v-model="dictOrderForm.skSet" placeholder="扫宽设定值"></el-input>
              </el-form-item>
              <el-form-item label="扫宽上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.skUpperLimit" placeholder="扫宽上限"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.smplLowerLimit" placeholder="扫描频率下限"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率设定：">
                <el-input type="number" size="small" v-model="dictOrderForm.smplSet" placeholder="扫描频率设定"></el-input>
              </el-form-item>
              <el-form-item label="扫描频率上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.smplUpperLimit" placeholder="扫描频率上限"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.pfnLowerLimit" placeholder="PFN电压下限"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压设定：">
                <el-input type="number" size="small" v-model="dictOrderForm.pfnSet" placeholder="PFN电压设定"></el-input>
              </el-form-item>
              <el-form-item label="PFN电压上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.pfnUpperLimit" placeholder="PFN电压上限"></el-input>
              </el-form-item>
              <el-form-item label="能量下限：">
                <el-input type="number" size="small" v-model="dictOrderForm.nlLowerLimit" placeholder="能量下限"></el-input>
              </el-form-item>
              <el-form-item label="能量设定值：">
                <el-input type="number" size="small" v-model="dictOrderForm.nlSet" placeholder="能量设定值"></el-input>
              </el-form-item>
              <el-form-item label="能量上限：">
                <el-input type="number" size="small" v-model="dictOrderForm.nlUpperLimit" placeholder="能量上限"></el-input>
              </el-form-item>
              <el-form-item label="订单箱数：" v-show="false">
                <el-input type="number" size="small" v-model="dictOrderForm.orderBoxNum" placeholder="订单箱数"></el-input>
              </el-form-item>
            </el-form>
            <div style="width: 100%;height: 50px;line-height: 50px;text-align: center;">
              <el-button type="primary" @click="update">保 存</el-button>
              <el-popconfirm
                title="删除后不可恢复，请确认是否删除？"
                placement="top"
                @confirm="deleteDict"
              >
                <el-button slot="reference" type="danger" style="margin-left: 20px;">作废配方</el-button>
              </el-popconfirm>
              
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无工艺配方模板！" style="height: 100%;"></el-empty>
    </div>
    <el-dialog
      title="请输入配方名称："
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :close-on-click-modal="false"
      >
      <el-input v-model="inputName" placeholder="请输入配方名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save" :loading="saveLoading">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改配方名称："
      :visible.sync="dialogEditVisible"
      width="30%"
      append-to-body
      :close-on-click-modal="false"
      >
      <el-input v-model="dictOrderForm.dictName" placeholder="请输入配方名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDictOrderName" :loading="dialogEditLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import HttpUtil from '@/utils/HttpUtil'
export default {
  name: "DictOrder",
  components: {},
  props: {},
  data() {
    return {
      dictOrderList: [],
      inputName: '',
      dialogVisible: false,
      dictOrderForm: {},
      saveLoading: false,
      activeIndex: 0,
      dictOrderLoading: false,
      dialogEditVisible: false,
      dialogEditLoading: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    deleteDict() {
      this.dictOrderLoading = true
      HttpUtil.post('/dict/update', { dictOrderId: this.dictOrderForm.dictOrderId, invalidFlag: '1' }).then((res)=> {
        if(res.data === 1) {
          this.$message.success('删除成功！');
          this.getDictOrder()
        } else {
          this.$message.error('删除失败！请重试！');
        }
        setTimeout(() => {
          this.dictOrderLoading = false;
        }, 500);
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.dictOrderLoading = false;
        this.$message.error('保存失败！错误：' + err);
      });
    },
    update() {
      this.dictOrderLoading = true
      this.dictOrderForm.revertFlag = this.dictOrderForm.revertFlag ? '1' : '0'
      this.dictOrderForm.trayFlag = this.dictOrderForm.trayFlag ? '1' : '0'
      HttpUtil.post('/dict/update', this.dictOrderForm).then((res)=> {
        if(res.data === 1) {
          this.$message.success('保存成功！');
        } else {
          this.$message.error('保存失败！请重试！');
        }
        this.dictOrderForm.revertFlag = this.dictOrderForm.revertFlag == '1' ? true : false
        this.dictOrderForm.trayFlag = this.dictOrderForm.trayFlag == '1' ? true : false
        setTimeout(() => {
          this.dictOrderLoading = false;
        }, 500);
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.dictOrderForm.revertFlag = this.dictOrderForm.revertFlag == '1' ? true : false
        this.dictOrderForm.trayFlag = this.dictOrderForm.trayFlag == '1' ? true : false
        this.dictOrderLoading = false;
        this.$message.error('保存失败！错误：' + err);
      });
    },
    clickCard(index) {
      this.dictOrderLoading = true
      this.activeIndex = index;
      this.dictOrderForm = this.dictOrderList[index];
      this.dictOrderForm.revertFlag = this.dictOrderForm.revertFlag == '1' ? true : false
      this.dictOrderForm.trayFlag = this.dictOrderForm.trayFlag == '1' ? true : false
      setTimeout(() => {
        this.dictOrderLoading = false
      }, 500);
    },
    editDictOrderName() {
      this.dialogEditVisible = true;
    },
    updateDictOrderName() {
      if(this.dictOrderForm.dictName == '') {
        this.$message.error('配方名称不可为空！');
        return false
      }
      this.dialogEditLoading = true;
      HttpUtil.post('/dict/update', { dictOrderId: this.dictOrderForm.dictOrderId, dictName: this.dictOrderForm.dictName }).then((res)=> {
        if(res.data === 1) {
          this.$message.success('修改成功！');
          this.dialogEditVisible = false;
          HttpUtil.get('/dict/getDictOrder').then((res)=> {
            if(res.data) {
              this.dictOrderList = res.data
            }
          }).catch((err)=> {
            // 网络异常 稍后再试
            this.$message.error('查询失败！' + err);
          });
        } else {
          this.$message.error('修改失败！请重试！');
        }
        setTimeout(() => {
          this.dialogEditLoading = false;
        }, 500);
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.dialogEditLoading = false;
        this.$message.error('修改失败！错误：' + err);
      });
    },
    save() {
      if(this.inputName == '') {
        this.$message.error('配方名称不可为空！');
        return false
      }
      this.saveLoading = true
      HttpUtil.post('/dict/save', {dictName: this.inputName}).then((res)=> {
        if(res.data === 1) {
          this.$message.success('保存成功！');
          this.dialogVisible = false;
          // 查询订单信息
          this.getDictOrder();
        } else {
          this.$message.error('保存失败！请重试！');
        }
        this.saveLoading = false;
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.saveLoading = false;
        this.$message.error('失败！错误：' + err);
      });
    },
    addNew() {
      this.dialogVisible = true;
      this.inputName = '';
    },
    async getDictOrder() {
      this.dictOrderList = []
      this.activeIndex = 0;
      await HttpUtil.get('/dict/getDictOrder').then((res)=> {
        if(res.data.length > 0) {
          this.dictOrderList = res.data
          this.clickCard(0)
        }
      }).catch((err)=> {
        // 网络异常 稍后再试
        this.$message.error('查询失败！' + err);
      });
    }
  },
  created() {
    this.getDictOrder();
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.dict-order-top {
    display: flex;
    align-items: center;
    height: 43px;
    width: 100%;
}
.dict-order-down {
    height: calc(100% - 50px);
    width: 100%;
    margin-top: 7px;
    .dict-list-card {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #dedede;
      display: flex;
      align-items: center;
      font-size: 17px;
      box-sizing: border-box;
      padding: 0px 40px 0px 10px;
      .dict-name-span {
        margin-left: 12px;
        font-weight: 600;
      }
      .tag-div {
        width: 31px;
        height: 100%;
        display: flex;
        align-items: center;
      }
      .edit-dict-div {
        width: 30px;
        left: 280px;
        position: absolute;
      }
    }
    .dict-list-card:hover {
      border: 1px solid #1990ff;
      box-shadow: 0 0 6px #1990ff;
      cursor: pointer;
    }
    .dict-list-card-active {
      background-color: rgb(64, 158, 255);
      color: white;
    }
}

// 滚动槽样式定义
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: #459DF5 !important;
}

::-webkit-scrollbar-thumb:window-inactive {
  background-color: #459DF5;
}
::v-deep .el-dialog__body{
  padding: 17px 20px 15px 20px;
}
::v-deep .el-form-item {
  margin-bottom: 12px;
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
  font-size: 16px;
  font-weight: 500;
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
    font-size: 16px;
    color: #0881ff;
  }
}
</style>