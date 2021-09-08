<template>
  <div class="main">
    <BMap
        ak="9EUcrMCyPgEfIlGGgcM4ojymS45nesOc"
        class="map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="bMapLoad"
    />
    <VoiceAssistant />
  </div>
</template>

<script>
import BMap from 'vue-baidu-map/components/map/Map'
import VoiceAssistant from '../components/VoiceAssistant'
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
      voice: null,
      map: null // 地图容器
    }
  },
  mounted () {},
  components: {
    BMap,
    VoiceAssistant
  },
  methods: {
    // BMap加载触发寻找周边方法
    bMapLoad ({BMap, map}) {
      // 百度地图容器全局化
      this.map = map
      // 百度地图构造函数全局化
      mapConstructor = BMap
      this.bMapPoint(this.center)
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
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">
  .main{
    width: 100%;
    height: 100%;
    .map{
      width: 100%;
      height: 100vh;
    }
  }
</style>
