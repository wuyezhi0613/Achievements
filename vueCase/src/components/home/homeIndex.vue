<template>
    <div class="homeIndex-body" ref="homeTemplate" :style="{width: fullWidth + 'px', top: '-' + distanceTop + 'px', left: '-' + distanceLeft + 'px'}">
    	<!-- 描述：首页头部 -->
		<div class="homeIndex-head">
			<div class="search-box-cover"></div>
			<div class="navs">
				<div class="logo">
					<div class="imgs">
						<img src="../../../static/home/img/logo.png" />
					</div>
			        <ul>
			        	<li id="login" @click="toLogin">登录</li>
			        	<li id="register" @click="toRegister">注册</li>
			        </ul>
			   </div>
			    <div class="nav">
			        <ul class="orderedlist">
			        	<!-- 描述：锚点链接在本页面跳转 -->
			            <li class="nav-cloud"><a href="#cloud">与非云</a></li>
				        <li class="nav-hardware"><a href="#hardware">硬件产品</a></li>
				        <li class="nav-solution"><a href="#solution">解决方案</a></li>
				        <li class="nav-team"><a href="#team">团队介绍</a></li>
	<!--				        <li class="nav-sever"><a href="#sever">服务</a></li>	-->
			        </ul>
			        <div class="search">
	                	<input class="soso" type="text" placeholder="您遇到什么问题了吗？" v-model="question" onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" />
	                	<span class="showsearch"  @click="showHomeQuestion"><img src="../../../static/home/img/search.png" /></span>
		            </div>
			    </div>
			</div>
	    </div>
    	<!--<home-question v-show="showHomeQuestionList"></home-question>-->
        <!---描述：首页轮播图 -->
        <div class="banner">
			<div class="swiper-container">
		        <div class="swiper-wrapper">
					<div class="swiper-slide">
						<img src="../../../static/home/img/banner-2.png" />
					</div>
					<div class="swiper-slide" >
						<img src="../../../static/home/img/banner-2.png" />
					</div>
					<div class="swiper-slide">
						<img src="../../../static/home/img/banner-2.png" />
					</div>
					<div class="swiper-slide">
						<img src="../../../static/home/img/banner-2.png" />
					</div>
					<div class="swiper-slide">
						<img src="../../../static/home/img/banner-2.png" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
		    </div>
        </div>
        <!-- 描述：主体部分 -->
        <homeIndex-content></homeIndex-content>
        <div v-show="distanceScrollTop !== 0" class="homeIndexScrollTop" @click="homeScrollTopFn">
		   Top
        </div>
    </div>
</template>

<script type='text/ecmascript-6'>
import Swiper from '../../assets/js/libs/swiper-3.4.1.min';
import $ from 'jquery'
import homeIndexContent from './homeIndexContent.vue'
import homeQuestion from './homeQuestion.vue'
export default {
  components: {
    homeIndexContent,
    homeQuestion
  },
  data () {
    return {
      fullWidth: document.documentElement.clientWidth,
      distanceLeft: 0,
      question: '',
      distanceScrollTop: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.isShowScrollTopFn)
    window.addEventListener('resize', this.handleResize)
    this.distanceChangeFn(this.$el)
    console.log(document.documentElement.clientHeight)
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      centeredSlides: true,
      autoplay: 3000,
      loop: true,
      delay: 2000,
      speed: 1000,
      autoplayDisableOnInteraction: false
    })
    $(function () {
      var $body = $('.homeIndex-body'), flag = true
      var theUA = window.navigator.userAgent.toLowerCase()
      if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])){
        var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0]
        if (ieVersion < 9) {
          flag = false
          alert('这是IE： ' + ieVersion)
        }
      }
      function getScrollTop () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0
        if (document.body) {
          bodyScrollTop = document.body.scrollTop
        }
        if(document.documentElement) {
          documentScrollTop = document.documentElement.scrollTop
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
        return scrollTop
      }
      var setCoverOpacity = function() {
        flag ? $body.find('.search-box-cover')[0].style.opacity = (((getScrollTop() / 400) > 1) ? 1 : (getScrollTop() / 400)) : $body.find('.search-box-cover')[0].style.filter = 'Alpha(opacity='+ (((getScrollTop() / 400) > 1) ? 1 : (getScrollTop() / 400)) * 100 + ')'
      }
      setCoverOpacity()
      $(window).scroll(function () {
        setCoverOpacity()
        if($(document).scrollTop() >= 400) {
          $('.logo img').attr('src', '../../../static/home/img/logo_2.png')
          $('.logo li').css('color', '#333')
          $('.nav a').css('color', '#333')
          $('.search').css('border', 'none')
          $('.soso').css({backgroundColor: '#f2f2f2', color: '#999'})
          $('.search span').css('backgroundColor', '#f2f2f2')
          $('.showsearch img').attr('src', '../../../static/home/img/search_2.png')
          $('.orderedlist li').mouseenter(function () {
            $(this).css('backgroundColor', '#F7F7F7')
          })
          $('.orderedlist li').mouseleave(function () {
            $(this).css('backgroundColor', 'rgba(0,0,0,0)')
          })
          $('.logo li').hover(function () {
            $(this).css('backgroundColor', '#F7F7F7')
          })
          $('.logo li').mouseleave(function () {
            $(this).css('backgroundColor', 'rgba(0,0,0,0)')
          })
          $('.headTmp').fadeIn()
        } else if ($(document).scrollTop() < 400) {
          $('.logo img').attr('src', '../../../static/home/img/logo.png')
          $('.logo li').css('color', '#f6ead5')
          $('.nav a').css('color', '#f6ead5')
          $('.search').css('backgroundColor', 'rgba(0,0,0,0.3)')
          $('.soso').css({backgroundColor: 'rgba(0,0,0,0.3)', color: 'rgba(255,255,255,0.75)'})
          $('.search span').css('backgroundColor', 'rgba(0,0,0,0.3)')
          $('.showsearch img').attr('src', '../../../static/home/img/search.png')
          $('.orderedlist li').mouseenter(function () {
            $(this).css('backgroundColor', 'rgba(246, 234, 213, 0.1)')
          })
          $('.orderedlist li').mouseleave(function () {
            $(this).css('backgroundColor', 'rgba(0,0,0,0)')
          })
          $('.logo li').mouseenter(function () {
            $(this).css('backgroundColor', 'rgba(246, 234, 213, 0.1)')
          })
          $('.logo li').mouseleave(function () {
            $(this).css('backgroundColor', 'rgba(0,0,0,0)')
          })
          $('.headTmp').fadeOut()
        }
      })
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    distanceTop () {
      return this.$store.state.device.distanceTop
    }
  },
  methods: {
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth
      this.distanceChangeFn(this.$refs.homeTemplate)
    },
    distanceChangeFn (homeTemplate) {
      this.distanceLeft = homeTemplate.parentNode.getBoundingClientRect().left
    },
    toLogin () {
      this.$router.push({'path': '/switchAccount/overview'})
      this.$store.state.account.isShowLogin = true
      this.$store.state.account.isShowRegister = false
    },
    toRegister () {
      this.$router.push({'path': '/switchAccount/overview'})
      this.$store.state.account.isShowLogin = false
      this.$store.state.account.isShowRegister = true
    },
    showHomeQuestion () {
      this.$router.push({'path': '/home/homeQuestion'})
    },
    homeScrollTopFn () {
    // 火狐和ie触发html的动画
    // chrome触发body的动画
      $('html').animate({scrollTop: 0}, 500)
      $('body').animate({scrollTop: 0}, 500)
    },
    isShowScrollTopFn () {
      this.distanceScrollTop = $(document).scrollTop()
    }
  }
}
</script>
<style scoped>
  @import "../../assets/css/libs/swiper-3.4.1.min.css";
  @import "../../assets/css/home/homeIndex.css";
</style>;
