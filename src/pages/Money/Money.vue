<template>
  <div>
    <HeaderTop>
      <el-radio-group v-model="tabPosition" slot="tab">
        <el-radio-button label="out">支出</el-radio-button>
        <el-radio-button label="in">收入</el-radio-button>
      </el-radio-group>
    </HeaderTop>
    <el-main>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="56px"
      >
        <el-form-item label="日期" prop="date">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="记录" prop="record">
          <el-input v-model="form.record"></el-input>
        </el-form-item>
        <el-form-item label="支出" prop="money" v-if="tabPosition == 'out'">
          <el-input v-model="form.money" @focus="isReset"></el-input>
        </el-form-item>
        <el-form-item label="收入" prop="money" v-else>
          <el-input v-model="form.money" @focus="isReset"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="expenditure"> </el-form-item>
        <el-radio-group v-model="form.expenditure" size="medium">
          <el-radio
            border
            :label="item.title"
            v-for="item in showTagList"
            :key="item.id"
            @change="setIcon(item.icon)"
          >
            <i :class="item.icon"></i>{{ item.title }}
          </el-radio>
          <el-button @click="$router.push('/money/edit')">编辑 > </el-button>
        </el-radio-group>
        <el-button
          class="submit-button"
          type="primary"
          @click="onSubmit('form')"
          >确定</el-button
        >
      </el-form>
    </el-main>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data() {
    return {
      tabPosition: 'out',
      form: {
        //时间框
        date: '',
        //记录
        record: '',
        //费用
        money: 0,
        //选中的分类标签
        expenditure: '',
        //图标
        icon:''
      },
      rules: {
        money: [
          { required: true, message: '请输入金额', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        expenditure: [
          { required: true, message: '请选择分类'}
        ]
      },
      tagList: [],
      //记录列表
      recordList:[]
    }
  },
  mounted() {
    //从localStorage加载账本
    this.recordList = JSON.parse(localStorage.getItem('recordList')) || []
    //从localStorage加载标签
    this.tagList = JSON.parse(localStorage.getItem('tagList')) || []
    this.getNowTime()
  },
  computed: {
    //筛选radio
    showTagList() {
      return this.tagList.filter(val => {
        return val.type === this.tabPosition
      })
    },
  },
  methods: {
    //支出和收入框选中时，如果值为0，则置为空
    isReset() {
      if(this.form.money == 0) {
        this.form.money = ''
      }
    },
    //提交存储
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let recordItem = Object.assign({},this.form)
          recordItem.type = this.tabPosition
          this.recordList.push(recordItem)
          //提交成功后清空表单
          this.$refs[formName].resetFields()
          //提示成功
          this.$message({
            message: '添加成功',
            type: 'success',
            duration:1000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //获取当前日期
    getNowTime() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth()
      let date = now.getDate()
      month = month + 1
      month = month.toString().padStart(2,"0")
      date = date.toString().padStart(2,"0")
      this.form.date = year + '-' + month + '-' +date
    },
    //手动设置icon
    setIcon(val) {
      this.form.icon = val
    }
  },
  components: {
    HeaderTop
  },
  watch: {
    //监听recordList
    recordList(val) {
      if(val.length) {
        localStorage.setItem('recordList',JSON.stringify(this.recordList))
      }
    }
  }
}
</script>

<style>
.submit-button {
  width: 100%;
}
.el-radio-group .el-radio {
  margin: 2px 10px;
}
.el-radio-group .el-button {
  margin: 2px 10px;
}
.el-radio__input {
  display: none;
}
</style>
