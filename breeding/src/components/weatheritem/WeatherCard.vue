<template>
  <t-card :title="formatdata(props.weatherdata.date)" hover-shadow :bordered="false" :style="{display:'flex',flexDirection:'column' ,height: '100%' ,flex:1,backgroundColor:'transparent'}" :cover="props.weatherdata.cover">
    <template #actions>
      {{props.weatherdata.city}}
    </template>
    <template #footer>
      <t-row :align="'middle'" justify="center" style="gap: 24px">
        <t-col flex="auto" style="display: inline-flex; justify-content: center">
          {{props.weatherdata.weather}}
        </t-col>
        <t-col flex="auto" style="display: inline-flex; justify-content: center">
          {{props.weatherdata.temperatureUpper}}°/{{props.weatherdata.temperatureLower}}°
        </t-col>
      </t-row>
    </template>
  </t-card>
</template>
<script setup >
import formatdata from '../../utils/formatdata'

const props = defineProps(['weatherdata'])

</script>
<style scoped>
:deep(.t-card__header){
  flex: 1;
}
:deep(.t-card__cover){
  flex: 2;
}
:deep(.t-card__footer){
  flex: 1;
}
:deep(.t-card__cover img){
  width: 70%;
  margin: 0 auto;
}
</style>