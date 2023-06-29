<template>
  <div class="demo-card">
    <t-card :title="title" :bordered="false" hover-shadow :style="{display: 'flex',flexDirection: 'column', height: '100%',flex:1,backgroundColor:'transparent'}">
        <div class="card-body-font">
            {{ infoMessage }}
        </div>
    </t-card>
  </div>
</template>
<script setup >

const title = '标题';
const infoMessage = `90`;
</script>
<style scoped>
.demo-card {
  height: 100%;
  background-color: var(--td-bg-color-container-hover);
}
:deep(.t-card__body){
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}
.card-body-font{
    text-align: center;
    font-size: 4rem;
    line-height: 4rem;
}
</style>
