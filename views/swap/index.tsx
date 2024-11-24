import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import Layout from '@/components/layout';

import Input from './input';
import SwapFormFieldSlider from './input/swap-manager-slider';
import SwapButton from './swap-button';
import SwapFlipToken from './swap-flip-token';
import SwapManager from './swap-manager';

const Swap: FC = () => (
  <Layout>
    <Box
      gap="l"
      mx="auto"
      mt="3.5rem"
      display="flex"
      borderRadius="l"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      px={['2xs', 'xl', 'xl', '7xl']}
      width={['100%', '100%', '100%', '39.75rem']}
    >
      <Box bg="container" borderRadius="s" px="xl">
        <Box display="flex" flexDirection="column" gap="5xl">
          <Box py="l">
            <Input label="from" />
            <Box px="s">
              <SwapFormFieldSlider />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          position="relative"
          alignContent="center"
          justifyContent="center"
        >
          <Box width="100%" height="0.313rem" bg="lowContainer" />
          <Box
            gap="s"
            my="-1.5rem"
            width="100%"
            display="flex"
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              width="3.25rem"
              height="3.25rem"
              border="5px solid"
              alignItems="center"
              borderRadius="full"
              justifyContent="center"
              borderColor="lowContainer"
            >
              <SwapFlipToken />
            </Box>
          </Box>
        </Box>
        <Box borderRadius="xs" bg="container" my="l">
          <Input label="to" />
        </Box>
        <SwapManager />
      </Box>
      <SwapButton />
    </Box>
  </Layout>
);

export default Swap;
