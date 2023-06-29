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
                v-for="(item, key) in typeList"
                :key="key"
                :value="item.id"
                :label="item.type"
                @click="getByTypes()"
                >{{ item.type }}</t-option
              >
      </t-select>
        <t-button theme="primary" style="margin-left: 20px" @click="showAddForm">
        <template #icon><add-icon /></template>
        增加
      </t-button>

      <t-dialog
        v-model:visible="addFormVisible"
        header="添加养殖舍"
        :on-cancel="onCancel"
        :on-close="close"
        :on-confirm="addFormButton"
      >
        <t-form :data="addForm">
          <t-form-item label="设备名称">
            <t-input
              v-model="addForm.name"
              placeholder="请输入内容"
              style="width: 76%"
            ></t-input>
          </t-form-item>
          <t-form-item label="设备类型">
            <t-select
              v-model="addForm.type"
              style="width: 240px; display: inline-block"
            >
             <t-option
                v-for="(item, key) in typeList"
                :key="key"
                :value="item.id"
                :label="item.type"
                >{{ item.type }}</t-option
              >
            </t-select>
          </t-form-item>
        </t-form>
      </t-dialog>
    
    </t-card>
    <t-card>
      <t-table :columns="columns" :data="list" :rowKey="list.id">
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
      <!-- <td>{{ row.ammonia.toFixed(2) }}</td> -->
      </t-table>
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { historyFindAll, historyFindByCondition } from '@/apis/historyapi.js'
import {deviceFindAll,deviceAdd, deviceDel,deviceFindByType,getAllDevice} from '@/apis/deviceapi'
import { farmGetTypes } from "@/apis/farmedapi";
import { MessagePlugin } from "tdesign-vue-next";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
  AddIcon,
} from "tdesign-icons-vue-next";

const typeList = ref([]);
const list = ref([]);
const addFormVisible = ref(false);
const findForm = reactive({
  pageNo:1,
  pageSize:20,
  type:""
})
const addForm = reactive({
  time: "",
  name: "",
  type: "",
});
const tableRef = ref(null);
const columns = ref([
  { title: "设备名称", colKey: "deviceName" },
  { title:"设备种类", colKey:"deviceType" },
  { title: "操作", colKey: "operation", width:"60px" },
]);
// 查询所有数据
const getDevice = async () => {
  try {
    const response = await getAllDevice({});
    console.log(response);
    list.value = response.data.list;
  } catch (error) {
    console.log(error);
  }
};
const getAllType = async () => {
  try {
    const response = await deviceFindAll({});
    typeList.value = response.data;

  } catch (error) {}
};
// 根据分类查询
const getByTypes = () => {
    console.log(findForm);
  deviceFindByType(findForm).then(res =>{
    list.value = res.data
    console.log(res.data);
  })
};
// 删除设备
const delRow = (row) => {
  console.log(row.deviceId);
  const params = reactive({
    id:row.deviceId
  })
  deviceDel(params).then(res => {
  console.log(res);
    if(res.code === 20000){
      MessagePlugin.error("删除成功")
      getDevice();
    }
  })
};

// 添加设备
const showAddForm = () => {
  addFormVisible.value = true;
};
const close = () => {
  addFormVisible.value = false;
};
const onCancel = () => {
  addFormVisible.value = false;
};
const addFormButton = async () => {
  addFormVisible.value = false;
  deviceAdd(addForm).then(res =>{
    if(res.code === 20000){
    MessagePlugin.success("添加成功");
    addForm.growing = "";
    addForm.name = "";
    addForm.type = "";
    getDevice();
    }

  })
}

onMounted(()=>{
  getDevice();
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
