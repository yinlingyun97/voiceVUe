<template>
  <div class="main">
    <div class="searchTop">
      <Icon @click="returnPage" class="icon" name="cross" />
      <Search
          class="search"
          v-model="searchValue"
          :clearable="false"
          shape="round"
          placeholder="搜索">
      </Search>
      <div class="cityName" @click="cityPanelStateChange">
        <span>{{city}}</span>
        <img src="../assets/searchDown.svg" alt="" />
      </div>
    </div>
    <BMap
        ak="9EUcrMCyPgEfIlGGgcM4ojymS45nesOc"
        class="map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="bMapLoad"
    />
    <div class="addressList">
      <div
          class="addressItem"
          v-for="item in locationList"
          :key="item.uid"
          @click="bMapPoint(item.point,item)"
      >
        <div class="img">
          <img :src="selectLocation.uid===item.uid?mapPoint:mapUnPoint" alt="" />
        </div>
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="address">{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Icon } from 'vant'
import BMap from 'vue-baidu-map/components/map/Map'
import mapPoint from '../assets/mapPoint.png'
import mapUnPoint from '../assets/mapUnPoint.png'

let mapConstructor // 百度地图构造函数存放容器

export default {
  name: 'MapPosition',
  props: {
    position: {
      type: Object,
      default: () => ({
        lng: 116.404,
        lat: 39.915
      })
    }
  },
  data () {
    return {
      mapPoint,
      mapUnPoint,
      center: this.position,
      zoom: 15,
      locationList: [], // 定位点列表
      selectLocation: {}, // 选中的定位点
      map: null, // 地图容器
      cityPanel: false, // 定位选择面板
      city: '北京',
      searchValue: '' // 搜索框内容
    }
  },
  mounted () {
  },
  components: {
    BMap,
    Search,
    Icon
  },
  methods: {
    // BMap加载触发寻找周边方法
    bMapLoad ({BMap, map}) {
      // 百度地图容器全局化
      this.map = map
      // 百度地图构造函数全局化
      mapConstructor = BMap
      this.bMapPoint(this.center)
      this.locationData(this.center)
    },

    // 在百度地图上打点方法
    bMapPoint (position, item) {
      if (item && item.uid === this.selectLocation.uid) {
        return null
      }
      this.map.clearOverlays()
      const myIcon = new mapConstructor.Icon(mapPoint, new mapConstructor.Size(36, 45))
      const mPoint = new mapConstructor.Point(position.lng, position.lat)
      const marker = new mapConstructor.Marker(mPoint, {
        icon: myIcon
      })
      this.map.addOverlay(marker)
      if (item) {
        this.selectLocation = item
      }
    },

    // 在百度地图上找寻点附近的定位点
    locationData (position) {
      const mPoint = new mapConstructor.Point(position.lng, position.lat)
      const myGeo = new mapConstructor.Geocoder()
      const mOption = {
        poiRadius: 1000000, // 半径为r米内的POI,
        numPois: 12 // 最多只有12个 系统决定的
      }
      myGeo.getLocation(mPoint, (res) => {
        if (res && res.surroundingPois && Array.isArray(res.surroundingPois)) {
          let startInfo = {
            title: res.business,
            address: res.address,
            city: res.addressComponents.city,
            point: res.point,
            uid: 'startPoint'
          }
          this.selectLocation = startInfo
          this.locationList = res.surroundingPois
          this.locationList.unshift(startInfo)
        }
      }, mOption)
    },

    // 弹出地区选择框
    cityPanelStateChange () {
      this.cityPanel = !this.cityPanel
    },

    // 返回上一页面
    returnPage () {
      this.$router.go(-1)
    }
  },
  watch: {
  }
}
</script>

<style scoped lang="less">
  .main{
    .searchTop{
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon{
        margin-left: 15px;
        font-size: 35px;
      }
      .search{
        /deep/ .van-field__control{
          width: 60vw;
          height: 50px;
          font-size: 30px;
          font-family: PingFangSC-Regular, "PingFang SC",serif;
          font-weight: 400;
          color: rgb(187, 187, 187);
        }
        /deep/ .van-icon{
          font-size: 35px;
        }
        /deep/ .van-field__left-icon{
          display: flex;
          align-items: center;
        }
      }
      .cityName{
        font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC',serif;
        font-weight: 700;
        font-size: 30px;
        color: #000000;
        margin-right: 15px;
        display: flex;
        align-items: center;
        img{
          width: 11px;
          height: 22px;
          transform: rotateZ(90deg);
          margin-left: 20px;
        }
      }
    }
    .map{
      width: 100%;
      height: 45vh;
    }
    .addressList{
      width: 100%;
      height: 48vh;
      overflow: auto;
      .addressItem{
        width: 100%;
        margin-top: 20px;
        display: flex;
        .img{
          width: 10%;
          height: 100%;
          text-align: right;
          margin-right: 15px;
          img{
            width: 34px;
            height: 40px;
          }
        }
        .info{
          width: 85%;
          display: flex;
          flex-direction: column;
          padding-bottom: 20px;
          border-bottom: 0.5px #999999 solid;
          .title{
            width: 100%;
            font-family: 'PingFangSC-Regular', 'PingFang SC',serif;
            font-weight: 400;
            font-size: 30px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .address{
            width: 100%;
            font-family: 'PingFangSC-Regular', 'PingFang SC',serif;
            font-weight: 400;
            font-size: 24px;
            color: #999999;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
