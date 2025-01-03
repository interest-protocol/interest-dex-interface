import {
  FA_ADDRESSES,
  FUNGIBLE_ASSETS,
  Network,
} from '@interest-protocol/aptos-sr-amm';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { withAddressGuard } from '@/components/hoc';
import { Routes, RoutesEnum } from '@/constants';
import { PoolPageProps } from '@/interface';
import { parseToMetadata } from '@/utils';
import { FAMetadata } from '@/utils/coin/coin.types';
import PoolDetails from '@/views/pool-details';
import { PoolDetailsProvider } from '@/views/pool-details/pool-details.context';
import { IPoolForm } from '@/views/pools/pools.types';

const PoolDetailsPage: NextPage<PoolPageProps> = ({ address }) => {
  const form = useForm<IPoolForm>({
    defaultValues: {
      tokenList: [
        {
          ...parseToMetadata(
            FUNGIBLE_ASSETS[Network.Porto][
              FA_ADDRESSES[Network.Porto].APT.toString()
            ] as FAMetadata
          ),
          value: '',
        },
        {
          ...parseToMetadata(
            FUNGIBLE_ASSETS[Network.Porto][
              FA_ADDRESSES[Network.Porto].USDC.toString()
            ] as FAMetadata
          ),
          value: '',
        },
      ],
      pool: {
        poolAddress: address,
      },
      settings: { slippage: '0.1' },
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pool Details" />
      <PoolDetailsProvider address={address}>
        <PoolDetails />
      </PoolDetailsProvider>
    </FormProvider>
  );
};

export default withAddressGuard(Routes[RoutesEnum.Pools])(PoolDetailsPage);
