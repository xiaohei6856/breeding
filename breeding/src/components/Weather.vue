<template>
  <div class="weathercard">
    <WeatherCard v-for="(item,index) in props.weather" :key="index" :weatherdata="weather[index]"></WeatherCard>
  </div>
</template>

<script setup>
import WeatherCard from './weatheritem/WeatherCard.vue'

const props = defineProps(['weather']);

</script>

<style scoped>
.weathercard{
    display: flex;
    gap: 1px;
    height: 100%;
}
</style>