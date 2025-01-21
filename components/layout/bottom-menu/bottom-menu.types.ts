import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export interface SwapBottomMenuItemProps {
  symbol: string;
  iconUri: string;
  usdPrice: string;
  onClick: () => void;
}

export interface BottomNavListItemProps {
  name: string;
  path?: string | undefined;
  Icon: FC<SVGProps>;
  onClick?: () => void;
}

export interface BottomMenuProps {
  name: string;
  path?: string;
  Icon: FC<SVGProps>;
}
