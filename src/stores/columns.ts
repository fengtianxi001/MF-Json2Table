import { useLocalStorageState } from '@/hooks/useLocalStorageState'

interface ColumnType {
  name: string
  label: string
  isFilter: '是' | '否'
  valueType: 'RangePicker' | 'Input'
}

export const columns = useLocalStorageState<ColumnType[]>('app-columns', {
  defaultValue: [],
})
