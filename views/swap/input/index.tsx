import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import { SwapForm } from '../swap.types';
import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ label }) => {
  const { register, setValue, getValues, control } = useFormContext<SwapForm>();

  useWatch({ control, name: 'focus' });

  const swapping = useWatch({ control, name: 'swapping' });

  return (
    <>
      <HeaderInfo label={label} />
      <Box
        pt="l"
        gap="0.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="space-between" gap="xs">
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              disabled={swapping}
              fontFamily="Satoshi"
              fieldProps={{
                width: '100%',
                borderRadius: 'xs',
              }}
              {...register(`${label}.value`, {
                onChange: (v: ChangeEvent<HTMLInputElement>) => {
                  setValue('updateSlider', {});
                  setValue('origin', label);
                  const value = parseInputEventToNumberString(v);
                  setValue('lock', false);
                  setValue?.(`${label}.value`, value);
                  setValue?.(
                    `${label}.valueBN`,
                    FixedPointMath.toBigNumber(
                      value,
                      getValues(`${label}.decimals`)
                    )
                  );
                },
              })}
            />
          </Box>
          <SelectToken label={label} />
        </Box>
        <Box display="flex" justifyContent="space-between" color="outline">
          <AmountInDollar label={label} />
          <Balance label={label} />
        </Box>
      </Box>
    </>
  );
};

export default Input;
