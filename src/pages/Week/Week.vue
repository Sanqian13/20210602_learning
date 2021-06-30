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
      <div class="calendar_content" id="calendar_content" v-if="months.length && !showYear" @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd">
        <div class="calendar_content_wrapper prev_duplicate" id="calendar_content_wrapper_next">
          <div class="month-wrap">
            <div class="day-wrap" v-for="(day, index) in months[2]" :key="index"
              @click="selectDay(index)"
              :class="{
                'on': index === selected,
                'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
              {{day}}
            </div>
          </div>
        </div>
        <div class="calendar_content_wrapper prev" id="calendar_content_wrapper_prev">
          <div class="month-wrap">
            <div class="day-wrap" v-for="(day, index) in months[0]" :key="index"
              @click="selectDay(index)"
              :class="{
                'on': index === selected,
                'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
              {{day}}
            </div>
          </div>
        </div>
        <div class="calendar_content_wrapper middle" id="calendar_content_wrapper">
          <div class="month-wrap">
            <div class="day-wrap" v-for="(day, index) in months[1]" :key="index"
              @click="selectDay(index)"
              :class="{
                'on': index === selected,
                'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
              {{day}}
            </div>
          </div>
        </div>
        <div class="calendar_content_wrapper next" id="calendar_content_wrapper_next">
          <div class="month-wrap">
            <div class="day-wrap" v-for="(day, index) in months[2]" :key="index"
              @click="selectDay(index)"
              :class="{
                'on': index === selected,
                'current-day': (currentDate.year === currentYear && currentDate.month === currentMonth && index === currentDate.index && index !== selected)}">
              {{day}}
            </div>
          </div>
        </div>
        <div class="calendar_content_wrapper next_duplicate" id="calendar_content_wrapper_prev">
          <div class="month-wrap">
            <div class="day-wrap" v-for="(day, index) in months[0]" :key="index"
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
      <div class="calendar_year_content" id="calendar_year_content" v-if="years.length && showYear" @touchstart="handleStart" @touchmove="handleYearMove" @touchend="handleYearEnd">
          <div class="calendar_year_wrapper prev_duplicate">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in years[2]" :key="index">
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
          <div class="calendar_year_wrapper prev">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in years[0]" :key="index">
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
          <div class="calendar_year_wrapper middle">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in years[1]" :key="index">
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
          <div class="calendar_year_wrapper next">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in years[2]" :key="index">
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
          <div class="calendar_year_wrapper next_duplicate">
            <div class="month"
              :class="{'on': index === selectMonth && currentDate.year === currentYear}"
              v-for="(month, index) in years[0]" :key="index">
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
    <FooterGuide/>
  </section>

</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import FooterGuide from '../../components/FooterGuide/FooterGuide.vue'
import { mapState } from 'vuex'
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
      startClientX: 0, // 移动横坐标
      transformX: 0, // 初始transform开始位置坐标
      screenWidth: 0,
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
    this.initCalendarYear()
  },
  mounted () {
    // this.initSwiper() // mounted 初始化滑动
    // this.initYearSwiper()
    this.screenWidth = window.screen.width
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

      this.months = [this.preMonthArr, this.curMonthArr, this.nextMonthArr]
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
    handlePreSlide (currentMonth, transformX) {
      const screenWidth = this.screenWidth
      if (currentMonth === 1) {
        this.currentMonth = 12
        this.currentYear--
      } else {
        this.currentMonth--
      }
      this.preMonthArr = this.currentMonth === 1 ? this.getDateModule(this.currentYear - 1, 12) : this.getDateModule(this.currentYear, this.currentMonth - 1)
      if (transformX === screenWidth) {
        this.months[2] = this.preMonthArr
      }
      if (transformX === (-screenWidth)) {
        this.months[1] = this.preMonthArr
      }
      if (transformX === 0) {
        this.months[0] = this.preMonthArr
      }
      // console.log(this.currentMonth)
    },
    handleNextSlide (currentMonth, transformX) {
      const screenWidth = this.screenWidth
      if (currentMonth === 12) {
        this.currentMonth = 1
        this.currentYear++
      } else {
        this.currentMonth++
      }
      this.nextMonthArr = this.currentMonth === 12 ? this.getDateModule(this.currentYear + 1, 1) : this.getDateModule(this.currentYear, this.currentMonth + 1)
      if (transformX === screenWidth) {
        this.months[1] = this.nextMonthArr
      }
      if (transformX === (-screenWidth)) {
        this.months[0] = this.nextMonthArr
      }
      if (transformX === 0) {
        this.months[2] = this.nextMonthArr
      }
      // console.log(this.currentMonth)
    },
    // 滑动开始
    handleStart (e) {
      this.startClientX = e.changedTouches[0].clientX
    },
    handleMove (e) {
      e.preventDefault()
      let dom = document.getElementById('calendar_content')
      dom.style['transition-duration'] = '0ms'
      dom.style.transform = `translate3d(${(this.transformX + e.changedTouches[0].clientX - this.startClientX)}px, 0px, 0px)`
    },
    // 滑动结束
    handleEnd (e) {
      const screenWidth = this.screenWidth
      let diffX = e.changedTouches[0].clientX - this.startClientX
      console.log('============diffX ====', diffX)
      let dom = document.getElementById('calendar_content')
      if (Math.abs(diffX) > (screenWidth / 3)) {
        console.log('============================切换================')
        let animation = dom.animate([
          {transform: `translate3d(${diffX}px, 0px, 0px)`},
          {transform: `translate3d(${diffX < 0 ? -414 : 414}px, 0px, 0px)`}
        ], {
          duration: 300,
          ddelay: 0
        })
        animation.play()
        if (diffX > 0) {
          this.transformX = this.transformX === screenWidth ? -screenWidth : this.transformX + screenWidth
          this.handlePreSlide(this.currentMonth, this.transformX)
        } else {
          this.transformX = this.transformX === -screenWidth ? screenWidth : this.transformX - screenWidth
          this.handleNextSlide(this.currentMonth, this.transformX)
        }
        setTimeout(() => {
          if (diffX > 0) {
            dom.style.transform = `translate3d(${this.transformX}px, 0px, 0px)`
            console.log('=======slide prev success this.transformX=====', this.transformX)
          } else {
            dom.style.transform = `translate3d(${this.transformX}px, 0px, 0px)`
            console.log('=======slide next success this.transformX=====', this.transformX)
          }
        }, 300)
      } else if (diffX !== 0) {
        this.goBack(dom, diffX, this.transformX)
      }
    },
    handlePreYearSlide (transformX) {
      const screenWidth = this.screenWidth
      this.currentYear--
      this.preYearArr = this.getYearModule(this.currentYear - 1)
      if (transformX === screenWidth) {
        this.years[2] = this.preYearArr
      }
      if (transformX === (-screenWidth)) {
        this.years[1] = this.preYearArr
      }
      if (transformX === 0) {
        this.years[0] = this.preYearArr
      }
      // console.log(this.currentMonth)
    },
    handleNextYearSlide (transformX) {
      const screenWidth = this.screenWidth
      this.currentYear++
      this.nextYearArr = this.getYearModule(this.currentYear + 1)
      if (transformX === screenWidth) {
        this.years[1] = this.nextYearArr
      }
      if (transformX === (-screenWidth)) {
        this.years[0] = this.nextYearArr
      }
      if (transformX === 0) {
        this.years[2] = this.nextYearArr
      }
      // console.log(this.currentMonth)
    },
    // 年示例图滑动中
    handleYearMove (e) {
      e.preventDefault()
      let dom = document.getElementById('calendar_year_content')
      dom.style['transition-duration'] = '0ms'
      dom.style.transform = `translate3d(${(this.transformX + e.changedTouches[0].clientX - this.startClientX)}px, 0px, 0px)`
    },
    // 年示例滑动结束
    handleYearEnd (e) {
      const screenWidth = this.screenWidth
      let diffX = e.changedTouches[0].clientX - this.startClientX
      console.log('============diffX ====', diffX)
      let dom = document.getElementById('calendar_year_content')
      if (Math.abs(diffX) > (screenWidth / 3)) {
        console.log('============================切换================')
        let animation = dom.animate([
          {transform: `translate3d(${diffX}px, 0px, 0px)`},
          {transform: `translate3d(${diffX < 0 ? -(this.screenWidth) : screenWidth}px, 0px, 0px)`}
        ], {
          duration: 300,
          ddelay: 0
        })
        animation.play()
        if (diffX > 0) {
          this.transformX = this.transformX === screenWidth ? -screenWidth : this.transformX + screenWidth
          this.handlePreYearSlide(this.transformX)
        } else {
          this.transformX = this.transformX === -screenWidth ? screenWidth : this.transformX - screenWidth
          this.handleNextYearSlide(this.transformX)
        }
        setTimeout(() => {
          if (diffX > 0) {
            dom.style.transform = `translate3d(${this.transformX}px, 0px, 0px)`
            console.log('=======slide prev success this.transformX=====', this.transformX)
          } else {
            dom.style.transform = `translate3d(${this.transformX}px, 0px, 0px)`
            console.log('=======slide next success this.transformX=====', this.transformX)
          }
        }, 300)
      } else if (diffX !== 0) {
        this.goBack(dom, diffX, this.transformX)
      }
    },
    // 移动不到一半回弹到原处
    goBack (dom, diffX, startX) {
      let animation = dom.animate([
        {transform: `translate3d(${startX + diffX}px, 0px, 0px)`},
        {transform: `translate3d(${startX}px, 0px, 0px)`}
      ], {
        duration: 500,
        delay: 0
      })
      animation.play()
      setTimeout(() => {
        dom.style.transform = `translate3d(${startX}px, 0px, 0px)`
      }, 500)
      console.log('=========go back success======')
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
    .date
      margin 0 20px
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
    .calendar_content
      position relative
      width 500%
      left -200%
      right -200%
      display flex
      .calendar_content_wrapper
        height auto
        flex 1
        &.prev
          left 0
        &.middle
          left 200%
        &.next
          right 0
        .month-wrap
          display flex
          // justify-content center
          align-items center
          flex-wrap wrap
          .day-wrap
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
    .calendar_year_content
      position relative
      width 500%
      left -200%
      right -200%
      display flex
      .calendar_year_wrapper
        height auto
        flex 1
        display flex
        // justify-content center
        align-items center
        flex-wrap wrap
        justify-content center
        &.prev
          left 0
        &.middle
          left 200%
        &.next
          right 0
        .month
          width 30.2%
          height calc((100vh - 240px)/4)
          margin 4px
          padding 0 1px 4px 1px
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
            font-weight 350
            width 14.28%
            display flex
            align-items center
            justify-content center
            &.on
              background-color rgba(0, 0, 0, 0.3)
            &.current-day
              color red

</style>
