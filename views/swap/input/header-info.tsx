import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { CogsSVG } from '@/components/svg';
import { useModal } from '@/hooks/use-modal';

import { SwapForm } from '../swap.types';
import SwapSettingsForm from '../swap-settings-form';
import { InputProps } from './input.types';

const HeaderInfo: FC<InputProps> = ({ label }) => {
  const { setModal, handleClose } = useModal();
  const form = useFormContext<SwapForm>();

  const symbol = useWatch({ control: form.control, name: `${label}.symbol` });

  const handleOpenSettings = () =>
    setModal(
      <FormProvider {...form}>
        <SwapSettingsForm />
      </FormProvider>,
      { isOpen: true, custom: true, onClose: handleClose }
    );

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      color="onSurface"
      alignItems="flex-end"
    >
      <Typography variant="label" size="large" fontSize="s">
        {label == 'from' ? 'Sell' : 'BUY'}
        <Typography
          as="span"
          size="small"
          variant="label"
          fontSize="s"
          display={['inline-block', 'none']}
        >
          : {symbol}
        </Typography>
      </Typography>
      {label == 'from' && (
        <Box
          role="button"
          lineHeight="0"
          cursor="pointer"
          color="onSurface"
          aria-label="Settings"
          onClick={handleOpenSettings}
          transition="transform 500ms ease-in-out"
          nHover={{ transform: 'rotate(180deg)' }}
        >
          <CogsSVG maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
        </Box>
      )}
    </Box>
  );
};

export default HeaderInfo;
