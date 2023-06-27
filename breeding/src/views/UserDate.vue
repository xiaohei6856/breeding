<template>
  <div style="width: 250px">
    <t-form ref="permitcoderef" :data="formData" :colon="true" label-align="top"  @submit="onSubmit">
      <t-form-item label="注册授权码" name="email">
        <t-input v-model="formData.email" clearable placeholder="请输入对方邮箱">
          <template #prefix-icon>
            <desktop-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit" block>发送授权码</t-button>
          <t-button theme="default" variant="base" type="reset">清空</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup>
import { reactive,ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import { DesktopIcon } from 'tdesign-icons-vue-next';
import { sendPermitCode } from '../apis/userapi'

const formData = reactive({
  email: '',
});

function validateEmail() {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(formData.email);
}

const permitcoderef = ref(null)
const onSubmit = () => {
  if (validateEmail()) {
        console.log(formData.email);
        sendPermitCode({email:formData.email}).then(
            res=>{
                console.log('getRegCode',res);
                permitcoderef.value.reset();
            }
        )
    }else{
        return MessagePlugin.error('请输入正确的邮箱')
    }
};
</script>
