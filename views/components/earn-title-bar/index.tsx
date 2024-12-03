import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ArrowLeftSVG, MOVESVG, USDCSVG } from '@/components/svg';

import { PoolTitleBarProps } from './pool-title-bar.types';

const EarnTitleBar: FC<PoolTitleBarProps> = ({
  onBack,
  loading,
  centerTile,
}) => {
  return (
    <Box
      py="m"
      px="xl"
      mb="xs"
      gap="m"
      width="100%"
      display="flex"
      bg="container"
      flexWrap="wrap"
      borderRadius="xs"
      alignItems="center"
      mt={['5xl', '5xl', '5xl', 'xl']}
    >
      <Button
        isIcon
        mr="xs"
        variant="text"
        onClick={onBack}
        color="onSurface"
        nHover={{
          bg: 'surface',
        }}
      >
        <ArrowLeftSVG width="1.5rem" maxWidth="1.5rem" maxHeight="1.5rem" />
      </Button>
      <Typography
        size="large"
        color="onSurface"
        variant="headline"
        textAlign="center"
        ml={centerTile ? 'auto' : ''}
        fontSize={['xl', 'xl', '3xl', '5xl']}
      >
        {loading ? (
          <Box display="flex" gap="s">
            <Skeleton width="5rem" height="2rem" />
            <Skeleton width="5rem" height="2rem" />
          </Box>
        ) : (
          <Box as="span" fontFamily="Satoshi">
            faMOVE • faUSDC
          </Box>
        )}
      </Typography>

      <Box
        gap="s"
        ml="auto"
        alignItems="center"
        display={['none', 'none', 'flex', 'flex']}
      >
        {!loading ? (
          <Box display="flex" gap="s">
            <Box
              width="3rem"
              display="flex"
              height="3rem"
              bg="onSurface"
              color="surface"
              borderRadius="2xs"
              alignItems="center"
              justifyContent="center"
            >
              <USDCSVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
            </Box>
            <Box
              width="3rem"
              display="flex"
              height="3rem"
              bg="onSurface"
              color="surface"
              borderRadius="2xs"
              alignItems="center"
              justifyContent="center"
            >
              <MOVESVG width="100%" maxWidth="1.5rem" maxHeight="1.5rem" />
            </Box>
          </Box>
        ) : (
          <Box display="flex" gap="s">
            <Skeleton
              width="calc(1.5rem * 1.66)"
              height="calc(1.5rem * 1.66)"
            />
            <Skeleton
              width="calc(1.5rem * 1.66)"
              height="calc(1.5rem * 1.66)"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EarnTitleBar;
