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
import { queryTaskDetail, uploadFile, save } from '@/api/task'

export default {
  name: 'ClockIn',
  components: {},
  data() {
    return {
      detail: {},
      currentDate: new Date(),
      shopName: '南京德众堂大药房',
      remark: '',
      shopAxis: [],
      signPics: [],
      signTime: '',
      signAxis: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getDetail(this.id)
  },
  methods: {
    initMap() {
      const that = this
      var geolocation = new BMap.Geolocation()
      // var geolocation = new BMap.Geolocation()
      // 开启SDK辅助定位
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          const map = new BMap.Map('map')
          const mPoint = new BMap.Point(r.point.lng, r.point.lat)
          that.signAxis = r.point.lng + ',' + r.point.lat
          map.centerAndZoom(mPoint, 18) // 中心点和地图级别
          var center_dot = new BMap.Icon(require('@/assets/images/myPoint.png'), new BMap.Size(25, 25)) // 自定义标注图标
          const marker = new BMap.Marker(mPoint, { icon: center_dot })
          map.addOverlay(marker) // 标注自己的位置
          const circle = new BMap.Circle(mPoint, 50, {
            fillColor: '#BDDAF2',
            strokeWeight: 1,
            fillOpacity: 0.3,
            strokeOpacity: 0.3
          })
          map.addOverlay(circle)
        } else {
          console.log('failed' + this.getStatus())
        }
      })
    },
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器90+
      console.log(file)
      const res = await uploadFile(file.file)
      this.signPics.push(res.data.src)
    },
    async getDetail(id) {
      const res = await queryTaskDetail({ id })
      // this.
      const { shopAxis } = res.data
      this.shopAxis = shopAxis.split(',')
      this.detail = res.data
      this.initMap()
    },
    async goDetail() {
      // this.$router.push({
      //   name: 'VisitTask',
      //   query: { shopName: '南京德众堂大药房' }
      // })
      const { id, remark, signPics, signAxis } = this
      const signTime = new Date()
      await save({ id, remark, signPics, signTime, signAxis })
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
</style>
