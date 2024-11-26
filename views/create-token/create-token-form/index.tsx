import { Box, TextField, Typography } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { ICreateTokenForm } from '../create-token.types';
import CreateTokenFormButton from './create-token-form-button';
import CreateTokenFormPool from './create-token-form-pool';
import CreateTokenFormImage from './create-token-form-upload-image';

const CreateTokenForm: FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ICreateTokenForm>();

  return (
    <Box display="flex" flexDirection="column" gap="2xl">
      <Box
        px="xl"
        py="2xl"
        mx="auto"
        width="100%"
        bg="container"
        maxWidth="37rem"
        overflow="hidden"
        borderRadius="xs"
        color="onSurface"
      >
        <Typography variant="headline" size="small">
          Coin Generator
        </Typography>
        <Box py="2xl" display="flex" flexDirection="column" gap="l">
          <Typography size="large" variant="body">
            1. Coin Details
          </Typography>
          <Box>
            <TextField
              label="Name"
              fontFamily="Proto"
              {...register('name')}
              placeholder="Eg. Ruco"
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.name && 'error'}
              supportingText={errors.name?.message}
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
            />
          </Box>
          <Box>
            <TextField
              label="Symbol"
              fontFamily="Proto"
              placeholder="Eg. Ruco"
              {...register('symbol')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.symbol && 'error'}
              supportingText={errors.symbol?.message}
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
            />
          </Box>
          <Box>
            <TextField
              fontFamily="Proto"
              label="Project URL"
              {...register('projectUrl')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.projectUrl && 'error'}
              placeholder="Eg. https://www.Ruco.com"
              supportingText={errors.projectUrl?.message}
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
            />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="l" mb="2xl">
          <Typography size="large" variant="body">
            2. Add Coin Image
          </Typography>
          <Box>
            <TextField
              type="link"
              fontFamily="Proto"
              label="Coin Image URL"
              {...register('imageUrl')}
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.imageUrl && 'error'}
              placeholder="Eg. https://move.com/images/logo.png"
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
              supportingText={
                errors.imageUrl?.message ??
                'We recommend to upload an image with 250x250 pixels.'
              }
            />
          </Box>
          <Typography textAlign="center" size="small" variant="body">
            OR
          </Typography>
          <Box display="flex" flexDirection="column" gap="xs">
            <CreateTokenFormImage setValue={setValue} />
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="l">
          <Typography size="large" variant="body">
            3. Coin Features
          </Typography>
          <Box>
            <TextField
              type="number"
              fontFamily="Proto"
              label="Coin Decimals"
              {...register('decimals')}
              supportingText="Insert the decimal precision of your token. If you don't know what to insert, use 9"
              nPlaceholder={{ opacity: 0.7 }}
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
            />
          </Box>
          <Box>
            <TextField
              fontFamily="Proto"
              label="Total Supply"
              nPlaceholder={{ opacity: 0.7 }}
              status={errors.supply && 'error'}
              placeholder="Your total coin supply"
              supportingText={
                errors.supply?.message ||
                'Insert the initial token supply to mint'
              }
              {...register('supply', {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  setValue('supply', Number(parseInputEventToNumberString(v)));
                },
              })}
              fieldProps={{ borderRadius: 'xs', height: '2.8rem' }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        px="l"
        py="2xl"
        mx="auto"
        width="100%"
        bg="container"
        maxWidth="37rem"
        overflow="hidden"
        borderRadius="xs"
        color="onSurface"
      >
        <Typography variant="headline" size="small">
          Coin features
        </Typography>
        <CreateTokenFormPool />
        <CreateTokenFormButton />
      </Box>
    </Box>
  );
};

export default CreateTokenForm;
