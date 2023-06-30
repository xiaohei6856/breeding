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
          @click="getByTypes"
          >{{ item }}</t-option
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
          <t-form-item label="养殖舍名称">
            <t-input
              v-model="addForm.name"
              placeholder="请输入内容"
              style="width: 76%"
            ></t-input>
          </t-form-item>
          <t-form-item label="养殖舍类型">
            <t-select
              v-model="addForm.type"
              style="width: 240px; display: inline-block"
            >
              <t-option
                v-for="(item, key) in type"
                :key="key"
                :value="item"
                >{{ item }}</t-option
              >
            </t-select>
          </t-form-item>
          <t-form-item label="是否育成期">
            <t-radio-group v-model="addForm.growing">
              <t-radio value="0">是</t-radio>
              <t-radio value="1">否</t-radio>
            </t-radio-group>
          </t-form-item>
        </t-form>
      </t-dialog>
    </t-card>
    <t-card>
      <t-table :columns="columns" width="90%" :data="list" :rowKey="list.id" style="margin-bottom:15px;">
        <t-column title="名字" colKey="name"></t-column>
        <t-column title="分类" colKey="type"></t-column>
        <t-column title="创建时间" colKey="time"></t-column>
        <t-column title="是否育成期" colKey="growing"></t-column>
        <t-column title="操作" colKey="operation"></t-column>
        <template #operation="{ row }">
          <t-link
            theme="primary"
            hover="color"
            style="width: 50px"
            @click="delRow(row)"
          >
            删除
          </t-link>
          <t-link theme="primary" hover="color" @click="showOperationForm(row);" >
            操作
          </t-link>
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
        <t-dialog
        v-model:visible="operationFormVisible"
        header="修改养殖舍"
        :on-cancel="onCancel"
        :on-close="close"
        :on-confirm="updateRow"
      >
        <t-form :data="operationForm">
          <t-form-item label="养殖舍名称">
            <t-input
              v-model="operationForm.name"
              placeholder="请输入内容"
              style="width: 76%"
            ></t-input>
          </t-form-item>
          <t-form-item label="养殖舍类型">
            <t-select
              v-model="operationForm.type"
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
          </t-form-item>
          <t-form-item label="是否育成期">
            <t-radio-group v-model="operationForm.growing">
              <t-radio value="0">是</t-radio>
              <t-radio value="1">否</t-radio>
            </t-radio-group>
          </t-form-item>
        </t-form>
      </t-dialog>
    </t-card>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import {
  ErrorCircleFilledIcon,
  CheckCircleFilledIcon,
  CloseCircleFilledIcon,
  AddIcon,
} from "tdesign-icons-vue-next";

import { farmFindAll, farmAdd ,farmDel,farmFindByType,farmModify} from "@/apis/farmedapi";
import { farmGetTypes } from "@/apis/farmedapi";
import { MessagePlugin } from "tdesign-vue-next";

const list = ref([]);
const columns = ref([
  { title: "名字", colKey: "name" },
  { title: "分类", colKey: "type" },
  { title: "创建时间", colKey: "time" },
  { title: "是否育成期", colKey: "growing" },
  { title: "操作", colKey: "operation", fixed: "right" },
]);

const type = ref([]);
const addFormVisible = ref(false);
const operationFormVisible = ref(false)
const total = ref(0);
const currentPage = ref(1)
const pageForm = reactive({
  pageNo:1, //当前页码数
  pageSize:10 //每页显示的记录数
})
const addForm = reactive({
  growing: "",
  name: "",
  type: "",
});
const operationForm = reactive({
  id:0,
  growing: "",
  name: "",
  type: "",
});
const findForm = reactive({
  pageNo:1,
  pageSize:20,
  type:""
})

const handlePaginationChange = (pageInfo) =>{
  const page = reactive({
    pageNo:pageInfo.current,
    pageSize:pageInfo.pageSize,
    type:findForm.type
  })
   if (page.type === "") {
    farmFindAll(page).then((res) => {
      list.value = res.data.list;
      total.value = res.data.total;
    });
  } else {
    farmFindByType(page).then((res) => {
      list.value = res.data;
      total.value = res.data.length;
    });
  }
}
const onPageSizeChange  = (size) =>{
  pageForm.pageSize = size;
    findForm.pageSize = size;
}
const onCurrentChange = (index,pageInfo) => {
      findForm.pageNo = index
   pageForm.pageNo = index
}
// 查询所有数据
const getHouses = async () => {
  farmFindAll(pageForm).then(res =>{
    list.value = res.data.list;
    total.value = res.data.total;
  })
};

// 查询所有类型
const getAllType = async () => {
  try {
    const response = await farmGetTypes({});
    type.value = response.data;
    console.log(response.data);
  } catch (error) {}
};

// 根据分类查询
const getByTypes = () => {
    console.log(findForm);
  farmFindByType(findForm).then(res =>{
    list.value = res.data.list
    total.value = res.data.total;
  })
};

// 点击增加
const showAddForm = () => {
  addFormVisible.value = true;
};
const close = () => {
  addFormVisible.value = false;
   operationFormVisible.value = false
};
const onCancel = () => {
  addFormVisible.value = false;
   operationFormVisible.value = false
};
const addFormButton = async () => {
  addFormVisible.value = false;
  farmAdd(addForm).then(res =>{
    if(res.code === 20000){
    MessagePlugin.success("添加成功");
    addForm.growing = "";
    addForm.name = "";
    addForm.type = "";
    getHouses();
    }

  })
 
};
// 删除养殖舍
const delRow = (row) => {
  const data = reactive({
    id:row.id
  })
  farmDel(data).then(res => {
    if(res.code === 20000){
      MessagePlugin.error("删除成功")
      getHouses();
    }
  })
};

// 点击出现操作弹窗
const showOperationForm = (row) =>{
  operationFormVisible.value = true
  operationForm.id = row.id
  operationForm.growing = row.growing;
  operationForm.name = row.name;
  operationForm.type = row.type;

}
const updateRow = (row) =>{
  farmModify(operationForm).then(res =>{
    if (res.code === 20000) {
       MessagePlugin.success("修改成功");
        operationFormVisible.value = false;
       getHouses();
    }
  })
}

onMounted(() => {
  getHouses();
  getAllType();
});
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
