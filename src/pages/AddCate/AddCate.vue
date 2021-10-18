<template>
  <div class="add-cate">
    <HeaderTop>
      <template slot="title">
        {{ $route.params.type === 'out' ? '支出' : '收入' }}新标签
      </template>
    </HeaderTop>
    <el-main>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        label-width="56px"
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="selectedIcon"> </el-form-item>
        <el-radio-group v-model="form.selectedIcon" size="medium">
          <el-radio
            border
            :label="item.icon"
            v-for="item in tags"
            :key="item.id"
          >
            <i :class="item.icon"></i>
          </el-radio>
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
import {nanoid} from 'nanoid'
export default {
  data() {
    return {
      form: {
        //名字
        name: '',
        //选中的图标
        selectedIcon: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        selectedIcon: [
          { required: true, message: '请选一个图标', trigger: 'blur' }
        ]
      },
      tags: [
        { id: 1, title: '饮食', icon: 'el-icon-fork-spoon' },
        { id: 2, title: '日用', icon: 'el-icon-refrigerator' },
        { id: 3, title: '衣服', icon: 'el-icon-shopping-bag-1' },
        { id: 4, title: '美容', icon: 'el-icon-magic-stick' },
        { id: 5, title: '工资', icon: 'el-icon-bank-card' },
        { id: 6, title: '零花钱', icon: 'el-icon-wallet' },
        { id: 7, title: '话费', icon: 'el-icon-phone' },
        { id: 8, title: '房租', icon: 'el-icon-s-home' },
        { id: 9, title: '交通', icon: 'el-icon-bicycle' }
      ],
      tagList:[]
    }
  },
  mounted() {
    //读取tagList
    this.tagList = JSON.parse(localStorage.getItem('tagList')) || []
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = { id: nanoid(), title: this.form.name, type: this.$route.params.type,icon:this.form.selectedIcon }
          this.tagList.push(obj)
          //添加到localStorage
          localStorage.setItem('tagList',JSON.stringify(this.tagList))
          //提示成功
          this.$message({
            message: '添加成功',
            type: 'success',
            duration:1000
          })
          //提交成功后清空表单
          this.$refs[formName].resetFields()
          //添加成功，返回上一个路由
          this.$router.go(-1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style>
.el-radio-group .el-radio {
  width:23%;
  margin:10px;
}
.el-radio-group .el-radio i {
  font-size: 16px;
}
</style>
