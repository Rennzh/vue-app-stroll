<template lang="html">
  <div class="fullpage main-theme-background select-city-main-content content-hasheader normal-fontsize border-box overscroll">
    <head-bar title="选择城市" :custombg="headbarbg">
      <backward slot="backward-icon" v-on:backward="backward"></backward>
    </head-bar>

    <search-bar v-on:searchCity="searchCity" callbackEvent="searchCity"></search-bar>

    <div class="city-list block-title-left">
      <p class="">当前位置</p>
      <ul class="city-current">
        <li>{{currentcity}}</li>
      </ul>

      <p class="">省市列表</p>
      <ul class="city-all">
        <li v-for="city in cityList" :ket="city" @click="confirmCity(city)">{{city}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import router from 'src/router';

import Header from 'components/common/header/Header';
import SearchBar from 'components/common/search-bar/SearchBar';
import Backward from 'components/common/icon-backward/IconBackward';

export default {
  data() {
    return {
      headbarbg: 'selectcity-headbar-bg',
      currentcity: '',
      cityList: [
        '上海',
        '上海郊区',
        '江苏',
        '浙江',
        '安徽',
        '北京',
        '天津',
        '河南',
        '上海',
        '上海郊区',
        '江苏',
        '浙江',
        '安徽',
        '北京',
        '天津',
        '河南'
      ],
      cityListBackup: []
    }
  },
  methods: {
    backward() {
      router.go(-1);
    },
    searchCity(s) {
      if (s) {
        this.cityListBackup = this.cityList.slice(0, this.cityList.length);
        this.cityList = this.cityList.filter(function (value, index, arr) {
          return value.match(s) !== null ? value : false;
        });
      } else {
        this.cityList = this.cityListBackup.slice(0, this.cityListBackup.length);
      }
    },
    confirmCity(city) {
      window.localStorage.setItem('city', city);
      router.go(-1)
    }
  },
  created() {
    this.currentcity = window.localStorage.getItem('city');
    this.$http.get('../../../static/js/city_code.json')
      .then(function (res) {
        console.log('res:', res);
      }, function (err) {
        console.log('err:', err);
      });
  },
  components: {
    headBar: Header,
    searchBar: SearchBar,
    backward: Backward
  }
}
</script>

<style lang="scss">@import "./scss/locate.scss";</style>
