import { Box } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import PoolTitleBar from '../components/pool-title-bar';
import { IPoolForm, PoolOption } from '../pools/pools.types';
import PoolForm from './pool-form';
import PoolInfo from './pool-info';

const PoolDetails: FC = () => {
  const { push } = useRouter();
  const form = useFormContext<IPoolForm>();
  const [poolOptionView, setPoolOptionView] = useState<PoolOption>(
    PoolOption.Deposit
  );

  useEffect(() => {
    form.resetField('lpCoin.value');
    form.resetField('lpCoin.valueBN');
    form.resetField('tokenList.0.value');
    form.resetField('tokenList.0.valueBN');
    form.resetField('tokenList.1.value');
    form.resetField('tokenList.1.valueBN');
  }, [poolOptionView]);

  const handleOptionTab = (index: PoolOption) => setPoolOptionView(index);

  return (
    <Layout>
      <PoolTitleBar onBack={() => push(Routes[RoutesEnum.Pools])} />
      <Box
        gap="xs"
        mx="auto"
        maxWidth="65rem"
        overflow="hidden"
        flexDirection="column"
        gridTemplateColumns="3fr 2fr"
        display={['flex', 'flex', 'flex', 'grid']}
        alignItems={['unset', 'unset', 'unset', 'start']}
      >
        <PoolForm
          poolOptionView={poolOptionView}
          handleOptionTab={handleOptionTab}
        />
        <PoolInfo />
      </Box>
    </Layout>
  );
};

export default PoolDetails;
