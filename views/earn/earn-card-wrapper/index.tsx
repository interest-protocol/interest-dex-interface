import { Box } from '@interest-protocol/ui-kit';
import { FC, PropsWithChildren } from 'react';

const EarnCardWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      gap="xs"
      bg="container"
      display="grid"
      borderRadius="xs"
      p={['s', 's', 's', 'l']}
      gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr']}
    >
      {children}
    </Box>
  );
};

export default EarnCardWrapper;
