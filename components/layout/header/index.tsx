import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import MenuMobile from '@/components/menu-mobile';
import { IPXGoldenSVG } from '@/components/svg';
import Wallet from '@/components/wallet';
import { Routes, RoutesEnum } from '@/constants';
import useEventListener from '@/hooks/use-event-listener';

import { SIDEBAR_ITEMS } from '../sidebar/sidebar.data';
import LogoWrapper from './logo-wrapper';

const Header: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { asPath, push } = useRouter();

  const goToPath = (path: any) => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  const handleSetDesktop = useCallback(() => {
    const mediaIsMobile = !window.matchMedia('(min-width: 64em)').matches;
    setIsMobile(mediaIsMobile);
  }, []);

  useEventListener('resize', handleSetDesktop, true);
  return (
    <Box
      display="flex"
      alignItems="center"
      py={isMobile ? 'xs' : 's'}
      px={isMobile ? 'm' : '2xl'}
      justifyContent="space-between"
    >
      {isMobile ? (
        <Box>
          <Link href={Routes[RoutesEnum.Swap]}>
            <Box
              display="flex"
              color="onSurface"
              width="2.5rem"
              height="2.5em"
              alignItems="center"
              justifyContent="center"
            >
              <IPXGoldenSVG width="100%" maxWidth="100%" maxHeight="100%" />
            </Box>
          </Link>
        </Box>
      ) : (
        <LogoWrapper />
      )}
      {!isMobile && (
        <Box gap="m" display="flex" alignItems="center" justifyContent="center">
          {SIDEBAR_ITEMS.map(({ name, path }) => (
            <Box
              py="l"
              px="xs"
              key={v4()}
              display="flex"
              cursor="pointer"
              height="1.375rem"
              borderRadius="xs"
              alignItems="center"
              alignContent="center"
              nHover={{ color: 'primary' }}
              onClick={() => goToPath(path)}
              transition="all 350ms ease-in-out"
              color={asPath === path ? 'primary' : 'onSurface'}
              opacity={asPath === path ? '1' : '.6'}
            >
              <Typography
                size="large"
                variant="label"
                color="onSurface"
                width="max-content"
                nHover={{
                  opacity: 0.7,
                }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      <Box
        top="0"
        gap="xs"
        left="0"
        right="0"
        zIndex="1"
        position="relative"
        alignItems="center"
        justifyContent="flex-end"
        gridTemplateColumns="1fr 1fr"
        display={['none', 'none', 'none', 'flex']}
      >
        <Wallet />
      </Box>
      <Box
        p="xs"
        top="0"
        gap="xs"
        zIndex={3}
        overflowX="auto"
        position="relative"
        alignItems="center"
        px={['m', 'l', 'l', 'xl']}
        justifyContent="space-between"
        gridTemplateColumns="1fr 1fr 1fr"
        display={['flex', 'flex', 'flex', 'none']}
        boxShadow="0 1.5rem 2.875rem -0.625rem rgba(13, 16, 23, 0.16)"
      >
        <Box display="flex" alignItems="center" gap="xs">
          <Wallet />
          <MenuMobile />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
