<template>
  <div>
    <HeaderTop>
      <el-radio-group v-model="tabPosition" slot="tab">
        <el-radio-button label="out">支出</el-radio-button>
        <el-radio-button label="in">收入</el-radio-button>
      </el-radio-group>
    </HeaderTop>
    <el-main>
      <el-date-picker
        v-model="monthValue"
        value-format="yyyy-MM"
        type="month"
        placeholder="选择月"
      >
      </el-date-picker>
      <div class="button-wrapper">
        <el-button type="danger" round @click="tabPosition = 'out'">-{{outCount}}</el-button>
        <el-button type="primary" round @click="tabPosition = 'in'">+{{inCount}}</el-button>
      </div>
      
      <div
        v-show="showList.length > 0"
        ref="echarts"
        style="width: 100%;height:400px;"
      ></div>
      <el-empty :image-size="200" v-if="showList.length == 0"></el-empty>
    </el-main>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      tabPosition: 'out',
      monthValue: '',
      //记录列表
      recordList: [],
      //要展示的列表
      showList: []
    }
  },
  mounted() {
    //从localStorage加载账本
    this.recordList = JSON.parse(localStorage.getItem('recordList')) || []
    this.getNowTime()
    this.showEcharts('out')
  },
  methods: {
    //渲染echarts
    showEcharts(tab) {
      let newArr = []
      if (this.recordList.length == 0) {
        return
      }
      if (this.showList.length == 0) {
        return
      }
      this.$nextTick(() => {
        this.showList.forEach(item => {
          if (item.type === tab) {
            newArr.push({ value: item.money, name: item.expenditure })
          }
        })
        //先销毁，再重新创建
        this.myChart ? this.myChart.dispose() : undefined
        this.myChart = echarts.init(this.$refs.echarts)
        this.myChart.setOption({
          title: {
            text: '账单明细',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: newArr,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })
    },
    //获取当前日期
    getNowTime() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth()
      month = month + 1
      month = month.toString().padStart(2, '0')
      this.monthValue = year + '-' + month
    },
    //条件筛选函数
    getShowList(date) {
      let arr1 = this.recordList.filter(value => {
        return value.date.indexOf(date) != -1
      })
      this.showList = arr1
    }
  },
  computed: {
    inCount() {
      let count = 0
      this.showList.forEach(item => {
        if(item.type === 'in') {
          count += item.money>>>0
        }
      })
      return count
    },
    outCount() {
      let count = 0
      this.showList.forEach(item => {
        if(item.type === 'out') {
          count += item.money>>>0
        }
      })
      return count
    }
  },
  watch: {
    //监听上面的tab
    tabPosition(tab) {
      //先销毁，再重新创建
      this.showEcharts(tab)
    },
    //监听日期选择器
    monthValue(val) {
      if (val) {
        this.getShowList(val)
        this.showEcharts(this.tabPosition)
      } else {
        this.getShowList('')
        this.showEcharts(this.tabPosition)
      }
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style>
.button-wrapper {
  margin:10px 0;
}
</style>
