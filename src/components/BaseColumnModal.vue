<template>
  <Link @click="visible = true">列设置</Link>
  <Modal
    v-model:visible="visible"
    title="列设置"
    width="1000px"
    :footer="false"
    :mask-closable="false"
  >
    <div style="margin-bottom: 10px">
      <Button type="primary" @click="actions.onCreate">新增一行</Button>
    </div>
    <BaseTable
      :columns="columns"
      :data="source"
      :pagination="false"
      style="min-height: 400px"
    >
      <template #name="{ rowIndex }">
        <Input v-model="source[rowIndex].name" />
      </template>
      <template #label="{ rowIndex }">
        <Input v-model="source[rowIndex].label" />
      </template>
      <template #isFilter="{ rowIndex }">
        <Select v-model="source[rowIndex].isFilter">
          <Option key="是">是</Option>
          <Option key="否">否</Option>
        </Select>
      </template>
      <template #valueType="{ rowIndex }">
        <Select v-model="source[rowIndex].valueType">
          <Option value="RangePicker">时间</Option>
          <Option value="Input">其他</Option>
        </Select>
      </template>
      <template #actions="{ rowIndex }">
        <Link @click="actions.onDelete(rowIndex)">删除</Link>
      </template>
    </BaseTable>
  </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  Link,
  Modal,
  Input,
  Select,
  Switch,
  Option,
} from '@arco-design/web-vue'
import BaseTable from '@/components/BaseTable.vue'
import { columns as source } from '@/stores/columns'

const visible = ref(false)

const columns = [
  {
    title: '字段名',
    dataIndex: 'name',
    slotName: 'name',
  },
  {
    title: '显示标签',
    dataIndex: 'label',
    slotName: 'label',
  },
  {
    title: '是否为筛选条件',
    dataIndex: 'isFilter',
    slotName: 'isFilter',
  },
  {
    title: '字段类型',
    dataIndex: 'valueType',
    slotName: 'valueType',
  },
  {
    title: '操作',
    align: 'center',
    slotName: 'actions',
  },
]

const actions = {
  onCreate() {
    source.value.push({
      name: '',
      label: '测试',
      isFilter: '否',
      valueType: 'Input',
    })
  },
  onDelete(index: number) {
    source.value.splice(index, 1)
  },
}
</script>
<style lang="scss" scoped></style>
