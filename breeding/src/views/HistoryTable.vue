<template>
 <div class="tdesign-demo-block-column" style="width: 100%; max-width: 100%">
    <t-card>
      <div class="label">
        <span style="display: inline-block; padding-top: 10px">分类：</span>
      </div>
      <t-select
        v-model="findForm.type"
        style="width: 240px; display: inline-block"
      >
        <t-option
          v-for="(item, key) in type"
          :key="key"
          :value="item"
          @click="findByCondition"
          >{{ item }}</t-option
        >
      </t-select>

     <div class="label" style="margin-left:30px;">
        <span style="display: inline-block; padding-top: 10px">养殖舍名称：</span>
      </div>
      <t-input v-model="byNameForm.name" @blur="findByName()" @keyup="findByName()" style="width:240px;display:inline-block"></t-input>
    
    </t-card>
    <t-card style="width:100%;overflow-x:scroll;">
      <t-table :columns="columns" :data="list" :rowKey="list.id">
      </t-table>
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { historyFindAll, historyFindByCondition,historyFindByName } from '@/apis/historyapi.js'
import { farmGetTypes } from "@/apis/farmedapi";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";
 const total = ref(100) // 总条数
const type = ref([]);
const list = ref([]);
const tableLayout = ref("fixed");
const emptyData = ref(false);
const findForm = reactive({
  pageNo:1,
  pageSize:20,
  type:""
})
const byNameForm = reactive({
  pageNo:1,
  pageSize:20,
  name:""
})
function handleChange(page) {
        current.value = page
       
      }
// 查询所有类型
const getAllType = async () => {
  try {
    const response = await farmGetTypes({});
    type.value = response.data;
    console.log(response.data);
  } catch (error) {}
};
const tableRef = ref(null);
 const renderValue = (text) => {
      const formattedValue = Number(text).toFixed(2);
      return `<span>${formattedValue}</span>`;
    };
const columns = ref([
  { title: "名字", colKey: "name" ,width:"80px"},
  { title: "分类", colKey: "type" ,width:"80px"},
  { title: "创建时间", colKey: "time",width:"230px"},
  { title: "氨气浓度（%）", colKey: "ammonia",width:"140px"},
  { title: "光照强度（Lux）", colKey: "beam",width:"140px" },
  { title: "CO2浓度（ppm）", colKey: "co2",width:"140px" },
  { title: "湿度（%）", colKey: "humidity" ,width:"140px"},
  { title: "音频水平（db）", colKey: "noise" ,width:"140px"},
  { title: "氧气浓度（%）", colKey: "oxygen" ,width:"140px"},
  { title: "温度（℃）", colKey: "temperature" ,width:"140px",  customRender: (text) => {
            return parseFloat(text).toFixed(2);} },
  { title: "警告", colKey: "warningType" ,width:"150px"},
]);
  const formatNumber = (number) => {
      return Number(number).toFixed(2);
    };
// 查询所有数据
const getHistory = async () => {
  try {
    const response = await historyFindAll({});
    
    list.value = response.data.list;
    total.value = response.data.total
    console.log(response.data);
  } 
  catch (error) {
    console.log(error);
  }
};

// 条件查询
const findByCondition = () =>{
  historyFindByCondition(findForm).then(res =>{
    console.log(res);
    list.value = res.data.list
  })
}
// 名字查询
const findByName = () =>{
  historyFindByName(byNameForm).then(res =>{
    console.log(res);
    list.value = res.data.list
  })
}

onMounted(()=>{
  getHistory();
  getAllType();
})

</script>
<style lang="scss" scoped>
.tdesign-demo-block-column {
  width: 80%;
  .label {
    display: inline-block;
    // padding-top: 10px;
  }
}
</style>
