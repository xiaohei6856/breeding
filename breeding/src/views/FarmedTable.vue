<template>
  <div class="tdesign-demo-block-column" style="width: 100%; max-width: 100%">
    <t-card>
      <div class="label">
        <span style="display: inline-block; padding-top: 10px">分类：</span>
      </div>

      <t-select  v-model="selectValue" style="width: 240px; display: inline-block">
          <t-option v-for="(item,key) in type" :key="key" :value="item" @click="getByTypes">{{item}}</t-option>
        </t-select>
    </t-card>
    <t-card>
      <t-table
        row-key="index"
        :data="list"
        :columns="columns"

        bordered
        resizable
      >
        <!-- <template #operation="{ row }">
        <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
          {{ row.status === 0 ? "查看详情" : "再次申请" }}
        </t-link>
      </template> -->
      </t-table>
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed,onMounted,watch} from "vue";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";

import {farmFindAll} from "@/apis/farmedapi";
import {farmGetTypes} from "@/apis/farmedapi";

const list =ref([]);
const columns = ref([
  { title: "名字", colKey: "name" },
  { title: "分类", colKey: "type" },
  { title: "设备", colKey: "type" },
  { title: "创建时间", colKey: "time" },
  { title: "是否育成期", colKey: "growing" },
]);

const tableLayout = ref("fixed");
const emptyData = ref(false);

const tableRef = ref(null);
const type = ref([])
const selectValue = ref("");

// 查询所有数据
const getHouses = async () => {
      try {
        const response = await farmFindAll({})
        list.value = response.data.list;
        console.log(response.data.list);
      } catch (error) {
        console.log(error)
      }
    };

// 查询所有类型
const getAllType = async() =>{
  try {
    const response = await farmGetTypes({})
    type.value = response.data;
    console.log(response);
    } catch (error) {
    
  }
}

// 根据分类查询
const getByTypes = () =>{
  console.log(`当前选中的值为：${selectValue.value}`);
}
onMounted(() => {
  getHouses();
  getAllType();
  getByTypes();
})
</script>
<style lang="scss"  scoped>
.tdesign-demo-block-column {
  width: 100%;
  .label {
    display: inline-block;
    // padding-top: 10px;
  }
}
</style>
