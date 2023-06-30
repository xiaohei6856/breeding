<template>
  <div class="contain">
      <div class="main">
        <div class="main-left">
          <div class="main-left-top">
            <Weather :weather="weather"></Weather>
          </div>
          <div class="main-left-bottom">
            <StackColumnChart :options="chartdatas.threeitems"></StackColumnChart>
          </div>
        </div>
        <div class="main-center">
          <div class="main-center-top">
            <div class="main-center-top-left">
              <NumberCard :counts="HouseCount"></NumberCard>
            </div>
            <div class="main-center-top-right">
              <NumberCard :counts="DeviceCount"></NumberCard>
            </div>
          </div>
          <div class="main-center-center">
            <SpiritsChart :options="chartdatas.beam"></SpiritsChart>
          </div>
          <div class="main-center-bottom">
            <StackLineChart :options="chartdatas.CO2"></StackLineChart>
          </div>
        </div>
        <div class="main-right">
          <div class="main-right-top">
            <BasicRadarChart :options="chartdatas.temperature"></BasicRadarChart>
          </div>
          <div class="main-right-bottom">
            <TransitionBetweenChart :options="chartdatas.noise"></TransitionBetweenChart>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import NumberCard from '../components/numberitem/NumberCard.vue'
import Weather from '../components/Weather'
import StackLineChart from '../components/StackLineChart'
import StackColumnChart from '../components/StackColumnChart.vue'
import SpiritsChart from '../components/SpiritsChart.vue'
import BasicRadarChart from '../components/BasicRadarChart'
import TransitionBetweenChart from '../components/TransitionBetweenChart'
import stackline from '../utils/chartformdata/stackline.js'
import transition from '../utils/chartformdata/transition.js'
import spirits from '../utils/chartformdata/spirits'
import basicradar from '../utils/chartformdata/basicradar'
import stackcolumn from '../utils/chartformdata/stackcolumn'
import warning from '../utils/warning'
import { getHouseCount } from '../apis/farmedapi'
import { getDeviceCount } from '../apis/deviceapi'
import { ref, reactive, onMounted } from 'vue';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { NotifyPlugin } from 'tdesign-vue-next';

const connected = ref(false); // 用于表示连接状态的响应式变量
const content = ref(''); // 用于存储发送的消息内容的响应式变量
const messages = ref([]); // 用于存储接收到的消息列表的响应式数组
const weather =  ref([]);
const chartdatas = reactive({
  CO2:null,
  noise:null,
  beam:null,
  temperature:null,
  threeitems:null
});

let stompClient = null; // Stomp客户端实例

// 设置连接状态的方法
function setConnected(value) {
  connected.value = value;
}

// 连接到WebSocket服务器的方法
function connect() {
  const socket = new SockJS('/api'); // 创建SockJS实例，指定连接的URL为'/api'
  stompClient = Stomp.over(socket); // 创建Stomp客户端实例，并使用SockJS实例构建
  stompClient.connect({}, function (frame) { // 连接到WebSocket服务器
    setConnected(true); // 设置连接状态为true
    // 订阅主题'/topic/environment/info'以接收消息
    stompClient.subscribe('/topic/environment/info', function (response) {
      chartdatas.value = JSON.parse(response.body)
      uploadformat();
    });
  });
}

function setcover(weatherData ){
    weatherData.forEach(weather => {
  if (weather.weather.includes("晴")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/qing.png";
  } else if (weather.weather.includes("阴")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/yin.png";
  } else if (weather.weather.includes("多云")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/duoyun.png";
  } else if (weather.weather.includes("雷")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/lei.png";
  } else if (weather.weather.includes("雷阵雨")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/leizhenyu.png";
  } else if (weather.weather.includes("雨")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/xiaoyu.png";
  } else if (weather.weather.includes("雪")) {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/xue.png";
  } else {
    weather.cover = "https://xiaohei-1313160286.cos.ap-chengdu.myqcloud.com/img/weather/qing.png";
  }
});
}


const HouseCount = reactive({
  title:'养殖舍总数',
  data:null
});
function getHouseCountapi(){
  getHouseCount().then(res=>{
    HouseCount.data = res.data
  })
}

const DeviceCount = reactive({
  title:'设备总数',
  data:null
});

function getDeviceCountapi(){
  getDeviceCount().then(res=>{
    DeviceCount.data = res.data
  })
}
// 在组件挂载完成时执行的代码
onMounted(() => {
  const socket = new SockJS('/api'); // 创建SockJS实例，指定连接的URL为'/api'
  const onMessage = function (event) {

    // 根据换行符分割数据
    const parts = event.data.split('\n\n');

    // 获取上部分和下部分
    const upperPart = parts[0];
    const lowerPart = parts[1];
    console.log(upperPart);
    if (upperPart.includes("WEATHER")) {
      weather.value = JSON.parse(JSON.parse(lowerPart))
      setcover(weather.value)
    }else if (upperPart.includes("ENVIRONMENT")) {
      chartdatas.value = JSON.parse(JSON.parse(lowerPart))
      uploadformat()
    }
  };
  socket.onmessage = onMessage; // 注册消息处理函数，处理接收到的消息
  connect();
  getHouseCountapi();
  getDeviceCountapi();
});

function uploadformat(){
      chartdatas.CO2 = stackline(chartdatas.value)
      chartdatas.noise = transition(chartdatas.value)
      chartdatas.beam = spirits(chartdatas.value)
      chartdatas.temperature = basicradar(chartdatas.value)
      chartdatas.threeitems = stackcolumn(chartdatas.value)
      console.log(warning(chartdatas.value));
      warning(chartdatas.value).filteredData.forEach(warndata => {
        NotifyPlugin.warning({
            title: warndata.warningType, 
            content: warndata.warningTypes.toString() , 
            footer:warndata.name+warndata.time,
            duration: 10000 ,
            offset: [0, 50],
            closeBtn: true,
          })
      }); 
}
// // 断开与WebSocket服务器的连接的方法
// function disconnect() {
//   if (stompClient) {
//     stompClient.disconnect();
//   }
//   setConnected(false);
//   console.log('Disconnected');
// }

// // 发送消息的方法
// function sendMsg() {
//   stompClient.send('/warningInfo', {}, JSON.stringify({ msg: content.value }));
// }





</script>

<style scoped>
.contain{
  width: 100%;
  height: 100%;
}
.main{
  display: flex;
  height: 100%;
  gap: 5px;
  overflow: hidden;
}
.main-left{
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 10;
  overflow: hidden;
  /* background-color: #123; */
}
.main-left-top{
  flex: 5;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-left-bottom{
  flex: 9;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-center{
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 6;
  overflow: hidden;
  /* background-color: #456; */
}
.main-center-top{
  display: flex;
  gap: 5px;
  flex: 3;
  overflow: hidden;
  /* background-color: #159; */
}
.main-center-top-left{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-center-top-right{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-center-center{
  flex: 6;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-center-bottom{
  flex: 6;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-right{
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 8;
  overflow: hidden;
  /* background-color: #789; */
}
.main-right-top{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
.main-right-bottom{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
  overflow: hidden;
}
</style>