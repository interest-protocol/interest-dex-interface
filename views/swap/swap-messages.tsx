import { Box, Theme, Typography, useTheme } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { DotErrorSVG } from '@/components/svg';

import { SwapMessagesEnum } from './swap.data';

const SwapMessages: FC = () => {
  const { colors } = useTheme() as Theme;

  const { control } = useWatch();

  const error = useWatch({ control, name: 'error' });

  if (!error) return null;

  const isCustomErrorBoxMessage = [
    SwapMessagesEnum.leastOneMove,
    SwapMessagesEnum.greaterThanBalance,
  ].includes(error);

  return (
    <Box
      p="s"
      gap="s"
      display="flex"
      borderRadius="xs"
      border="1px solid"
      color={isCustomErrorBoxMessage ? 'outline' : 'onErrorContainer'}
      bg={isCustomErrorBoxMessage ? 'lowContainer' : 'errorContainer'}
      borderColor={isCustomErrorBoxMessage ? 'outline' : 'onErrorContainer'}
    >
      <DotErrorSVG
        width="100%"
        maxWidth="1rem"
        maxHeight="1rem"
        dotColor={isCustomErrorBoxMessage ? colors.lowContainer : colors.error}
      />
      <Typography variant="label" size="medium">
        {error}
      </Typography>
    </Box>
  );
};

export default SwapMessages;
