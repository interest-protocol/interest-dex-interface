import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { noop } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import EarnInfoCardList from './info-card-list';
import OperationEarnCard from './operation-earn-card';

const Earn: FC = () => {
  const { getValues } = useFormContext<IPoolForm>();

  return (
    <>
      <EarnInfoCardList />
      <Box
        mt="s"
        gap="xs"
        mx="auto"
        p="2rem"
        bg="container"
        maxWidth="65rem"
        overflow="hidden"
        borderRadius="0.5rem"
        flexDirection="column"
        display="grid"
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr',
          '1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <OperationEarnCard
          type="staked"
          onPrimary={noop}
          onSecondary={noop}
          token={getValues('tokenList.0')}
        />
        <OperationEarnCard
          type="unstaked"
          onPrimary={noop}
          onSecondary={noop}
          token={getValues('tokenList.0')}
        />
        <OperationEarnCard
          type="rewards"
          onPrimary={noop}
          token={getValues('tokenList.1')}
        />
      </Box>
    </>
  );
};

export default Earn;
