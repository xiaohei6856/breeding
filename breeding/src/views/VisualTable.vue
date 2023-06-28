<template>
  <div class="contain">
      <div class="main">
        <div class="main-left">
          <div class="main-left-top">

          </div>
          <div class="main-left-bottom">
            <StackColumnChart></StackColumnChart>
          </div>
        </div>
        <div class="main-center">
          <div class="main-center-top">
            <div class="main-center-top-left">

            </div>
            <div class="main-center-top-right">

            </div>
          </div>
          <div class="main-center-center">
            <SpiritsChart></SpiritsChart>
          </div>
          <div class="main-center-bottom">
            <StackLineChart></StackLineChart>
          </div>
        </div>
        <div class="main-right">
          <div class="main-right-top">
            <BasicRadarChart></BasicRadarChart>
          </div>
          <div class="main-right-bottom">
            <TransitionBetweenChart></TransitionBetweenChart>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import StackLineChart from '../components/StackLineChart'
import StackColumnChart from '../components/StackColumnChart.vue'
import SpiritsChart from '../components/SpiritsChart.vue'
import BasicRadarChart from '../components/BasicRadarChart'
import TransitionBetweenChart from '../components/TransitionBetweenChart'
import { ref, reactive, onMounted } from 'vue';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


const connected = ref(false); // 用于表示连接状态的响应式变量
const content = ref(''); // 用于存储发送的消息内容的响应式变量
const messages = reactive([]); // 用于存储接收到的消息列表的响应式数组
const weather =  reactive([]);
const chartdatas = reactive([]);

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
    console.log('Connected: ' + frame); // 打印连接成功的日志

    // 订阅主题'/topic/environment/info'以接收消息
    stompClient.subscribe('/topic/environment/info', function (response) {
      messages.push({ id: Date.now(), body: response.body }); // 将接收到的消息添加到messages数组中
      console.log("response",response);
    });
  });
}

// 在组件挂载完成时执行的代码
onMounted(() => {
  const socket = new SockJS('/api'); // 创建SockJS实例，指定连接的URL为'/api'
  const onMessage = function (event) {
    // messages.push({ id: Date.now(), body: event.data }); // 将接收到的消息添加到messages数组中
    // console.log(event);

    // 根据换行符分割数据
    const parts = event.data.split('\n\n');

    // 获取上部分和下部分
    const upperPart = parts[0];
    const lowerPart = parts[1];
    if (upperPart.includes("WEATHER")) {
      weather.value = JSON.parse(lowerPart)
    }else{
      console.log(JSON.parse(lowerPart));
      chartdatas.value = JSON.parse(lowerPart)
    }
    console.log(weather.value);
    console.log(chartdatas.value);
  };
  socket.onmessage = onMessage; // 注册消息处理函数，处理接收到的消息
  connect();
});


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
}
.main-left-bottom{
  flex: 9;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
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
}
.main-center-top-right{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
}
.main-center-center{
  flex: 6;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
}
.main-center-bottom{
  flex: 6;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
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
}
.main-right-bottom{
  flex: 1;
  background-color: var(--td-backround-card-color);
   /*设置毛玻璃*/
  backdrop-filter: blur(20px) ;
  border-radius: 5px;
}
</style>