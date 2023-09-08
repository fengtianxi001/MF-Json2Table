<template>
  <div class="base-filter">
    <Form
      ref="form"
      class="base-filter-form"
      layout="inline"
      label-align="left"
      :model="dataSource"
      v-bind="$attrs"
    >
      <template v-for="config in props.configs" :key="config.name">
        <FormItem
          :field="config.name"
          :label="config.label"
          :name="config.name"
          v-bind="config.formItemProps"
        >
          <component
            :is="generateComponent(config)"
            v-model="dataSource[config.name]"
            :allow-clear="true"
            v-bind="config.props"
            style="width: 100%"
          />
        </FormItem>
      </template>
    </Form>
    <div class="base-filter-action">
      <BaseButton
        type="primary"
        text="筛选"
        :icon="IconSearch"
        :loading="searchLoading"
        :disabled="resetLoading"
        @click="onQuery"
      />
      <BaseButton
        type="primary"
        text="重置"
        :icon="IconRefresh"
        :loading="resetLoading"
        :disabled="searchLoading"
        @click="onReset"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconSearch, IconRefresh } from '@arco-design/web-vue/es/icon'
import { useLoading } from '@/hooks/useLoading'
import { ref, h, type StyleValue } from 'vue'
import { isFunction, isObject, isString } from 'lodash'
import { Form, FormItem, type FieldRule } from '@arco-design/web-vue'
import * as arco from '@arco-design/web-vue'
import BaseButton from './BaseButton.vue'

interface PropsType {
  modelValue: any
  configs: any[]
  grid?: number
  query: (params: any) => Promise<any>
}
const props = defineProps<PropsType>()
const emit = defineEmits(['update:modelValue'])

const dataSource = ref<any>({})

const {
  loading: searchLoading,
  openLoading: openSearchLoading,
  closeLoading: closeSearchLoading,
} = useLoading(false, 500)

const {
  loading: resetLoading,
  openLoading: openResetLoading,
  closeLoading: closeResetLoading,
} = useLoading(false, 500)

const onQuery = async () => {
  emit('update:modelValue', { ...dataSource.value })
  if (!isFunction(props.query)) return undefined
  openSearchLoading()
  await props.query({ current: 1 })
  closeSearchLoading()
  return undefined
}

const onReset = async () => {
  dataSource.value = {}
  emit('update:modelValue', dataSource.value)
  if (!isFunction(props.query)) return undefined
  openResetLoading()
  await props.query({ current: 1 })
  closeResetLoading()
  return undefined
}

const generateComponent = (config: any) => {
  const com: any = arco
  const { component } = config
  if (isObject(component)) return component
  if (isString(component)) return com[component]
  return h('span', '未知组件')
}
</script>
<style lang="scss">
.base-filter {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--color-neutral-2);

  .base-filter-form {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px 20px;

    .arco-form-item {
      margin: 0;
    }
  }

  .base-filter-action {
    display: flex;
    grid-gap: 12px;
    padding-left: 12px;
    margin-left: 12px;
    border-left: 1px solid var(--color-neutral-2);
  }
}
</style>
