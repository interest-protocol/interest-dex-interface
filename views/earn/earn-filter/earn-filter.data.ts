import { FilterTypeEnum, FormFilterValue } from '../earn.types';

export const CATEGORY = [
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.official,
  },
  {
    type: FilterTypeEnum.CATEGORY,
    value: FormFilterValue.all,
  },
];

export const FILTERS_DATA = [
  {
    label: 'Category',
    data: CATEGORY,
    type: FilterTypeEnum.CATEGORY,
  },
];
