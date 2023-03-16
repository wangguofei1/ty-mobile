<template>
  <div class="clockIn">
    <div id="map"></div>
    <div class="qdBox">
      <div @click="isShopShow = isShopShow ? false : true">
        <van-row type="flex" justify="center">
          <van-col :span="24">
            <div class="flex1 content1 item-bt">
              <div>拜访药房</div>
              <div>
                <span style="color: #000" v-if="shopName">{{ shopName }}</span>
                <span style="color: #c8c9cc" v-if="!shopName">请选择门店</span>
                <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div @click="isDateShow = isDateShow ? false : true">
        <van-row type="flex" justify="center">
          <van-col :span="24">
            <div class="flex1 content1 item-bt">
              <div>拜访时间</div>
              <div>
                <span style="color: #000" v-if="visitTime">{{ visitTime | formatDateHM }}</span>
                <span style="color: #ccc" v-if="!visitTime">请选择时间</span>
                <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
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
          v-model="visitPurpose"
          rows="2"
          autosize
          type="textarea"
          placeholder="描述此次的拜访目的......"
        />
      </div>
      <van-button type="primary" size="large" color="#4873EE" style="border-radius: 6px" @click="goDetail()"
        >签到</van-button
      >
    </div>
    <div>
      <van-popup v-model="isShopShow" round position="bottom">
        <van-picker
          show-toolbar
          :columns="shopList"
          value-key="name"
          @confirm="confirmShop"
          @cancel="isShopShow = false"
        />
      </van-popup>
    </div>
    <div>
      <van-popup v-model="isDateShow" round position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          @confirm="confirmDate"
          @cancel="isDateShow = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockIn',
  components: {},
  data() {
    return {
      shopList: [
        { name: '南京德众堂大药房', id: 1 },
        { name: '南京德众堂大药房1', id: 2 },
        { name: '南京德众堂大药房2', id: 3 },
        { name: '南京德众堂大药房3', id: 4 },
        { name: '南京德众堂大药房4', id: 5 }
      ],
      isShopShow: false,
      isDateShow: false,
      currentDate: new Date(),
      shopName: '南京德众堂大药房',
      visitTime: '2022-07-09 12:00',
      sitePic: [],
      visitPurpose: ''
    }
  },
  created() {},
  computed: {},
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const map = new BMap.Map('map')
      const point = new BMap.Point(118.770563, 32.0497) // 此处坐标点可以根据实际情况传入
      map.centerAndZoom(point, 18) //中心点和地图级别
      const mPoint = new BMap.Point(118.770563, 32.0497)
      var center_dot = new BMap.Icon(require('@/assets/images/myPoint.png'), new BMap.Size(25, 25)) //自定义标注图标
      const marker = new BMap.Marker(mPoint, { icon: center_dot })
      map.addOverlay(marker) //标注自己的位置
      const circle = new BMap.Circle(mPoint, 50, {
        fillColor: '#BDDAF2',
        strokeWeight: 1,
        fillOpacity: 0.3,
        strokeOpacity: 0.3
      })
      map.addOverlay(circle)
      const mOption = {
        poiRadius: 50, //半径为1000米内的POI,默认100米
        numPois: 5 //列举出50个POI,默认10个
      }
      const myGeo = new BMap.Geocoder() //创建地址解析实例
      myGeo.getLocation(
        mPoint,
        rs => {
          const allPois = rs.surroundingPois //获取全部POI
          allPois.forEach(v => {
            map.addOverlay(new BMap.Marker(v.point))
            const label = new BMap.Label(v.title, {
              // 创建文本标注
              position: v.point, // 设置标注的地理位置
              offset: new BMap.Size(-50, -45) // 设置标注的偏移量
            })
            label.setStyle({
              // 设置label的样式
              color: '#6FB6A2',
              fontSize: '10px',
              border: '0px',
              backgroundColor: 'transparent'
            })
            map.addOverlay(label)
          })
        },
        mOption
      )

      // var geolocation = new BMap.Geolocation()
      // geolocation.getCurrentPosition(r => {
      //   r.point.lng = 118.770563
      //   r.point.lat = 32.0497
      //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
      //     var mk = new BMap.Marker(r.point)
      //     map.addOverlay(mk)
      //     map.panTo(r.point)
      //   } else {
      //     alert('failed' + this.getStatus())
      //   }
      // })
    },

    confirmShop(item) {
      this.shopName = item.name
      this.isShopShow = false
    },
    confirmDate(value) {
      this.visitTime = value
      this.isDateShow = false
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    goDetail(url) {
      this.$router.push({
        name: 'VisitTask',
        query: { shopName: '南京德众堂大药房' }
      })
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
