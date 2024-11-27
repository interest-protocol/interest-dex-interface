import { Box, Typography } from '@interest-protocol/ui-kit';
import dynamic from 'next/dynamic';
import { FC } from 'react';

import { EarnCardProps } from '../../earn.types';

const Slider = dynamic(
  import('@interest-protocol/ui-kit').then(({ Slider }) => Slider),
  { ssr: false }
);

const EarnCardBody: FC<EarnCardProps> = ({
  label,
  balance,
  tokenName,
  TokenIcon,
  earnAmount,
}) => {
  return (
    <Box
      mt="m"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography
        size="medium"
        variant="body"
        color="outline"
        fontWeight="400"
        lineHeight="1.75rem"
        textTransform="capitalize"
      >
        Balance: {balance}
      </Typography>
      <Box
        mb="m"
        mt="1rem"
        width="100%"
        display="flex"
        height="2.5rem"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box gap="l" display="flex" alignItems="center" justifyContent="center">
          <Box
            width="3rem"
            display="flex"
            height="3rem"
            bg="primary"
            color="surface"
            borderRadius="2xs"
            alignItems="center"
            justifyContent="center"
          >
            <TokenIcon width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
          </Box>
          <Typography
            mr="m"
            size="large"
            variant="body"
            textTransform="capitalize"
          >
            {tokenName}
          </Typography>
        </Box>
        <Typography size="large" variant="label" textTransform="capitalize">
          {earnAmount}
        </Typography>
      </Box>
      {label !== 'rewards' && (
        <Box mb="2rem" mt="-1rem" width="100%">
          <Slider initial={0} max={100} onChange={() => {}} />
        </Box>
      )}
    </Box>
  );
};

export default EarnCardBody;
