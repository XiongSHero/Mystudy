<template>
  <div class="container">
    <div class="left">
      <ul>
        <transition name="slide" @leave="leave">
          <li class="animate" v-show="show2">
            <p>我是左边上</p>
            <p>我是左边的内容我是左边的内容我是左边的内容我是左边的内容我是左边的内容</p>
          </li>
        </transition>
        <transition name="slide1">
          <li class="animate" v-show="show2">
            <p>我是左边下</p>
            <p>我是左边的内容我是左边的内容我是左边的内容我是左边的内容我是左边的内容</p>
          </li>
        </transition>
      </ul>
    </div>
    <div class="center"></div>
    <div class="right">
      <ul>
        <transition name="slide2">
          <li class="animate" v-show="show2">
            <p>我是右边上</p>
            <p>我是右边的内容我是左边的内容我是左边的内容我是左边的内容我是左边的内容</p>
          </li>
        </transition>
        <transition name="slide3">
          <li class="animate" v-show="show2">
            <p>我是右边下</p>
            <p>我是右边的内容我是左边的内容我是左边的内容我是左边的内容我是左边的内容</p>
          </li>
        </transition>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MxvueAliplay',
  data () {
    return {
      show: false
    }
  },
  computed: {
    show2 () {
      return this.show > 0
    }
  },
  mounted () {
    const main = document.querySelector('.el-main')
    main.addEventListener('scroll', this.show1)
  },
  methods: {
    show1 () {
      const _this = this
      this.$nextTick(function () {
        const main = document.querySelector('.el-main')
        _this.show = main.scrollTop
        console.log(_this.show2)
      })
    },
    leave () {

    }
  }
}
</script>

<style scoped lang="stylus">
.container
  width: 980px
  height: 1500px
  &:after
    content: ''
    display: block
    clear: both
  .left, .right
    float: left
    width: 200px
    height: 500px
    .slide-enter-active
      transition: all .9s ease
    .slide-enter
      opacity: 0
      transform: translate3d(165px, 200px, 0)
    .slide1-enter-active
      transition: all .9s ease
    .slide1-enter
      opacity: 0
      transform: translate3d(165px, -200px, 0)
    .slide2-enter-active
      transition: all .9s ease
    .slide2-enter
      opacity: 0
      transform: translate3d(-165px, 200px, 0)
    .slide3-enter-active
      transition: all .9s ease
    .slide3-enter
      opacity: 0
      transform: translate3d(-165px, -200px, 0)
    .animate
      width: 100%;
      margin-bottom: 350px
  .center
    float: left
    margin: 250px 30px 0
    width: 100px
    height: 100px
    background: #ccc
</style>
