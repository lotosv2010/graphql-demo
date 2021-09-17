import {ProColumns} from '@ant-design/pro-table';
import {Product} from '../types';

const columns: ProColumns<Product>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '分类',
    dataIndex: 'categoryId',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {},
  },
  {
    title: '操作',
    valueType: 'option',
  },
];
export default columns;