import { Box, Button } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { FindEarnModalProps } from './find-earn-modal.types';

const SearchButton: FC<FindEarnModalProps> = ({ closeModal }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Button
        display="flex"
        variant="filled"
        minWidth="17rem"
        borderRadius="xs"
        justifyContent="center"
        onClick={closeModal}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchButton;
