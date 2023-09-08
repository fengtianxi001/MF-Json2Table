<template>
  <div class="page">
    <BaseCard title="JSON-2-TABLE">
      <template #extra>
        <BaseColumnModal :data="data" />
      </template>
      <BaseFilter
        v-if="!isEmpty(filterConfigs)"
        v-model="filter"
        :configs="filterConfigs"
        :query="query"
      />
      <div>
        <Button type="primary" @click="actions.onImport">导入数据</Button>
      </div>
      <BaseTable :columns="columns" :data="data" />
    </BaseCard>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button, Message } from '@arco-design/web-vue'
import { columns as source } from '@/stores/columns'
import BaseCard from '@/components/BaseCard.vue'
import BaseFilter from '@/components/BaseFilter.vue'
import BaseColumnModal from '@/components/BaseColumnModal.vue'
import BaseTable from '@/components/BaseTable.vue'
import { first, isArray, isEmpty, isObject, map, sample } from 'lodash'
import dayjs from 'dayjs'

const filter = ref<any>({})
const filterConfigs = computed<any[]>(() => {
  const cache = source.value.filter((item) => item.isFilter === '是')
  return cache.map((item) => ({
    name: item.name,
    component: item.valueType,
    label: item.label,
  }))
})

const total = ref<any[]>([])
const data = ref<any[]>([])
const query = async () => {
  const filterMethods: any = {
    Input: (source: any, key: any, value: any) =>
      source.filter((item: any) => {
        if (!value) {
          return true
        }
        return item[key] === value
      }),
    RangePicker: (source: any, key: any, value: any) =>
      source.filter((item: any) => {
        const t = item[key]
        if (isArray(value)) {
          const [start, end] = value
          if (!start || !end) {
            return true
          }
          return dayjs(t).isAfter(dayjs(start)) && dayjs(t).isBefore(dayjs(end))
        }
        return true
      }),
  }
  let cache = [...total.value]
  filterConfigs.value.forEach((item: any) => {
    const value = filter.value[item.name]
    cache = filterMethods[item.component](cache, item.name, value)
    data.value = [...cache]
  })
  console.log('cache', cache)
}

const columns = computed(() => {
  const example = first(total.value) ?? {}
  const exampleKeys = Object.keys(example)
  return exampleKeys.map((key: string) => {
    const finder: any = source.value.find((config: any) => config.name === key)
    if (finder) {
      return {
        title: finder.label,
        dataIndex: finder.name,
        ellipsis: true,
        tooltip: true,
      }
    }
    return {
      title: key,
      dataIndex: key,
      ellipsis: true,
      tooltip: true,
    }
  })
})

const actions = {
  onImport() {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.onchange = (e: any) => {
      const { files } = e.target
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i]
        const reader = new FileReader()
        // eslint-disable-next-line no-loop-func
        reader.onload = (e: any) => {
          const contents = e.target.result
          const jsonData = JSON.parse(contents)
          console.log('jsonData', jsonData)
          if (isArray(jsonData)) {
            total.value = [...total.value, ...jsonData]
          } else if (isObject(jsonData)) {
            total.value.push(jsonData)
          } else {
            Message.error('数据格式出错')
          }
          if (isEmpty(filterConfigs.value)) {
            data.value = [...total.value]
          } else {
            query()
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  },
}
</script>
<style lang="scss">
.page {
  box-sizing: border-box;
  width: 100vw;
  min-height: 100vh;
  padding: 20px 100px;
  background-color: #f2f3f5;
}
</style>
