<template>
  <Table
    class="base-table"
    column-resizable
    :columns="cols"
    :data="data"
    :bordered="{ cell: true }"
    :class="{ empty: isEmpty(data) }"
    :pagination="{
      showPageSize: true,
    }"
  >
    <template v-for="(_, scopeSlotName) in $slots" #[scopeSlotName]="scope">
      <slot :name="scopeSlotName" v-bind="scope" />
    </template>
  </Table>
</template>
<script setup lang="ts">
import { Table } from '@arco-design/web-vue'
import { isEmpty } from 'lodash'
import { computed } from 'vue'

interface PropsType {
  columns: any[]
  data: any[]
}
const props = defineProps<PropsType>()
const cols = computed(() => [
  {
    title: '',
    width: 50,
    align: 'center',
    render: ({ rowIndex }: any) => rowIndex + 1,
  },
  ...props.columns,
])
</script>
<style lang="scss">
.base-table {
  .arco-table-container {
    border-radius: 0 !important;
  }

  &:not(.empty) {
    .arco-table-tr {
      .arco-table-td:first-child {
        background-color: var(--color-neutral-2);
      }
    }
  }
}
</style>
