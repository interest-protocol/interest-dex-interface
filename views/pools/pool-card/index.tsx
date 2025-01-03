import { Box } from '@interest-protocol/ui-kit';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum } from '@/constants';
import { FixedPointMath } from '@/lib';

import { POOL_DATA } from '../pool.data';
import { LINES } from './pool-card.data';
import { FormFilterValue, PoolCardProps } from './pool-card.types';
import PoolCardHeader from './pool-card-header';
import PoolCardInfo from './pool-card-info';
import PoolCardTrade from './pool-card-trade';

const PoolCard: FC<PoolCardProps> = ({ pool }) => {
  const [poolData, setPoolData] = useState<ReadonlyArray<string>>([
    '0.3%',
    'N/A',
  ]);

  useEffect(() => {
    setPoolData((data) => [
      data[0],
      `${FixedPointMath.toNumber(BigNumber(String(pool.bidLiquidity)), pool.metadata.pool.decimals)}`,
    ]);
  }, []);

  return (
    <Link
      href={`${Routes[RoutesEnum.PoolDetails]}?address=${pool.poolAddress}`}
    >
      <Box
        p="m"
        flex="1"
        gap="xs"
        height="100%"
        display="flex"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        borderColor="outlineVariant"
        justifyContent="space-between"
        transition="all 300ms ease-in-out"
        nHover={{
          cursor: 'pointer',
          borderColor: '#76767A',
          boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
          '.arrow-wrapper': { opacity: 1 },
        }}
      >
        <PoolCardHeader
          tags={[
            'SR-AMM',
            FormFilterValue['volatile'],
            POOL_DATA.filter(
              ({ poolAddress }) => poolAddress == pool.poolAddress
            ).length
              ? 'FARM'
              : '',
          ]}
        />
        <PoolCardInfo
          key={v4()}
          coins={pool ? [pool.metadata.x, pool.metadata.y] : []}
        />
        <Box px="m" py="xs" bg="surface" borderRadius="1rem">
          {LINES.map((line, index) => (
            <PoolCardTrade
              {...line}
              key={v4()}
              index={index}
              amount={poolData[index] ?? 'N/A'}
            />
          ))}
        </Box>
      </Box>
    </Link>
  );
};

export default PoolCard;
