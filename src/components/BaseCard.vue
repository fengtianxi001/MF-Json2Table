<template>
  <Spin :loading="loading" style="width: 100%; height: 100%">
    <Card class="base-card" v-bind="$attrs">
      <template #title>
        <slot name="title">{{ title }}</slot>
      </template>
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <div class="base-card-container">
        <slot></slot>
      </div>
    </Card>
  </Spin>
</template>
<script setup lang="ts">
import { Card, Spin, Empty } from '@arco-design/web-vue'
import { computed } from 'vue'
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon'

interface PropsType {
  title?: string
  loading?: boolean
}
defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-card {
  border: none;
  border-radius: 0;

  .base-card-container {
    display: grid;
    grid-gap: 12px;
    width: 100%;
    height: 100%;
  }

  :deep(.arco-card-header) {
    display: flex;
    align-items: center;
    height: auto;
    padding: 14px 20px 10px;
    border: none;
  }
}
</style>
