import { Dispatch, SetStateAction } from 'react';

import { EarnTabEnum } from '../earn.types';

export interface SearchMobileProps {
  handleClose: () => void;
  showSearchView: boolean;
}

export interface HeaderProps {
  setTab: Dispatch<SetStateAction<EarnTabEnum>>;
  currentTab: EarnTabEnum;
}
