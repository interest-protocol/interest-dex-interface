import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';

import { EarnCardProps } from '../earn.types';
import EarnCardBody from './card-body';

const EarnCard: FC<EarnCardProps> = ({
  label,
  balance,
  tokenName,
  TokenIcon,
  earnAmount,
}) => {
  return (
    <Box
      px="xl"
      pb="xl"
      pt={0}
      flex="1"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bg={
        label === 'staked' || label === 'unstaked'
          ? 'lowestContainer'
          : '#003EA8'
      }
      borderRadius="xs"
    >
      <Box
        py="xl"
        borderBottom="1px dashed"
        borderBottomColor={
          label === 'staked' || label === 'unstaked'
            ? 'outlineVariant'
            : 'primary'
        }
      >
        <Typography
          color="#fff"
          size="large"
          variant="title"
          fontWeight="400"
          lineHeight="1.75rem"
          textTransform="capitalize"
        >
          {label}
        </Typography>
      </Box>
      <EarnCardBody
        label={label}
        balance={balance}
        tokenName={tokenName}
        TokenIcon={TokenIcon}
        earnAmount={earnAmount}
      />
      <Box
        gap="xs"
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
        mt={label === 'rewards' ? '4rem' : '-0.5rem'}
      >
        {(label === 'staked' || label === 'unstaked') && (
          <Button
            onClick={() => {}}
            color="primary"
            variant="outline"
            borderRadius="2xs"
            borderStyle="1px solid"
            borderColor="outlineVariant"
          >
            Reset
          </Button>
        )}
        <Button onClick={() => {}} borderRadius="2xs" variant="filled">
          {label === 'staked'
            ? 'Add'
            : label === 'unstaked'
              ? 'Remove'
              : 'Harvest'}
        </Button>
      </Box>
    </Box>
  );
};

export default EarnCard;
