<template>
<div class="body">
    <div class="container">
        <div class="form-box" :style="{ transform: formTransform }">
            <!-- 注册 -->
            <div :class="{'register-box':true,hidden: !isRegister}">
                <h1>register</h1>
                <t-form labelWidth="0"  v-if="emailshow" ref="captcharef" :data="registerform" :colon="true" @submit="submitcaptcha">
                    <t-form-item name="email">
                        <t-input v-model="registerform.email" type="text" placeholder="邮箱" ></t-input>
                    </t-form-item>
                    <t-form-item>
                        <t-button  style="width:100% !important" type="submit" block>申请验证码</t-button>
                    </t-form-item>
                </t-form>
                <t-form  labelWidth="0" v-else ref="registerref" :data="registerform" :colon="true" @submit="submitregister">
                    <t-form-item   name="nickname">
                        <t-input v-model="registerform.nickname" type="text" placeholder="昵称"></t-input>
                    </t-form-item>
                    <t-form-item  name="password">
                        <t-input v-model="registerform.password" type="password" placeholder="密码"></t-input>
                    </t-form-item>
                    <t-form-item  name="rePassword">
                        <t-input v-model="registerform.rePassword" type="password" placeholder="确认密码"></t-input>
                    </t-form-item>
                      <t-form-item  name="captcha">
                        <t-input v-model="registerform.captcha" type="text" placeholder="验证码" clearable></t-input>
                    </t-form-item>
                    <t-form-item  name="permitCode">
                        <t-input v-model="registerform.permitCode" type="text" placeholder="注册授权码"></t-input>
                    </t-form-item>
                    <t-form-item>
                        <t-button @click="emailshow=true" block>返回</t-button>
                        <t-button  type="submit" block>注册</t-button>
                    </t-form-item>
                </t-form>
                <!-- <input type="email" placeholder="邮箱" v-model="registerform.email">
                <div style="display:flex;align-items: center;justify-content: center;">
                    <input type="text" placeholder="验证码" v-model="registerform.captcha">
                    <button style="margin:0;" @click="getcaptcha">申请验证码</button>
                </div>
                <input type="text" placeholder="昵称" v-model="registerform.nickname">
                <input type="text" placeholder="用户名" v-model="registerform.username">
                <input type="password" placeholder="密码" v-model="registerform.password">
                <input type="password" placeholder="确认密码" v-model="registerform.rePassword">
                <input type="text" placeholder="注册授权码" v-model="registerform.permitCode">
                <button @click="submitregister">注册</button> -->
            </div>
            <!-- 登录 -->
            <div :class="{'login-box':true,hidden: isRegister}">
                <h1>login</h1>
                <input type="text" placeholder="邮箱"  v-model="loginform.username">
                <input type="password" placeholder="密码" v-model="loginform.password">
                <button @click="submitlogin">登录</button>
            </div>
        </div>
        <div class="con-box left">
            <h2>欢迎来到<span>养殖舍</span></h2>
            <!-- <p>快来领取你的专属<span></span>吧</p> -->
            <!-- <img src="../images/cat/1.png" alt=""> -->
            <p>已有账号</p>
            <button id="login" @click="gologin">去登录</button>
        </div>
        <div class="con-box right">
            <h2>欢迎来到<span>养殖舍</span></h2>
            <!-- <p>快来看看你的可爱<span>宠物</span>吧</p> -->
            <!-- <img src="../images/cat/2.png" alt=""> -->
            <p>没有账号？</p>
            <button id="register" @click="goregister">去注册</button>
        </div>
    </div>
</div>
</template>

<script setup>

import { ref,reactive } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { login,register,getRegCode } from '../apis/userapi'
import { setlocal } from '../utils/localStorage'
import { useRouter } from 'vue-router';

// 判断对象中的值是否包含空
function hasEmptyValue(obj) {
  return Object.values(obj).includes(null) || Object.values(obj).includes(undefined)||Object.values(obj).includes("");
}

const loginform = reactive({
    username:"",
    password:""
})

const router = useRouter();
function submitlogin(){
    console.log(loginform);
    console.log(hasEmptyValue(loginform));
    if (hasEmptyValue(loginform)) {
        MessagePlugin.error('请填写完整')
    }else{
        login(loginform).then(res=>{
            MessagePlugin.success('登陆成功')
            setlocal('token',res.data.token)
            router.push('/');
        })
    }
}

const registerform = reactive({
    password:"",
    captcha: "",
    email: "",
    nickname: "",
    permitCode: "",
    rePassword: "",
})

const emailshow = ref(true);

function validateEmail() {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(registerform.email);
}
const captcharef = ref(null);
function submitcaptcha(){
    if (validateEmail()) {
        console.log(registerform.email);
        getRegCode({email:registerform.email}).then(
            res=>{
                console.log('getRegCode',res);
                emailshow.value = false;
            }
        )
    }else{
        return MessagePlugin.error('请输入正确的邮箱')
    }
}
const registerref = ref(null);
function submitregister(){
    console.log(registerform);
    if (hasEmptyValue(registerform))
        return MessagePlugin.error('请填写完整')

    if (registerform.password !== registerform.rePassword)
        return  MessagePlugin.error('两次输入密码不一致')
    
    if (!validateEmail()) 
        return  MessagePlugin.error('请输入正确的邮箱')

    registerform.username = registerform.email
    register(registerform).then(
        res=>{
            console.log(res);
            if (res.success) {
                loginform.username = registerform.email
                loginform.password = registerform.password
                gologin()
            }else if(res.message = '用户名已被注册'){
                registerref.value.reset();
                emailshow = true
            }
        }
    )
}

const formTransform = ref('translateX(0%)');
const isRegister = ref(false);
function gologin(){
    formTransform.value = 'translateX(0%)';
    isRegister.value = false;
}
function goregister(){
    formTransform.value = 'translateX(80%)';
    isRegister.value = true;
}
</script>

<style scoped>
*{
    /* 初始化 */
    margin: 0;
    padding: 0;
}
.body{
    /* 100%窗口高度 */
    height: 100vh;
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 渐变背景 */
    background: linear-gradient(200deg,#f3e7e9,#e3eeff);
}
.container{
    background-color: #fff;
    width: 750px;
    height: 515px;
    border-radius: 5px;
    /* 阴影 */
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
    /* 相对定位 */
    position: relative;
}
.form-box{
    /* 绝对定位 */
    position: absolute;
    top: -10%;
    left: 5%;
    background-color: #d3b7d8;
    width: 370px;
    height: 600px;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* 动画过渡 加速后减速 */
    transition: 0.5s ease-in-out;
}


.register-box,.login-box{
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.hidden{
    display: none;
    transition: 0.5s;
}
h1{
    text-align: center;
    margin-bottom: 25px;
    /* 大写 */
    text-transform: uppercase;
    color: #fff;
    /* 字间距 */
    letter-spacing: 5px;
}

input{
    background-color: transparent;
    width: 70%;
    color: #fff;
    border: none;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255,255,255,0.4);
    padding: 10px 0;
    text-indent: 10px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
}
:deep(.form-box .t-input){
    border: none !important;
    margin: 5px 0;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255,255,255,0.4) !important;
    background-color: transparent !important;
}
:deep(.form-box .t-input input){
    color: #fff !important;
}
:deep(.form-box .t-input input::placeholder){
   color: #fff !important;
}
:deep(.form-box .t-input input:focus){
    color: #a262ad ;
    outline: none;
    /* border-bottom: 1px solid #a262ad80 ; */
    transition: 0.5s;
}
:deep(.form-box .t-input input:focus::placeholder){
    opacity: 0 ;
}
input::placeholder{
    color: #fff;
}
input:focus{
    color: #a262ad;
    outline: none;
    border-bottom: 1px solid #a262ad80;
    transition: 0.5s;
}
input:focus::placeholder{
    opacity: 0;
}
.form-box button{
    width: 70%;
    margin-top: 35px;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 8px;
    padding: 13px;
    color: #a262ad;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
}
.form-box button:hover{
    background-color: #a262ad;
    color: #f6f6f6;
    transition: background-color 0.5s ease;
}
.con-box{
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.con-box.left{
    left: -2%;
}
.con-box.right{
    right: -2%;
}
.con-box h2{
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
}
.con-box p{
    font-size: 12px;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
}
.con-box span{
    color: #d3b7d8;
}
.con-box img{
    width: 150px;
    height: 150px;
    opacity: 0.9;
    margin: 40px 0;
}
.con-box button{
    margin-top: 3%;
    background-color: #fff;
    color: #a262ad;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
}
.con-box button:hover{
    background-color: #d3b7d8;
    color: #fff;
}
</style>