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

      <div class="label" style="margin-left: 30px">
        <span style="display: inline-block; padding-top: 10px"
          >养殖舍名称：</span
        >
      </div>
      <t-input
        v-model="findForm.name"
        @change="
          findByCondition();
          findByName();
        "
        @keyup="
          findByCondition();
          findByName();
        "
        style="width: 240px; display: inline-block"
      ></t-input>
    </t-card>
    <t-card style="width: 100%; overflow-x: scroll">
      <t-table :columns="columns" :data="list" :rowKey="list.id"  style="margin-bottom:15px;">
         <template #name="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ row.name }}
          </span>
        </template>
         <template #type="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ row.type }}
          </span>
        </template>
         <template #time="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ row.time }}
          </span>
        </template>
        <template #ammonia="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.ammonia) }}
          </span>
        </template>
        <template #beam="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.beam) }}
          </span>
        </template>
        <template #co2="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.co2) }}
          </span>
        </template>
        <template #humidity="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.humidity) }}
          </span>
        </template>
        <template #noise="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.noise) }}
          </span>
        </template>
        <template #oxygen="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.oxygen) }}
          </span>
        </template>
        <template #temperature="{ row }">
          <span :class="{ 'warn-text': row.warningType !== '' }">
            {{ formatValue(row.temperature) }}
          </span>
        </template>
        <template #warningType="{ row }">
          <span class="warn-text">
            {{ row.warningType }}
          </span>
        </template>
      </t-table>
         <t-pagination
      :total="total"
      :current="pageForm.pageNo"
      :page-size="pageForm.pageSize"
       @page-size-change="onPageSizeChange"
       @current-change="onCurrentChange"
      @change="handlePaginationChange"
    />
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import {
  historyFindAll,
  historyFindByCondition,
  historyFindByName,
} from "@/apis/historyapi.js";
import { farmGetTypes } from "@/apis/farmedapi";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
const total = ref(100); // 总条数
const type = ref([]);
const list = ref([]);
const tableLayout = ref("fixed");
const emptyData = ref(false);
const findForm = reactive({
  pageNo: 1,
  pageSize: 10,
  name: "",
  type: "",
});
const currentPage = ref(1)
const pageForm = reactive({
  pageNo:1, //当前页码数
  pageSize:10 //每页显示的记录数
})

const handlePaginationChange = (pageInfo) =>{
  // pageForm.pageNo = current;
  console.log(pageInfo);
  const page = reactive({
    pageNo:pageInfo.current,
    pageSize:pageInfo.pageSize,
    name:findForm.name,
    type:findForm.type
  })
   
  if(page.type === ""){
     historyFindByName(page).then(res =>{
    list.value = res.data.list;
    total.value = res.data.total;
  })
  }else{
historyFindByCondition(page).then(res =>{
    list.value = res.data.list;
    total.value = res.data.total;
  })
  }
}
const onPageSizeChange  = (size) =>{
  pageForm.pageSize = size;
  findForm.pageSize = size;
}
const onCurrentChange = (index,pageInfo) => {
   pageForm.pageNo = index;
   findForm.pageNo = index
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
const formatValue = (value) => {
  return parseFloat(value).toFixed(2);
};
const columns = ref([
  { title: "名字", colKey: "name", width: "80px" },
  { title: "分类", colKey: "type", width: "80px" },
  { title: "创建时间", colKey: "time", width: "230px" },
  { title: "氨气浓度（%）", colKey: "ammonia", width: "140px" },
  { title: "光照强度（Lux）", colKey: "beam", width: "140px" },
  { title: "CO2浓度（ppm）", colKey: "co2", width: "140px" },
  { title: "湿度（%）", colKey: "humidity", width: "140px" },
  { title: "音频水平（db）", colKey: "noise", width: "130px" },
  { title: "氧气浓度（%）", colKey: "oxygen", width: "130px" },
  { title: "温度（℃）", colKey: "temperature", width: "130px" },
  { title: "警告", colKey: "warningType", width: "150px" },
]);
const formatNumber = (number) => {
  return Number(number).toFixed(2);
};
// 查询所有数据
const getHistory = async () => {
  // try {
  //   const response = await historyFindAll({});

  //   list.value = response.data.list;
  //   total.value = response.data.total;
  //   console.log(response.data);
  // } catch (error) {
  //   console.log(error);
  // }
   historyFindAll(pageForm).then(res =>{
    list.value = res.data.list;
    total.value = res.data.total;
  })
};

// 条件查询
const findByCondition = () => {
  historyFindByCondition(findForm).then((res) => {
    console.log(res);
    list.value = res.data.list;
      total.value = res.data.total;
  });
};
// 名字查询
const findByName = () => {
  historyFindByName(findForm).then((res) => {
    console.log(res);
    list.value = res.data.list;
      total.value = res.data.total;
  });
};

onMounted(() => {
  getHistory();
  getAllType();
});
</script>
<style lang="scss" scoped>
.tdesign-demo-block-column {
  width: 80%;
  .label {
    display: inline-block;
    // padding-top: 10px;
  }
}
.warn-text {
  color: red;
}
</style>
