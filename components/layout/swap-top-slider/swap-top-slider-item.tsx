import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { TokenIcon } from '@/components';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';

import { SwapBottomMenuItemProps } from '../bottom-menu/bottom-menu.types';

const SwapTopSliderItem: FC<SwapBottomMenuItemProps> = ({
  symbol,
  iconUri,
  onClick,
  usdPrice,
}) => {
  const network = useNetwork<Network>();

  return (
    <Box
      gap="xs"
      display="flex"
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
    >
      <TokenIcon
        size="1.5rem"
        withBg
        network={network}
        url={iconUri}
        symbol={symbol}
      />
      <Typography size="medium" variant="title" color="primary">
        {symbol}
      </Typography>
      <Box>
        <Typography
          size="medium"
          variant="title"
          textAlign="left"
          fontWeight="500"
          color="onSurface"
        >
          {usdPrice}
        </Typography>
      </Box>
    </Box>
  );
};

export default SwapTopSliderItem;
