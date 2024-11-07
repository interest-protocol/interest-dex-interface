import { Box, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';

import { CollapseProps } from './collapse.types';
import CollapseIcon from './collapse-icon';

const variants = {
  collapsed: {
    height: 'auto',
  },
  rest: { height: 0 },
};

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCollapseClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Box
        display="flex"
        height="3.5rem"
        cursor="pointer"
        alignItems="center"
        onClick={handleCollapseClick}
        justifyContent="space-between"
      >
        <Typography
          size="small"
          opacity="0.7"
          variant="label"
          color="onSurface"
        >
          {title}
        </Typography>
        <Motion
          display="flex"
          initial="rest"
          alignItems="center"
          animate={isExpanded ? 'collapsed' : 'rest'}
        >
          <CollapseIcon />
        </Motion>
      </Box>
      <Motion
        gap="xs"
        display="flex"
        initial="rest"
        overflow="hidden"
        variants={variants}
        flexDirection="column"
        animate={isExpanded ? 'collapsed' : 'rest'}
      >
        {children}
      </Motion>
    </>
  );
};

export default Collapse;