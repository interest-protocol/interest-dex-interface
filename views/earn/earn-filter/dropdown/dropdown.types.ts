import { FilterItemProps, FilterTypeEnum } from '../../earn.types';

export interface DropdownProps {
  label?: string;
  disabled?: boolean;
  type: FilterTypeEnum;
  filterData: ReadonlyArray<FilterItemProps>;
}
