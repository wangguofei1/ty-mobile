<template>
  <div class="clockIn">
    <div id="map"></div>
    <div class="qdBox">
      <van-row type="flex" justify="center">
          <van-col :span="24">
            <van-cell :title="detail.name" />
            <van-cell title="拜访药房" :value="detail.shopName" />
            <van-cell title="拜访内容" :value="detail.description" />
            <van-cell title="拜访截至日期" :value="detail.endDate" />
          </van-col>
        </van-row>
      <div>
        <van-row type="flex" justify="center">
          <van-col :span="24">
            <div class="flex1 content1">
              <div>现场照片</div>
            </div>
          </van-col>
        </van-row>
        <van-uploader v-model="sitePic" :after-read="afterRead" capture="camera" />
      </div>
      <div class="item2">
        <van-field
          style="background-color: #f6f6f8; border-radius: 6px"
          v-model="remark"
          rows="2"
          autosize
          type="textarea"
          placeholder="描述此次的拜访目的......"
        />
      </div>
      <van-button
            type="primary"
            size="large"
            color="#4873EE"
            style="border-radius: 6px"
            @click="goDetail()"
        >签到</van-button
      >
    </div>
  </div>
</template>

<script>
import { queryTaskDetail, uploadFile, save, sign } from '@/api/task'
import { getWXsignature, translateLng } from '@/api/system'
import wx from'weixin-js-sdk'

export default {
  name: 'ClockIn',
  components: {},
  data() {
    return {
      detail: {},
      currentDate: new Date(),
      remark: '',
      shopAxis: [],
      signPics: [],
      signTime: '',
      signAxis: '',
      sitePic: [],
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail(this.id)
  },
  mounted() {
    this.config()
  },
  methods: {
    async afterRead(file) {
      const res = await uploadFile(file.file)
      this.signPics.push(res.data.data.src)
    },
    async getDetail(id) {
      const res = await queryTaskDetail({ id })
      const { shopAxis } = res.data
      this.shopAxis = shopAxis.split(',')
      this.detail = res.data
    },
    async goDetail() {
      
      const { id, remark, signPics, signAxis } = this
      if(signPics.length === 0){
        this.$toast('请上传现场照片')
        return false
      }
      const data = {
        signAxis: signAxis,
        signPics: signPics.join(','),
        taskId: id
      }
      const res = await sign(data)
      if(res.code === 0) {
        this.$router.push({
          name: 'VisitTask',
          query: { id: this.id }
        })
      }
    },
    async config() {
      const that = this
      const res = await getWXsignature({ url: window.location.href })
      const {appId,nonceStr,timestamp,signature} = res.data
      wx.config({
        appId: appId,
        nonceStr: nonceStr,
        signature: signature,
        timestamp: timestamp,
        debug: false,
        jsApiList: ['getLocation']
      })
      wx.ready((res) => {
        that.getLocationByWx()
      })
      
      wx.error((res) => {
      })
    },
    getLocationByWx(){
      const that = this
      const ua = window.navigator.userAgent.toLowerCase()
      if(ua.match(/micromessenger/i) != null){
        wx.getLocation({
          type: 'gcj02',
          success: (res) => {
            var lat = res.latitude
            var lng = res.longitude
            translateLng({
              ak: 'fttekDTqWAsVp1Y6m0b8K6BhITGvEdxz',
              location: lat + ',' + lng,
              output: 'json',
              pois: '1'
            })
            .then((res) => {
              console.log(res)
              const map = new BMap.Map('map')
              const mPoint = new BMap.Point(res.result.location.lng, res.result.location.lat)
              const tPoint = new BMap.Point(that.shopAxis[0], that.shopAxis[1])
              that.signAxis = res.result.location.lng + ',' + res.result.location.lat
              map.centerAndZoom(mPoint, 18) // 中心点和地图级别
              var target_dot = new BMap.Icon(require('@/assets/images/myPoint.png'), new BMap.Size(25, 25))
              var my_dot = new BMap.Icon(require('@/assets/images/point.png'), new BMap.Size(25, 25))
              const marker = new BMap.Marker(mPoint, { icon: my_dot })
              map.addOverlay(marker) // 标注自己的位置
              map.addOverlay(new BMap.Marker(tPoint, { icon: target_dot }))
              // const circle = new BMap.Circle(mPoint, 50, {
              //   fillColor: '#BDDAF2',
              //   strokeWeight: 1,
              //   fillOpacity: 0.3,
              //   strokeOpacity: 0.3
              // })
              // map.addOverlay(circle)
            })
            
          },
          fail: (error) => {
            console.log(error)
          },
          cancel: (error) => {
            console.log(error)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.clockIn {
  padding: 3px;
}
#map {
  width: 100%;
  height: 200px;
}
.qdBox {
  background-color: #fff;
  padding: 10px 10px;
  border-radius: 5px;
  position: relative;
  z-index: 2;
  margin-top: -1px;

  .flex1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .content1 {
    line-height: 35px;
    > div:nth-child(1) {
      font-size: 14px;
      font-weight: 500;
      color: #939393;
    }

    > div:nth-child(2) {
      > span:nth-child(1) {
        font-size: 13px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
  }
  .item-bt {
    border-bottom: 1px solid #f4f4f4;
  }
  .item2 {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}
.van-cell__value {
  flex: auto;
}
</style>
