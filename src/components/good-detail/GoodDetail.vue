<template lang="html">
  <div class="fullpage main-theme-background good-main-content normal-fontsize hasfootbar border-box ">
    <div class="fullpage overscroll" id="goodScrollWrapper" @scroll="scrolling">
      <head-bar :custombg="headbarbg">
        <backward slot="backward-icon" v-on:backward="backward"></backward>
        <i slot="share-icon" class="icon iconfont icon-share-white-copy fixed icon-in-header share-good" @click.stop="shareContent"></i>
        <i slot="star-icon" class="icon iconfont icon-star-white-copy fixed icon-in-header star-good" :class="goodDetail.starStatus === '1' ? active : ''" @click.stop="star"></i>
      </head-bar>

      <div class="good-presentation">
        <img class="" :src="goodDetail.imgsrc" alt="">
      </div>
      <div class="good-detail border-box">
        <div class="price border-box">
          <p>{{goodDetail.name}}</p>
          <div>
            <span class="price-discount">￥ {{goodDetail.pricediscount}}</span>
            <span class="price-normal">原价：<span>￥ {{goodDetail.pricenormal}}</span></span>
            <span class="sale-quantity float-right">销量：{{goodDetail.salequantity}}</span>
          </div>
        </div>
        <div class="limit border-box">
          <p>限时：2天23分02秒</p>
          <p>限量：{{goodDetail.discountquantity}}件</p>
        </div>
      </div>

      <div class="good-tab flex-box">
        <a class="tab-link button border-box" :class="showTab === 'details' ? active : ''" id="good-tab-detail" @click="changeTab">商品详情</a>
        <a class="tab-link button border-box" :class="showTab === 'comments' ? active : ''" @click="changeTab">用户评价</a>
      </div>

      <div class="tabs">
        <div class="tab" v-show="showTab === 'details'">
          <div class="content-block">
            <div class="details-item" v-for="item in goodDetail.gooddetaillist">
              <img :src="item.imgsrc" alt="">
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
        <div class="tab infinite-scroll" v-show="showTab === 'comments'">
          <div class="list-block">
            <ul class="list-container">
              <li class="normal-fontsize comment-container" v-for="commentItem in goodDetail.commentList">
                <div class="comment-about flex-box">
                  <img :src="commentItem.avatar" alt="" class="avatar">
                  <span class="name">{{commentItem.name}}</span>
                  <span class="member-level">{{commentItem.memberLevel}}</span>
                  <span class="timestamp">{{commentItem.timestamp}}</span>
                </div>
                <div class="comment-score">
                  <i class="icon iconfont icon-comment-star active" v-for="s in commentItem.score"></i>
                  <!-- {{commentItem.score}} -->
                </div>
                <div class="comment-content">
                  {{commentItem.content}}
                </div>
              </li>
            </ul>
          </div>
          <!-- 加载提示符 -->
          <icon-loader></icon-loader>
        </div>
      </div>

      <div class="good-footbar fixed flex-box">
        <div class="good-shoppingcar border-box">
          <i class="icon iconfont icon-shoppingcar"></i>
          <div class="shopping-point redpoint">{{orderDetail.amount}}</div>
        </div>
        <div class="good-purchase-add flex-box">
          <i class="icon iconfont icon-addtosc" @click="addToSC"></i>
          <i class="icon iconfont icon-purchase-imedi" @click="buy"></i>
        </div>
      </div>

      <transition name="fade">
        <mask-bg callback="closeSelectSpec" v-if="selectSpecStatus" v-on:closeSelectSpec="closeSelectSpec">
          <select-specification v-on:closeSelectSpec="closeSelectSpec" v-on:closeAndConfirmSelectSpec="closeAndConfirmSelectSpec"></select-specification>
        </mask-bg>

      </transition>

      <transition name="fade">
        <mask-bg callback="closeShare" v-if="shareContentStatus" v-on:closeShare="closeShare">
          <share v-on:closeShare="closeShare"></share>
        </mask-bg>
      </transition>

      <transition name="fade">
        <mask-bg callback="closeRecharge" v-if="rechargeContentStatus" v-on:closeRecharge="closeRecharge">
          <recharge v-on:closeRecharge="closeRecharge"></recharge>
        </mask-bg>
      </transition>

    </div>
    <transition name="slide-fade">
      <router-view style="position: fixed;top: 0;left: 0;width: 100%;z-index: 150"></router-view>
    </transition>
  </div>
</template>

<script>
import router from 'src/router';

import Header from 'components/common/header/Header';
import Mask from 'components/common/mask/Mask';
import SelectSpecification from 'components/common/select-specification/SelectSpecification';
import Share from 'components/common/share/share';
import Recharge from 'components/common/recharge/Recharge';
import IconLoader from 'components/common/icon-loader/IconLoader';
import Backward from 'components/common/icon-backward/IconBackward';

import routeNameHook from 'src/Hook/routeNameHook';

export default {
  data() {
    return {
      contentScrollTop: 0,
      headbarbg: 'gooddetail-headbar-bg',
      uservip: '',
      viponly: '',
      orderDetail: {
        id: '',
        imgsrc: '',
        title: '',
        spec: '',
        price: '',
        amount: 0
      },
      goodDetail: {
        imgsrc: require('./images/goods1.jpg'),
        id: 9061,
        name: 'Huawei/华为 荣耀7 全网通4G手机',
        pricediscount: 1999,
        pricenormal: 1799,
        salequantity: 1235,
        discountstarttime: '',
        discountendtime: '',
        discountquantity: '120',
        gooddetaillist: [
          {
            imgsrc: require('./images/good-detail-large.jpg'),
            description: '5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界'
          },
          {
            imgsrc: require('./images/good-detail-large.jpg'),
            description: '5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界，5英寸大屏幕，看见青春大世界'
          }
        ],
        starStatus: '0',
        commentList: [
          {
            avatar: require('./images/avatar.png'),
            name: '吴大耀',
            memberLevel: 'VIP会员',
            timestamp: '2015-10-15',
            score: 5,
            content: '大品牌值得信赖，大品牌值得信赖，大品牌值得信赖，重要的事说3遍，先买十台，楼下付钱'
          },
          {
            avatar: require('./images/avatar.png'),
            name: '赖大祥',
            memberLevel: 'VIP会员',
            timestamp: '2015-10-15',
            score: 4,
            content: '还可以啦，用久了还是卡'
          },
          {
            avatar: require('./images/avatar.png'),
            name: '张小华',
            memberLevel: '超级VIP会员',
            timestamp: '2015-10-15',
            score: 5,
            content: '卧槽，降价了！！！卧槽，降价了！！！卧槽，降价了！！！卧槽，降价了！！！卧槽，降价了！！！卧槽，降价了！！！'
          },
          {
            avatar: require('./images/avatar.png'),
            name: '吴大耀',
            memberLevel: 'VIP会员',
            timestamp: '2015-10-15',
            score: 5,
            content: '大品牌值得信赖，大品牌值得信赖，大品牌值得信赖，重要的事说3遍，先买十台，楼下付钱'
          },
          {
            avatar: require('./images/avatar.png'),
            name: '赖大祥',
            memberLevel: 'VIP会员',
            timestamp: '2015-10-15',
            score: 4,
            content: '还可以啦，用久了还是卡'
          }
        ]
      },
      showTab: 'details',
      active: 'active',
      selectSpecStatus: false,
      shareContentStatus: false,
      rechargeContentStatus: false,
      preloadY: 0,
      goodMainContent: '',
      preloader: '',
      loadingMore: false,
      nextRouteNameList: [],
      buyImedi: false,
      setImedi: false
    }
  },
  methods: {
    backward() {
      router.go(-1);
    },
    changeTab(e) {
      console.log('innerHTML:', e.target.innerHTML);
      this.showTab = e.target.innerHTML === '商品详情' ? 'details' : 'comments';
    },
    star() {
      this.goodDetail.starStatus = '1';
    },
    shareContent() {
      this.shareContentStatus = true;
    },
    addToSC() {
      if (!this.goodDetail.uservip && this.goodDetail.viponly) {
        this.rechargeContentStatus = true;
      } else {
        this.selectSpecStatus = !this.selectSpecStatus;
      }
    },
    buy() {
      this.uservip = !(window.localStorage.getItem('grade') === '普通会员');
      if (!this.uservip && this.viponly) {
        this.rechargeContentStatus = true;
      } else if (this.orderDetail.amount > 0) {
        this.orderDetail.id = this.goodDetail.id;
        this.orderDetail.title = this.goodDetail.name;
        this.orderDetail.imgsrc = this.goodDetail.imgsrc;
        let orderArr = [];
        orderArr.push(this.orderDetail);
        router.push({
          name: this.nextRouteNameList[0] ? this.nextRouteNameList[0] : '',
          params: {
            goodsOrder: orderArr
          }
        })
      } else {
        this.setImedi = true;
        this.selectSpecStatus = 'true';
      }
    },
    closeAndConfirmSelectSpec(spec) {
      this.orderDetail.amount = spec.amount;
      this.orderDetail.spec = spec.spec;
      this.orderDetail.price = spec.price;
      this.selectSpecStatus = false;
      this.buyImedi = spec.buyImedi;
      console.log('orderdetail:', this.orderDetail);
      if (this.buyImedi && this.setImedi) {
        this.buy();
      }
      this.setImedi = false;
    },
    closeSelectSpec() {
      console.log('closeSelectSpec in detail');
      this.selectSpecStatus = false;
    },
    closeShare() {
      this.shareContentStatus = false;
    },
    closeRecharge() {
      this.rechargeContentStatus = false;
    },
    scrolling() {
      let documentHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let actualTop = this.preloader.offsetTop;
      let current = this.preloader.offsetParent;
      while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      let elementScrollTop = this.goodMainContent.scrollTop;
      if ((actualTop - elementScrollTop < documentHeight - documentHeight / 667 * (this.preloader.clientHeight * 2)) && !this.loadingMore) {
        this.loadingMore = true;
        // 这里调用加载数据的方法
        // 模拟加载数据
        this.goodDetail.commentList = this.goodDetail.commentList.concat(this.goodDetail.commentList);
        // 模拟结束数据加载后的动作，需要将标识设为false
        setTimeout(function () {
          this.loadingMore = false;
        }.bind(this), 1500);
      }
    }
  },
  created() {
    console.log('created detail');
    if (this.$route.params.viponly !== undefined) {
      this.viponly = this.$route.params.viponly;
    }
    if (this.$route.params.buyRouteName !== undefined) {
      this.buyRouteName = this.$route.params.buyRouteName
    }
    routeNameHook.setRouteNameByMeta.apply(this);
    this.uservip = !(window.localStorage.getItem('grade') === '普通会员');
  },
  mounted() {
    console.log('mounted detail');
    let goodMainContent = document.querySelector('#goodScrollWrapper');
    let preloader = document.querySelector('.infinite-scroll-preloader');
    this.goodMainContent = goodMainContent;
    this.preloader = preloader;
  },
  beforeDestroy() {
    console.log('beforeDestroy detail');
  },
  components: {
    headBar: Header,
    maskBg: Mask,
    selectSpecification: SelectSpecification,
    share: Share,
    recharge: Recharge,
    iconLoader: IconLoader,
    backward: Backward
  }
}
</script>

<style lang="scss" scoped>@import "./scss/good-detail.scss";</style>
