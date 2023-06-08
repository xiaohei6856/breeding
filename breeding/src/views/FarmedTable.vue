<template>
  <div class="tdesign-demo-block-column" style="width: 100%; max-width: 100%">
    <t-card>
      <div class="label">
        <span style="display: inline-block; padding-top: 10px">分类：</span>
      </div>

      <t-tagInput style="width: 240px; display: inline-block" />
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
import { ref, computed } from "vue";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
} from "tdesign-icons-vue-next";
const list = ref([
  {
    name: "张三",
    type: "男",
    equipment: "24",
    create_time: "2023.04.03",
    incubation_period: "是",
  },
]);
const columns = ref([
  { title: "名字", colkey: "name" },
  { title: "分类", colkey: "type" },
  { title: "设备", colkey: "equipment" },
  { title: "创建时间", colkey: "create_time" },
  { title: "是否育成期", colkey: "incubation_period" },
]);

const tableLayout = ref("fixed");
const emptyData = ref(false);

const tableRef = ref(null);
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
