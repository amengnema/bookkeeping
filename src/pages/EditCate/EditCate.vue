<template>
  <div>
    <HeaderTop>
      <el-radio-group v-model="tabPosition" slot="tab">
        <el-radio-button label="out">支出</el-radio-button>
        <el-radio-button label="in">收入</el-radio-button>
      </el-radio-group>
    </HeaderTop>
    <el-main>
      <ul class="cate-list">
        <li @click="$router.push('/money/edit/add/' + tabPosition)">
          <span>
            <span class="name">添加新的标签</span>
          </span>
          <i class="el-icon-arrow-right"></i>
        </li>
        <li v-for="item in showTagList" :key="item.id">
          <span>
            <i :class="item.icon"></i>
            <span class="name">{{ item.title }}</span>
          </span>
          <i class="el-icon-delete" @click="deleteTag(item.id)"></i>
        </li>
      </ul>
    </el-main>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data() {
    return {
      tabPosition: 'out',
      tagList: []
    }
  },
  mounted() {
    //读取tagList
    let ltags = JSON.parse(localStorage.getItem('tagList')) || []
    if (ltags.length == 0) {
      localStorage.setItem(
        'tagList',
        JSON.stringify([
          { id: 1, title: '饮食', type: 'out', icon: 'el-icon-fork-spoon' },
          { id: 2, title: '日用', type: 'out', icon: 'el-icon-refrigerator' },
          { id: 3, title: '衣服', type: 'out', icon: 'el-icon-shopping-bag-1' },
          { id: 4, title: '美容', type: 'out', icon: 'el-icon-magic-stick' },
          { id: 5, title: '工资', type: 'in', icon: 'el-icon-bank-card' },
          { id: 6, title: '零花钱', type: 'in', icon: 'el-icon-wallet' }
        ])
      )
      this.tagList = JSON.parse(localStorage.getItem('tagList'))
    }else {
      this.tagList = JSON.parse(localStorage.getItem('tagList'))
    }
  },
  computed: {
    //要展示的taglList
    showTagList() {
      return this.tagList.filter(item => {
        return item.type === this.tabPosition
      })
    }
  },
  methods: {
    deleteTag(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tagList.splice(
            this.tagList.findIndex(item => item.id == id),
            1
          )
          //删除后要更新localStorage的数据
          localStorage.setItem('tagList', JSON.stringify(this.tagList))
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000
          })
        })
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style>
.cate-list li {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px 0;
  font-size: 14px;
  color: #2c3e50;
}
.cate-list li span i {
  padding: 0 8px;
}
</style>
