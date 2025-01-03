import { Box, Slider, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { noop } from '@/utils';

import OperationEarnCardBalance from './balance';
import OperationEarnCardButtonGroup from './buttons';
import OperationEarnCardField from './field';
import { OperationEarnCardProps } from './operation-card.types';

const OperationEarnCard: FC<OperationEarnCardProps> = ({
  type,
  token,
  onPrimary,
  onSecondary,
}) => {
  return (
    <>
      <Box
        p="m"
        gap="1.5rem"
        borderRadius="xs"
        bg="lowestContainer"
        flexDirection="column"
        border="0.063rem solid"
        borderColor="outlineVariant"
        display="flex"
      >
        <Box
          py="m"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            size="large"
            variant="body"
            color="onSurface"
            width="max-content"
            fontSize="1.25rem"
            lineHeight="1.75rem"
            textTransform="capitalize"
          >
            {type}
          </Typography>
          <OperationEarnCardBalance token={token} />
        </Box>
        <OperationEarnCardField token={token} />
        {type != 'rewards' ? (
          <Box mt="-2.9rem">
            <Slider initial={0} max={100} onChange={noop} />
          </Box>
        ) : (
          <Box p="xs" />
        )}
        <OperationEarnCardButtonGroup
          type={type}
          onPrimary={onPrimary}
          onSecondary={onSecondary}
        />
      </Box>
    </>
  );
};

export default OperationEarnCard;
