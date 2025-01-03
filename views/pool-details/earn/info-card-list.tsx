import { Box } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { DollarSVG, PercentageSVG, WirelessSVG } from '@/components/svg';

import EarnInfoCard from './info-card';

const EarnInfoCardList: FC = () => {
  return (
    <Box
      gap="xs"
      mx="auto"
      maxWidth="65rem"
      overflow="hidden"
      flexDirection="column"
      display={['flex', 'flex', 'flex', 'grid']}
      alignItems={['unset', 'unset', 'unset', 'start']}
    >
      <Box
        gap="s"
        display="grid"
        gridTemplateColumns={[
          '1fr',
          '1fr',
          '1fr 1fr 1fr',
          '1fr 1fr 1fr',
          '1fr 1fr 1fr',
        ]}
      >
        <EarnInfoCard
          title="state"
          description="Live"
          Icon={
            <WirelessSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          }
        />
        <EarnInfoCard
          title="tvl"
          description="$10,123.01"
          Icon={<DollarSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />}
        />
        <EarnInfoCard
          title="apr"
          description="$3,123.01"
          Icon={
            <PercentageSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
          }
        />
      </Box>
    </Box>
  );
};

export default EarnInfoCardList;
