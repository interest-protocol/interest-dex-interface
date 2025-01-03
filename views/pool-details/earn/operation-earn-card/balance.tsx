import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { SubtractBoxSVG } from '@/components/svg';
import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { ZERO_BIG_NUMBER } from '@/utils';

import { OperationEarnCardProps } from './operation-card.types';

const OperationEarnCardBalance: FC<Pick<OperationEarnCardProps, 'token'>> = ({
  token,
}) => {
  const { coinsMap } = useCoins();

  const balance = coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER;
  return (
    <>
      <Box color="onSurface" display="flex" gap="xs">
        <Box width="1rem" height="1rem">
          <SubtractBoxSVG
            maxHeight="100%"
            maxWidth="100%"
            width="100%"
            height="100%"
          />
        </Box>
        <Typography
          size="small"
          variant="body"
          fontSize="0.875rem"
          whiteSpace="nowrap"
        >
          {FixedPointMath.toNumber(balance, token.decimals) ?? '--'}{' '}
          {token.symbol}
        </Typography>
      </Box>
    </>
  );
};

export default OperationEarnCardBalance;
