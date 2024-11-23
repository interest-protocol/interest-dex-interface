import { FUNGIBLE_ASSETS, Network } from '@interest-protocol/aptos-sr-amm';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';
import Swap from '@/views/swap';
import { SwapForm } from '@/views/swap/swap.types';
import SwapInitManager from '@/views/swap/swap-init-manager';

const SwapPage: NextPage = () => {
  const form = useForm<SwapForm>({
    defaultValues: {
      from: {
        value: '',
        ...FUNGIBLE_ASSETS[Network.Porto].USDT,
        standard: TokenStandard.FA,
      },
      to: {
        ...FUNGIBLE_ASSETS[Network.Porto].USDC,
        standard: TokenStandard.FA,
        value: '0',
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
