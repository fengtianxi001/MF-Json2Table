<template>
  <Button>
    <template v-if="icon" #icon>
      <component :is="icon" />
    </template>
    <template #default>{{ text }}</template>
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@arco-design/web-vue'

interface PropsType {
  icon?: any
  text: string
}
defineProps<PropsType>()
</script>
