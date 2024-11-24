export enum FilterTypeEnum {
  CATEGORY = 'category',
}

export enum FormFilterValue {
  'official' = 'official',
  'all' = 'all',
}

export enum EarnTabEnum {
  Earn,
  MyPosition,
}

export interface FilterItemProps {
  type: FilterTypeEnum;
  value: FormFilterValue;
}
