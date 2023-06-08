<template>
  <div class="tdesign-demo-block-column" style="width: 100%; max-width: 800px">
    <t-table
      ref="tableRef"
      row-key="index"
      :data="tableData"
      :columns="columns"
      :table-layout="tableLayout"
      :table-content-width="tableLayout === 'fixed' ? undefined : '1200px'"
      bordered
      resizable
    >
      <template #operation="{ row }">
        <t-link theme="primary" hover="color" @click="rehandleClickOp(row)">
          {{ row.status === 0 ? "查看详情" : "再次申请" }}
        </t-link>
      </template>
    </t-table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";
const tableData = ref([
  {name:"张三",gender:"男",age:"24"},
  {name:"李四",gender:"男",age:"16"},
])
const columns = ref([
  {title:"姓名",colKey:"name"},
  {title:"性别",colKey:"gender"},
  {title:"年龄",colKey:"age"}
])


const tableLayout = ref("fixed");
const emptyData = ref(false);

const tableRef = ref(null);
</script>
<style  scoped>
.tdesign-demo-block-column {
  width: 100%;
}
</style>
