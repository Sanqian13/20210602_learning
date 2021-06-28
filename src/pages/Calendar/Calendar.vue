<template>
  <section class="mycalendar" :class="{'bg-color': !showYear}">
    <HeaderTop :title="address.name"></HeaderTop>
    <div class="headerTitle">
      <div class="title">{{showYear ? currentYear+'年' : currentYear+'年'+currentMonth+'月'}}</div>
      <ul class="menu">
          <li :class="{'on': showYear}" @click="showYear = true">年份</li>
          <li :class="{'on': !showYear}" @click="showYear = false">月份</li>
          <li>具体</li>
      </ul>
    </div>
    <div class="calendar-month" v-if="!showYear">
      <ul class="date">
        <li class="day" v-for="(week, index) in weeks" :key="index">{{week}}</li>
      </ul>
      <div class="swiper-container" id="swiper1" v-if="months.length && !showYear">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(month, index) in months" :key="index">
            <div class="day" v-for="(day, index) in month"
              :key="index"
              @click="selectDay(index)"
              :class="{
                'on': index === selected,
                'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
              {{day}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-year" v-if="showYear">
      <div class="swiper-container" id="swiper2" v-if="years.length && showYear">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(year, index) in years" :key="index">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in year" :key="index">
              <div class="title">{{month.title}}</div>
              <ul class="weeks">
                <li class="week" v-for="(week, index) in weeks" :key="index">{{week}}</li>
              </ul>
              <div class="day" v-for="(day, index) in month.data"
                :key="index"
                @click="selectDay(index)"
                :class="{
                  'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
                {{day}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterGuide/>
  </section>

</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import FooterGuide from '../../components/FooterGuide/FooterGuide.vue'
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  data () {
    return {
      swiperOption: {
        observer: true,
        autoHeight: true, // 高度随内容变化
        loop: true // 开启循环首位相连
        // effect: 'flip' // 切换效果
      },
      swiperYearOption: {
        observer: true,
        autoHeight: false, // 高度随内容变化
        loop: true // 开启循环首位相连
        // effect: 'flip' // 切换效果
      },
      currentDate: {}, // 保存当天日期数据
      currentDay: 0, // 保存当前展示天数
      currentMonth: 0, // 保存当前展示月份
      currentYear: 0, // 保存当前展示年份
      selected: 0, // 点击选中index
      selectMonth: 0, // 点击选中月份index
      weeks: ['一', '二', '三', '四', '五', '六', '日'], // 星期数组
      preMonthArr: [], // 展示月份前一个月数组
      curMonthArr: [], // 当前展示月份数组
      nextMonthArr: [], // 当前展示月份下一个月数组
      months: [], // 合并三个月数据
      years: [], // 合并十二个月数据
      showYear: false, // 控制是否显示一整年的数据
      tempArr: [6, 7, 5]
    }
  },
  components: {
    FooterGuide,
    HeaderTop
  },
  created () {
    // 初始化日历
    this.initCalendar()
    // this.initCalendarYear()
  },
  mounted () {
    this.initSwiper() // mounted 初始化滑动
    // this.initYearSwiper()
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    // 选择日期点击事件
    selectDay (index) {
      this.selected = index
    },
    // 初始化日历数据
    initCalendar () {
      let current = new Date()
      this.currentDay = current.getDate()
      this.currentMonth = current.getMonth() + 1
      this.currentYear = current.getFullYear()

      this.curMonthArr = this.getDateModule(this.currentYear, this.currentMonth)
      if (this.currentMonth === 12) this.nextMonthArr = this.getDateModule(this.currentYear + 1, 1)
      this.nextMonthArr = this.getDateModule(this.currentYear, this.currentMonth + 1)
      if (this.currentMonth === 1) this.preMonthArr = this.getDateModule(this.currentYear - 1, 12)
      this.preMonthArr = this.getDateModule(this.currentYear, this.currentMonth - 1)

      this.months = [this.curMonthArr, this.nextMonthArr, this.preMonthArr]
      this.selected = this.curMonthArr.indexOf(this.currentDay)

      this.currentDate = {
        'year': this.currentYear,
        'month': this.currentMonth,
        'day': this.currentDay,
        'index': this.selected
      }
    },
    // 初始化年日历数据
    initCalendarYear () {
      this.curYearArr = this.getYearModule(this.currentYear)
      this.preYearArr = this.getYearModule(this.currentYear - 1)
      this.nextYearArr = this.getYearModule(this.currentYear + 1)
      this.years = [this.preYearArr, this.curYearArr, this.nextYearArr]
      this.selectMonth = this.currentMonth - 1
      // console.log(this.years)
    },
    // 初始化滑动
    initSwiper () {
      this.monthSwiper = new Swiper('#swiper1', this.swiperOption)
      this.monthSwiper.on('slidePrevTransitionEnd', () => {
        this.currentMonth--
        if (this.monthSwiper.activeIndex === 0) this.tempArr[1] = this.currentMonth - 1
        if (this.monthSwiper.activeIndex === 2) this.tempArr[0] = this.currentMonth - 1
        if (this.monthSwiper.activeIndex === 1) this.tempArr[2] = this.currentMonth - 1
        console.log(`====${this.monthSwiper.activeIndex}:${this.tempArr}`)
      })
      this.monthSwiper.on('slideNextTransitionEnd', () => {
        this.currentMonth++
        if (this.monthSwiper.activeIndex === 2) this.tempArr[2] = this.currentMonth + 1
        if (this.monthSwiper.activeIndex === 3) this.tempArr[0] = this.currentMonth + 1
        if (this.monthSwiper.activeIndex === 4) this.tempArr[1] = this.currentMonth + 1
        console.log(`====${this.monthSwiper.activeIndex}:${this.tempArr}`)
        // if (this.currentMonth === 12) {
        //   this.currentMonth = 1
        //   this.currentYear++
        // } else {
        //   this.currentMonth++
        // }
        // if (this.currentMonth === 11) this.nextMonthArr = this.getDateModule(this.currentYear + 1, 1)
        // this.nextMonthArr = this.getDateModule(this.currentYear, this.currentMonth + 1)
        // this.curMonthArr = this.nextMonthArr
        // this.preMonthArr = this.curMonthArr
        // this.months = [this.preMonthArr, this.curMonthArr, this.nextMonthArr]
        // console.log(this.currentMonth)
      })
    },
    // 初始化滑动
    initYearSwiper () {
      let yearSwiper = new Swiper('#swiper2', this.swiperYearOption)
      yearSwiper.on('slidePrevTransitionEnd', function () {
        this.currentYear--
        this.curYearArr = this.preYearArr
        this.nextYearArr = this.curYearArr
        this.preYearArr = this.getYearModule(this.currentYear - 1)
        console.log('===============cur', this.currentYear)
      })
      yearSwiper.on('slideNextTransitionEnd', function () {
        this.currentYear++
        this.curYearArr = this.nextYearArr
        this.preYearArr = this.curYearArr
        this.nextYearArr = this.getYearModule(this.currentYear + 1)
        console.log('===============cur', this.currentYear)
      })
    },
    getDateModule (year, month) {
      let dateModule = new Date(year, month, 0) // 设置日期为下个月第零天
      let days = dateModule.getDate() // 通过getDate()获取当前月份第零天在上个月的月末以此得到上个月的总天数
      let whichDay = new Date(year, month - 1, 1).getDay() // getDay 获取第一天在星期几

      let curMonthDays = []
      // 月份前面补空数据
      if (whichDay === 0) whichDay = 7
      for (let i = 1; i < whichDay; i++) {
        curMonthDays.push('')
      }
      // 循环当前月总天数并推入
      for (let i = 1; i <= days; i++) {
        curMonthDays.push(i)
      }
      // console.log('============year========', year, month)
      // console.log('================whichDay=========', whichDay)
      // console.log('===============this.curMonthDays=====', curMonthDays)
      return curMonthDays
    },
    getYearModule (year) {
      let tempArr = []
      for (let i = 1; i <= 12; i++) {
        let obj = {}
        obj.title = i
        obj.data = this.getDateModule(year, i)
        tempArr.push(obj)
      }
      return tempArr
    },
    handlePreSlide (index) {
      if (index === 0) {

      }
      if (this.currentMonth === 1) {
        this.currentMonth = 12
        this.currentYear--
        this.getDateModule(this.currentYear, this.currentMonth)
      } else {
        this.currentMonth--
      }
      if (this.currentMonth === 2) this.preMonthArr = this.getDateModule(this.currentYear - 1, 12)

      this.curMonthArr = this.preMonthArr
      this.nextMonthArr = this.curMonthArr
      this.preMonthArr = this.getDateModule(this.currentYear, this.currentMonth - 1)
      this.months = [this.preMonthArr, this.curMonthArr, this.nextMonthArr]
      // console.log(this.currentMonth)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins'
.mycalendar
  width 100%
  &.bg-color
    background-color #f5f6fa
  .headerTitle
    margin 45px 20px 20px 20px
    height 60px
    bottom-border-1px(#e4e4e4)
    display flex
    justify-content space-between
    align-items center
    .title
      width 70%
      font-size 20px
      font-weight 500
    .menu
      width 30%
      font-size 12px
      border-radius 30px
      background-color #e4e4e4
      filter opacity(80%)
      display flex
      align-items center
      justify-content space-around
      li
        padding 5px 0
        &.on
          color red
  .calendar-month
    margin 0 20px
    .date
      display flex
      // justify-content center
      align-items center
      flex-wrap wrap
      margin 20px 0
      .day
        width 14.28%
        display flex
        align-items center
        justify-content center
    #swiper1
      width 100%
      .swiper-wrapper
        width 100%
        .swiper-slide
          display flex
          // justify-content center
          align-items center
          flex-wrap wrap
          .day
            width 14.28%
            height 45px
            display flex
            align-items center
            justify-content center
            &.on
              background-color rgba(0, 0, 0, 0.3)
            &.current-day
              color red
  .calendar-year
    margin -10px 10px
    #swiper2
      width 100%
      .swiper-wrapper
        width 100%
        .swiper-slide
          display flex
          // justify-content center
          align-items center
          flex-wrap wrap
          .month
            width 30.5%
            height calc((100vh - 240px)/4)
            margin 10px 0 10px 10px
            display flex
            align-items center
            flex-wrap wrap
            background-color #f5f6fa
            border-radius 10px
            font-size 2px
            &.on
              background-color #74b9ff
            .title
              position relative
              font-size 20px
              left 15px
              top -10px
              z-index 50
            .weeks
              width 100%
              display flex
              // justify-content center
              align-items center
              flex-wrap wrap
              .week
                width 14.28%
                display flex
                align-items center
                justify-content center
            .day
              font-size 10px
              width 14.28%
              display flex
              align-items center
              justify-content center
              &.on
                background-color rgba(0, 0, 0, 0.3)
              &.current-day
                color red

</style>
