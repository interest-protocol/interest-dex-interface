import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { TOKENS } from '@/constants/coin-fa';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { CoinMetadata, FAMetadata } from '@/utils/coin/coin.types';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';
import SwapInitManager from '@/views/swap/swap-init-manager';

const SwapPage: NextPage = () => {
  const form = useForm<SwapForm>({
    defaultValues: {
      from: {
        ...TOKENS.map((metadata) =>
          parseToMetadata(metadata as CoinMetadata | FAMetadata)
        ).filter((token) => token.symbol == 'faMOVE')[0],
        value: '',
        usdPrice: null,
        valueBN: ZERO_BIG_NUMBER,
      },
      to: {
        ...TOKENS.map((metadata) =>
          parseToMetadata(metadata as CoinMetadata | FAMetadata)
        ).filter((token) => token.symbol == 'faUSDC')[0],
        value: '',
        usdPrice: null,
        valueBN: ZERO_BIG_NUMBER,
      },
      settings: {
        slippage: '1',
      },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Trade" />
      <SwapInitManager />
      <Swap />
    </FormProvider>
  );
};

export default SwapPage;
