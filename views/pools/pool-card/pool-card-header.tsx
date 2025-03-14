import { Box, Button, Tag, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { v4 } from 'uuid';

import { ArrowObliqueSVG } from '@/components/svg';

import { PoolCardHeaderProps } from './pool-card.types';

const PoolCardHeader: FC<PoolCardHeaderProps> = ({ tags }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" flexWrap="wrap" alignItems="center">
      {tags?.map((tag) =>
        tag ? (
          <Tag
            key={v4()}
            px="0"
            py="0"
            mb="2xs"
            mr="2xs"
            size="small"
            height="1.4rem"
            variant="outline"
          >
            <Typography size="small" variant="label">
              {tag}
            </Typography>
          </Tag>
        ) : (
          true
        )
      )}
    </Box>
    <Button
      mb="auto"
      isIcon
      opacity="0"
      variant="text"
      color="onSurface"
      className="arrow-wrapper"
      nHover={{ bg: 'surface' }}
    >
      <ArrowObliqueSVG maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
    </Button>
  </Box>
);

export default PoolCardHeader;
