import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { AsteriskSVG } from '@/components/svg';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import useExposedCoins from '@/hooks/use-exposed-coins';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

import BottomMenuItem from './swap-top-slider-item';

const label = 'to';

const SwapTopSlider: FC = () => {
  const { setValue, getValues } = useFormContext();
  const { exposedCoins } = useExposedCoins();

  const onSelect = async (metadata: AssetMetadata) => {
    const [currentToken, opposite] = getValues([label, 'from']);

    if (
      (metadata.standard == TokenStandard.FA
        ? metadata.type
        : COIN_TYPE_TO_FA[metadata.type].toString()) ==
      (opposite.standard == TokenStandard.FA
        ? opposite.type
        : COIN_TYPE_TO_FA[opposite.type].toString())
    )
      return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    ) {
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });
    }

    setValue(label, {
      ...metadata,
      value: '',
      usdPrice: null,
      valueBN: ZERO_BIG_NUMBER,
    });

    if (PRICE_TYPE[metadata.symbol])
      fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
        method: 'POST',
        body: JSON.stringify({ coins: [PRICE_TYPE[metadata.symbol]] }),
        headers: { 'Content-Type': 'application/json', accept: '*/*' },
      })
        .then((response) => response.json())
        .then((data) => setValue(`${label}.usdPrice`, data[0].price))
        .catch(() => null);
  };

  return (
    <Box px="m" display={['flex', 'flex', 'flex', 'none', 'none']}>
      <Box
        py="s"
        gap="l"
        width="100%"
        display="flex"
        overflowX="scroll"
        alignItems="center"
        scrollbarWidth="none"
        backdropFilter="blur(40px)"
        scrollSnapType="x mandatory"
        WebkitBackdropFilter="blur(40px)"
      >
        {exposedCoins.map((token, index) => (
          <>
            <Box key={index}>
              <BottomMenuItem
                usdPrice={token.usd}
                symbol={token.symbol}
                iconUri={token.iconUri}
                onClick={() =>
                  onSelect(parseToMetadata(token as MetadataSources))
                }
              />
            </Box>
            {index !== exposedCoins.length - 1 && (
              <Box
                alignItems="center"
                display="inline-flex"
                flexDirection="column"
                justifyContent="center"
              >
                <AsteriskSVG maxHeight="1rem" maxWidth="1rem" width="1rem" />
              </Box>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default SwapTopSlider;
