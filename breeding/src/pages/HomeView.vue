<template>
    <div class="container">
        <div class="left-box" :style="{width:boxWidth}">
            <ul>
               <li v-for="(item, index) in state.items" :key="index" @click="setActive(index)" :class="{ active: state.activeIndex === index }">{{ item }}</li>
            </ul>
            <div class="user-info">
                <img src="../assets/logo.png" alt="">
                <span>{{username}}</span>
                <i class="icon icon-gear clicks" @click="goout"><LoginIcon /></i> 
            </div>
        </div>
        <div class="right-box">
            <div class="top">
                <span class="current-tag">{{state.currentTag}}</span>
                <i class="icon icon-gear clicks" style="margin:0 10px;line-height:20px" @click="handlefullScreen">
                     <RectangleIcon />
                </i>
                <t-switch @change="toggleBtn" v-model="checked" size="large" :label="['暗', '亮']"></t-switch>
            </div>
            <div class="middle">
              <router-view/>
            </div>
            <div class="handler" @click="closeSide()" :class="{close:isClosed}"></div>
        </div>
    </div>
</template>

<script setup>
import VueJwtDecode from 'vue-jwt-decode'
import { RectangleIcon,manifest,LoginIcon } from 'tdesign-icons-vue-next'
import { useRoute, useRouter } from 'vue-router';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted,reactive,ref } from 'vue';
import { removelocal,getlocal } from '../utils/localStorage'

onMounted(() => {
    firstset()
})

 // 全屏初始状态
let fullscreen= false
//全屏模式
function handlefullScreen(){
    // 获取文档对象的根元素
      let element = document.documentElement;
      // console.log(123);
      if (fullscreen) {
        // 设置不同浏览器下的退出全屏模式
        // -webkit- 兼容chrome 和 safari
        // -moz- 兼容firefox
        // -ms- 兼容IE浏览器
        // -o- 兼容opera
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // 设置不同浏览器下的进入全屏模式
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      fullscreen = !fullscreen;
}

// 路由跳转
const route = useRoute();
const router = useRouter();

const state = reactive({
  items:['首页','历史数据','养殖舍','设备管理','用户'],
  itemsvalue:['visual','history','farmed','equipment','user'],
  activeIndex:null,
  currentTag:'首页',
});
//   防止刷新后侧边栏选项对应不准确
function firstset(){
    state.activeIndex = state.itemsvalue.indexOf(route.meta.title)
    state.currentTag = state.items[state.activeIndex]
}
// 点击跳转
function setActive(index){
  state.activeIndex = index;
  state.currentTag = state.items[index];
  router.push('/'+state.itemsvalue[index]);
}
//退出登录
function goout(){
    MessagePlugin.success('退出成功')
    removelocal('token');
    router.push('/login');
}

// 侧边栏关闭
const isClosed = ref(false);
const boxWidth = ref('250px');
function closeSide(){
  if(!isClosed.value){
    boxWidth.value = '0';
    isClosed.value = true;
  }else{
    boxWidth.value = '250px';
    isClosed.value = false;
  }
}


// 暗亮色转换
const checked = ref(false);
function toggleBtn(){
    console.log(checked.value);
  if (checked.value) {
      // 设置暗色模式
    document.documentElement.setAttribute('theme-mode', 'dark');
  }else{
      // 重置为浅色模式
    document.documentElement.removeAttribute('theme-mode');
  }
}

const username = ref(null)
onMounted(()=>{
    if(getlocal('token')){
        let info = VueJwtDecode.decode(getlocal('token'))
        username.value = info.username
    }
})

</script>

<style>
*{
    /* 初始化 */
    margin: 0;
    padding: 0;
}
body{
    /* 100%窗口宽度和高度 */
    width: 100vw;
    height: 100vh;
    /* 溢出隐藏 */
    overflow: hidden;
    /* 设置背景 */
    /* background: url("/images/mountain.jpg") no-repeat; */
    background-size: cover;
}
.container{
    width: 100%;
    height: 100vh;
    /* 弹性布局 水平排列 */
    display: flex;
}
/* 字体图标 */
.icon{
    color: var(--td-text-color-primary);
    font-size: 24px;
}
.clicks{
    cursor: pointer;
}
/* 左侧导航栏 */
.left-box{
    width: 250px;
    height: 100%;
    /* 半透明背景 */
    background-color: var(--td-bg-color-container);
    /* 背景模糊（毛玻璃） */
    backdrop-filter: blur(30px);
    /* 相对定位 */
    position: relative;
    color: var(--td-text-color-primary);
    font-size: 14px;
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    /* 设置过渡 */
    transition: 0.5s ease;
    /* 不让文字换行 */
    white-space: nowrap;
}
.left-box ul{
    list-style: none;
    width: 90%;
    margin: 25px auto;
    /* 高度铺满 */
    flex: 1;
}
.left-box li{
    height: 46px;
    /* 弹性布局 垂直居中 */
    display: flex;
    align-items: center;
    padding-left: 12px;
    border-radius: 10px;
    cursor: pointer;
    /* 过渡 */
    transition: 0.3s;
}
/* 选中态样式 */
.left-box li.active,
.left-box li.active:hover{
    background-color: var(--td-bg-color-container-active);
}
.left-box li:hover{
    background-color: var(--td-bg-color-container-hover);
}
.left-box hr{
    width: 90%;
    margin: 18px auto;
    border: none;
    border-top: 1px solid var(--td-bg-color-container-active);
}
.left-box .icon{
    margin-right: 16px;
}
/* 用户信息区域 */
.user-info{
    border-top: 1px solid var(--td-bg-color-container-active);
    display: flex;
    align-items: center;
    padding: 24px;
}
.user-info img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 14px;
}
.user-info span{
    flex: 1;
}
.user-info .icon{
    font-size: 20px;
    margin-right: 0;
}
/* 右侧区域 */
.right-box{
    background-color: var(--td-bg-color-secondarycomponent);
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
}
.right-box .top{
    padding: 25px 35px;
    display: flex;
    align-items: center;
    height: 46px;
    background-color: var(--td-bg-color-secondarycontainer-hover);
}
.right-box .top .current-tag{
    flex: 1;
    color: var(--td-text-color-primary);
    font-weight: 600;
}
.right-box .top .btn{
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
.right-box .top .btn:last-child{
    /* background-color: var(--td-brand-color-6); */
    margin-left: 20px;
}
.right-box .middle{
    flex: 1;
    display: flex;
    color: var(--td-text-color-primary);
    overflow: auto;
    padding: 25px;
    overflow: hidden;
    /* justify-content: center;
    align-items: center;
    font-size: 6vw;
    font-weight: bold;
    text-transform: uppercase; */
}
/* 展开收起开关 */
.right-box .handler{
    width: 10px;
    height: 50px;
    /* 绝对定位 垂直居中 */
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    /* 光标变小手 */
    cursor: pointer;
    /* 默认不透明度为0 */
    opacity: 0;
    /* 过渡 */
    transition: opacity 0.3s;
}
.right-box .handler::before,
.right-box .handler::after{
    content: "";
    background-color: var(--td-bg-color-component-active);
    position: absolute;
    left: 0;
    width: 100%;
    height: 50%;
    border-radius: 10px 10px 0 0;
    /* 过渡 */
    transition: 0.2s;
}
.right-box .handler::after{
    bottom: 0;
    border-radius: 0 0 10px 10px;
}
.right-box:hover .handler{
    opacity: 1;
}
.right-box .handler:hover::before{
    transform: skewX(-15deg);
}
.right-box .handler:hover::after{
    transform: skewX(15deg);
}
.right-box .handler.close:hover::before{
    transform: skewX(15deg);
}
.right-box .handler.close:hover::after{
    transform: skewX(-15deg);
}
</style>
