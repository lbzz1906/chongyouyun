<template>

  <div>
    <div id="main">
      <img :src="ico">
      <h1>重邮云医院管理平台</h1>
      <p class="weather">
        <p1>{{ city + ":"}}</p1><br><br>
        <p1 style="color: red">{{weather.high}}</p1><br>
        <p1 style="color: blue">{{weather.low}}</p1><br>
          <p1 style="color: coral">{{weather.type}}</p1>
      </p>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      city: '都江堰',
      weather: '',
      high: '',
      ico:require('@/assets/ico.png')
    }
  },
  mounted: function () {
    var that = this
    axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
      .then(function (response) {
        that.weather = response.data.data.forecast[0]
        console.log(that.weather)
      })
      .catch(function (err) {
      })
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  user-select:none;
}

img{
  width: 100px;
  margin-top: 15px;
  margin-left: 20px;
  animation:mymove 5s infinite;
}
.weather {
  margin-right: 20px;
  padding: 15px 20px 15px 20px;
  color: #ffffff;
  float: right;
  border: #cce7ff solid 2px;
  background-color: #a8d3ff;
  font-size: 13px;
}

#main {
  height: 130px;
  color: #ffe0d3;
  background-color: #82a5f5;
  border-bottom: #cce7ff solid 5px;
}

h1 {
  position: absolute;
  display: inline;
  padding-left: 30px;
  margin-top: 20px;
  font-size: 65px;
  font-weight: bold;
}

@keyframes mymove {
  from{filter: hue-rotate(0);}
  to{filter: hue-rotate(360deg);}
}
</style>
