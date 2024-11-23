import { Control } from 'react-hook-form';

import { SwapForm } from '../swap.types';

export interface SwapMessagesProps {
  hasNoMarket: boolean;
  control: Control<SwapForm>;
}
