import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

import { TokenIcon } from '@/components';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import useExposedCoins from '@/hooks/use-exposed-coins';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import { parseToMetadata, ZERO_BIG_NUMBER } from '@/utils';
import { MetadataSources } from '@/utils/coin/coin.types';

const label = 'to';

const MAX_COINS = 10;
const MAX_ATTEMPTS = 100;
const VALID_AREAS = [
  { top: 0, bottom: 40, left: 5, right: 25 },
  { top: 0, bottom: 40, left: 80, right: 80 },
];
const MIN_DISTANCE = 10;

const generatePosition = (
  area: { top: number; bottom: number; left: number; right: number },
  size: number,
  existingPositions: { top: number; left: number }[]
) => {
  const adjustedSize = size * 3;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const top =
      area.top +
      adjustedSize +
      Math.random() * (area.bottom - area.top - 2 * adjustedSize);
    const left =
      area.left +
      adjustedSize +
      Math.random() * (area.right - area.left - 2 * adjustedSize);

    const isValid = existingPositions.every(
      (pos) =>
        Math.sqrt(Math.pow(pos.top - top, 2) + Math.pow(pos.left - left, 2)) >
        MIN_DISTANCE
    );

    if (isValid) {
      return { top, left };
    }

    attempts++;
  }

  return null;
};

const SwapBackground: FC = () => {
  const { setValue, getValues } = useFormContext();
  const network = useNetwork<Network>();

  const { exposedCoins } = useExposedCoins();

  const positionsLeft: { top: number; left: number }[] = [];
  const positionsRight: { top: number; left: number }[] = [];

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

  const coins = exposedCoins.slice(0, MAX_COINS);
  const half = Math.ceil(coins.length / 2);
  const leftCoins = coins.slice(0, half);
  const rightCoins = coins.slice(half);

  return (
    <Box
      flex="1"
      mt="6rem"
      position="absolute"
      display={['none', 'none', 'none', 'block', 'block']}
    >
      {leftCoins.map((token) => {
        const size = Math.random() * 0.5 + 0.75;
        const area = VALID_AREAS[0];
        const position = generatePosition(area, size, positionsLeft);

        if (!position) return null;

        positionsLeft.push(position);

        return (
          <Motion
            gap="l"
            key={v4()}
            display="flex"
            cursor="pointer"
            initial="initial"
            whileHover="hover"
            position="absolute"
            animate={{ y: [-5, 5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
            top={`calc(${position.top}vh)`}
            left={`calc(${position.left}vw)`}
          >
            <Motion
              scale="1"
              filter="blur(10px)"
              variants={{
                initial: { y: 0 },
                hover: {
                  scale: [1, 1.25],
                  filter: 'blur(0px)',
                  transition: { duration: 0.3 },
                },
              }}
            >
              <Motion
                borderRadius="50%"
                width={`calc(3rem * ${size})`}
                height={`calc(3rem * ${size})`}
                animate={{ rotate: ['-15deg', '15deg'] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              >
                <TokenIcon
                  withBg
                  network={network}
                  url={token.iconUri}
                  symbol={token.symbol}
                />
              </Motion>
            </Motion>
            <Motion
              variants={{
                hover: { scale: 1 },
                initial: { scale: 0 },
              }}
            >
              <Typography
                size="large"
                variant="body"
                color="primary"
                fontWeight="bold"
              >
                {token.symbol}
              </Typography>
              <Typography size="small" variant="label" color="onSurface">
                {token.usd}
              </Typography>
            </Motion>
          </Motion>
        );
      })}

      {rightCoins.map((token) => {
        const size = Math.random() * 0.5 + 0.75;
        const area = VALID_AREAS[1];
        const position = generatePosition(area, size, positionsRight);

        if (!position) return null;

        positionsRight.push(position);

        return (
          <Motion
            gap="l"
            key={v4()}
            display="flex"
            cursor="pointer"
            initial="initial"
            whileHover="hover"
            position="absolute"
            animate={{ y: [-5, 5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror',
            }}
            onClick={() => onSelect(parseToMetadata(token as MetadataSources))}
            top={`calc(${position.top}vh)`}
            left={`calc(${position.left}vw)`}
          >
            <Motion
              scale="1"
              filter="blur(10px)"
              variants={{
                initial: { y: 0 },
                hover: {
                  scale: [1, 1.25],
                  filter: 'blur(0px)',
                  transition: { duration: 0.3 },
                },
              }}
            >
              <Motion
                borderRadius="50%"
                width={`calc(3rem * ${size})`}
                height={`calc(3rem * ${size})`}
                animate={{ rotate: ['-15deg', '15deg'] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              >
                <TokenIcon
                  withBg
                  network={network}
                  url={token.iconUri}
                  symbol={token.symbol}
                />
              </Motion>
            </Motion>
            <Motion
              variants={{
                hover: { scale: 1 },
                initial: { scale: 0 },
              }}
            >
              <Typography
                size="large"
                variant="body"
                color="primary"
                fontWeight="bold"
              >
                {token.symbol}
              </Typography>
              <Typography size="small" variant="label" color="onSurface">
                {token.usd}
              </Typography>
            </Motion>
          </Motion>
        );
      })}
    </Box>
  );
};

export default SwapBackground;
