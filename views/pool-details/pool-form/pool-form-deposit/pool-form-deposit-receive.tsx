import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IPoolForm } from '@/views/pools/pools.types';

const PoolFormDepositReceive: FC = () => {
  const { control } = useFormContext<IPoolForm>();
  const value = useWatch({ control, name: 'lpCoin.value' });
  const symbol = useWatch({ control, name: 'lpCoin.symbol' });

  return (
    <Box>
      <Typography variant="body" size="large" mb="m">
        You will receive (estimated):
      </Typography>
      <Box borderRadius="xs" bg="lowestContainer" py="xs">
        <Box
          py="xs"
          px="m"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body" size="large">
            {symbol}
          </Typography>
          <Typography variant="body" ml="m" size="large">
            {value || 0}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PoolFormDepositReceive;
