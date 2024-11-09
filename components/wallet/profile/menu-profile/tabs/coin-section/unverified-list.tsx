import { COINS, Network } from '@interest-protocol/aptos-sr-amm';
import { values } from 'ramda';
import { FC } from 'react';
import { v4 } from 'uuid';

import { TokenStandard } from '@/lib/coins-manager/coins-manager.types';

import Collapse from './coin-card/collapse';
import UnverifiedCoinCard from './coin-card/unverified';

const UnverifiedCoinList: FC = () => (
  <Collapse title={`${values(COINS[Network.Porto]).length} unverified coins`}>
    {values(COINS[Network.Porto]).map((coin) => (
      <UnverifiedCoinCard
        key={v4()}
        token={{
          ...coin,
          standard: TokenStandard.COIN,
        }}
      />
    ))}
  </Collapse>
);

export default UnverifiedCoinList;