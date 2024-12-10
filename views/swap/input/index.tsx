import { Box, TextField } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { FixedPointMath } from '@/lib';
import { parseInputEventToNumberString } from '@/utils';

import Balance from './balance';
import AmountInDollar from './dollar-value';
import HeaderInfo from './header-info';
import { InputProps } from './input.types';
import SelectToken from './select-token';

const Input: FC<InputProps> = ({ label }) => {
  const { register, setValue, getValues, control } = useFormContext();

  useWatch({ control, name: 'focus' });

  const swapping = useWatch({ control, name: 'swapping' });

  return (
    <>
      <HeaderInfo label={label} />
      <Box
        pt="m"
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
              ml="-1rem"
              width="100%"
              lineHeight="l"
              placeholder="0"
              color="onSurface"
              fontFamily="Proto"
              fontSize={['2xl', '4xl']}
              disabled={label === 'to' || swapping}
              fieldProps={{
                width: '100%',
                border: 'none',
                nHover: {
                  border: 'none',
                },
              }}
              {...register(
                `${label}.value`,
                label === 'to'
                  ? {}
                  : {
                      onChange: (v: ChangeEvent<HTMLInputElement>) => {
                        setValue('slider', {});
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
                    }
              )}
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
