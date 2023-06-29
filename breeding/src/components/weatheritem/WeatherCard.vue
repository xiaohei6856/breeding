<template>
  <t-card :title="props.weatherdata.date" hover-shadow :bordered="false" :style="{ height: '100%' ,flex:1,backgroundColor:'transparent'}" :cover="props.weatherdata.cover">
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


const props = defineProps(['weatherdata'])

</script>