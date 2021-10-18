<template>
  <div class="calendar">
    <HeaderTop>
      <template slot="title">
        明细
      </template>
    </HeaderTop>
    <el-main>
      <el-date-picker
        v-model="monthValue"
        value-format="yyyy-MM"
        type="month"
        placeholder="选择月"
      >
      </el-date-picker>
      <ul class="ca-list" v-if="showList.length > 0">
        <li v-for="(list, index) in showList" :key="index">
          <h3 class="title">
            <span>{{ list.date }}</span>
            <span class="money" :class="{ on: computeMoney(list) >= 0 }"
              >{{ computeMoney(list) >= 0 ? '+' : ''
              }}{{ computeMoney(list) }}</span
            >
          </h3>
          <ul>
            <li v-for="(item, index1) in list.data" :key="index1">
              <span><i :class="item.icon"></i>{{ item.expenditure
                }}<span class="record">({{ item.record }})</span></span
              >
              <span class="money"
                >{{ item.type === 'in' ? '+' : '-' }}{{ item.money }}</span
              >
            </li>
          </ul>
        </li>
      </ul>
      <el-empty :image-size="200" v-else></el-empty>
    </el-main>
  </div>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop'
export default {
  data() {
    return {
      monthValue: '',
      //记录列表
      recordList: [],
      //经过月份分类的列表
      newList: [],
      //要展示的列表
      showList:[]
    }
  },
  mounted() {
    //从localStorage加载账本
    this.recordList = JSON.parse(localStorage.getItem('recordList')) || []
    this.getNewList()
    this.getNowTime()
  },
  methods: {
    //处理元数据，得到经过分类的列表
    getNewList() {
      let dateArr = [] //['2021-09-09', '2021-09-17', '2021-09-10', '2021-08-30', '2021-09-09']
      let newArr = [] //[{…}, {…}, {…}, {…}, {…}]
      this.recordList.forEach(item => {
        if (dateArr.indexOf(item.date) == -1) {
          newArr.push({ date: item.date, data: [item] })
        } else {
          newArr[dateArr.indexOf(item.date)].data.push(item)
        }
        dateArr.push(item.date)
      })
      this.newList = newArr
    },
    //获取当前日期
    getNowTime() {
      let now = new Date()
      let year = now.getFullYear()
      let month = now.getMonth()
      month = month + 1
      month = month.toString().padStart(2,"0")
      this.monthValue = year + '-' + month
    },
    //条件筛选函数
    getShowList(date) {
      let arr1 = this.newList.filter(value => {
        return value.date.indexOf(date) != -1
      })
      this.showList = arr1
    }
  },
  computed: {
    //计算总金额
    computeMoney() {
      return function(list) {
        let count = 0
        list.data.forEach(item => {
          if (item.type === 'in') {
            count += item.money >>> 0
          } else {
            count -= item.money >>> 0
          }
        })
        return count
      }
    }
  },
  watch: {
    //监听日期选择器
    monthValue(val) {
      if(val) {
        this.getShowList(val)
      }else {
        this.getShowList('')
      }
    }
  },
  components: {
    HeaderTop
  }
}
</script>

<style>
.el-date-editor.el-input {
  width: 100%;
}
.calendar .ca-list .title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
  background-color: #f4f5f6;
}
.calendar .ca-list .title .money {
  color: #f00;
}
.calendar .ca-list .title .money.on {
  color: #409eff;
}
.ca-list {
  margin-top: 3px;
}
.ca-list li {
  list-style: none;
}
.ca-list li ul li {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding: 18px 0;
  border-bottom: 1px solid #ccc;
}
.ca-list li ul li .record {
  color: gray;
  font-size: 12px;
}
.ca-list li ul li .money {
  color: #2c3e50;
}
.ca-list li ul li span i {
  margin:0 5px;
}
</style>
