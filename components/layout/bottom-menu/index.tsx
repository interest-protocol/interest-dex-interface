import { Box } from '@interest-protocol/ui-kit';

import BottomNavList from './bottom-nav-list';

const SwapBottomMenu = () => {
  return (
    <Box
      left="0"
      zIndex="9"
      bottom="0"
      width="100vw"
      overflow="hidden"
      position="absolute"
      bg="highestContainer"
      flexDirection="column"
      display={['flex', 'flex', 'flex', 'none', 'none']}
    >
      <BottomNavList />
    </Box>
  );
};

export default SwapBottomMenu;
