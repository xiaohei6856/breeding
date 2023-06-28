<template>
 <div class="tdesign-demo-block-column" style="width: 1020px; max-width: 100%">
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
          @click="getByTypes"
          >{{ item }}</t-option
        >
      </t-select>
    
    </t-card>
    <t-card>
      <t-table :columns="columns" :table-content-width="tableLayout === 'fixed' ? undefined : '1600px'" :data="list" :rowKey="list.id">
        <template #operation="{ row }">
          <t-link
            theme="primary"
            hover="color"
            style="width: 50px"
            @click="delRow(row)"
          >
            删除
          </t-link>
        </template>
        <template #default="{ row }">
      <td>{{ row.ammonia.toFixed(2) }}</td>
    </template>
      </t-table>
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { historyFindAll, historyFindByCondition } from '@/apis/historyapi.js'
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";


const list = ref([]);
const tableLayout = ref("fixed");
const emptyData = ref(false);
const findForm = reactive({
  pageNo:1,
  pageSize:20,
  type:""
})
const tableRef = ref(null);
const columns = ref([
  { title: "名字", colKey: "name" },
  { title: "分类", colKey: "type" },
  { title: "创建时间", colKey: "time",width:"240px"},
  { title: "氨气浓度（%）", colKey: "ammonia",width:"150px"},
  { title: "光照强度（Lux）", colKey: "beam",width:"150px" },
  { title: "CO2浓度（ppm）", colKey: "co2",width:"150px" },
  { title: "湿度（%）", colKey: "humidity" ,width:"150px"},
  { title: "音频水平（db）", colKey: "noise" ,width:"150px"},
  { title: "氧气浓度（%）", colKey: "oxygen" ,width:"150px"},
  { title: "温度（℃）", colKey: "temperature" ,width:"150px"},
  { title: "警告", colKey: "warningType" ,width:"150px"},
  { title: "操作", colKey: "operation", fixed: "right",width:"50px" },
]);
  const formatNumber = (number) => {
      return Number(number).toFixed(2);
    };
// 查询所有数据
const getHistory = async () => {
  try {
    const response = await historyFindAll({});
    list.value = response.data.list;
    console.log(response.data.list);
  } catch (error) {
    console.log(error);
  }
};

onMounted(()=>{
  getHistory()
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
