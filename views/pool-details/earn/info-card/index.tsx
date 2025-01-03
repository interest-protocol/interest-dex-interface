import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { EarnInfoCardProps } from './info-card.types';

const EarnInfoCard: FC<EarnInfoCardProps> = ({ title, description, Icon }) => {
  return (
    <Box bg="container" p="xl" borderRadius="0.5rem">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1.5rem"
      >
        <Typography
          size="large"
          variant="label"
          color="onSurface"
          width="max-content"
        >
          {title}
        </Typography>
        <Box
          width="2.5rem"
          height="2.5rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="highestContainer"
          borderRadius="full"
          color="onSurface"
        >
          {Icon}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          size="large"
          variant="body"
          color="onSurface"
          width="max-content"
          fontSize="1.375rem"
          lineHeight="1.75rem"
          opacity={0.7}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default EarnInfoCard;
