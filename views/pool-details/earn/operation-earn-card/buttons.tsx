import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { OperationEarnCardProps } from './operation-card.types';

const OperationEarnCardButtonGroup: FC<
  Omit<OperationEarnCardProps, 'token'>
> = ({ type, onPrimary, onSecondary }) => {
  return (
    <>
      <Box
        gap="m"
        display="grid"
        gridTemplateColumns={['1fr', '1fr', '1fr 2fr', '1fr 2fr']}
      >
        {type != 'rewards' ? (
          <Button
            color="primary"
            variant="outline"
            borderRadius="xs"
            onClick={onSecondary}
            borderStyle="1px solid"
            borderColor="outlineVariant"
          >
            <Typography
              size="small"
              width="100%"
              variant="label"
              textAlign="center"
              fontSize="0.875rem"
            >
              Reset
            </Typography>
          </Button>
        ) : (
          <Box />
        )}
        <Button borderRadius="xs" variant="filled" onClick={onPrimary}>
          <Typography
            size="small"
            width="100%"
            variant="label"
            textAlign="center"
            fontSize="0.875rem"
          >
            {type == 'staked'
              ? 'ADD'
              : type == 'rewards'
                ? 'Harvest'
                : 'Remove'}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default OperationEarnCardButtonGroup;
