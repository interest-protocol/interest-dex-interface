import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

import SwapBottomMenu from '@/components/layout/bottom-menu';

import ErrorBoundary from '../error-boundary';
import Footer from './footer';
import Header from './header';
import { LayoutProps } from './layout.types';

const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title,
  children,
  background,
}) => (
  <ErrorBoundary>
    <Box
      flex="1"
      as="aside"
      bg="surface"
      height="100vh"
      display="flex"
      overflow="hidden"
      position="relative"
      flexDirection="column"
    >
      <Header />
      {background}
      <Box
        flex="1"
        width="100%"
        display="flex"
        overflowY="auto"
        flexDirection="column"
        justifyContent="space-between"
        py={['l', 'l', 'l', 'unset', 'unset']}
      >
        <Box
          m="0"
          mt="unset"
          width="100%"
          height="100%"
          display="flex"
          variant="container"
          flexDirection="column"
          px={['m', 'l', 'l', 'xl']}
        >
          <Box
            flex="1"
            as="main"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              {title && (
                <Typography
                  textAlign="center"
                  color="onSurface"
                  variant="display"
                  size="medium"
                  my="3rem"
                >
                  {title}
                </Typography>
              )}
              {children}
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
      <SwapBottomMenu />
    </Box>
  </ErrorBoundary>
);

export default Layout;
