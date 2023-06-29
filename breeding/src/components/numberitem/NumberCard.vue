<template>
  <div class="demo-card">
    <t-card :title="props.counts.title" :bordered="false" hover-shadow :style="{display: 'flex',flexDirection: 'column', height: '100%',flex:1,backgroundColor:'transparent'}">
        <div class="card-body-font">
            {{ props.counts.data }}
        </div>
    </t-card>
  </div>
</template>
<script setup >

const props = defineProps(['counts'])

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
    font-size: 3rem;
    line-height: 3rem;
    color: var(--td-warning-color-7);
}
</style>
