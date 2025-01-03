import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box } from '@interest-protocol/ui-kit';
import { ChangeEvent, FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { TokenIcon } from '@/components';
import { FixedPointMath } from '@/lib';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { parseInputEventToNumberString } from '@/utils';
import { TokenField } from '@/views/pool-create/select-coins/input/token-field';
import { IPoolForm } from '@/views/pools/pools.types';

import { OperationEarnCardProps } from './operation-card.types';

const OperationEarnCardField: FC<Pick<OperationEarnCardProps, 'token'>> = ({
  token,
}) => {
  const network = useNetwork<Network>();
  const { register, setValue } = useFormContext<IPoolForm>();
  const handleChange = (v: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInputEventToNumberString(v);

    setValue(`tokenList.0.value`, amount);
    setValue(
      'tokenList.0.valueBN',
      FixedPointMath.toBigNumber(amount, token?.decimals)
    );
  };
  return (
    <TokenField
      active
      textAlign="right"
      placeholder="0.00"
      fieldProps={{
        p: 'xs',
        borderRadius: 'xs',
        bg: 'lowestContainer',
      }}
      TokenIcon={
        <Box display="flex" alignItems="center" gap="s">
          <TokenIcon withBg network={network} symbol={token.symbol} />
        </Box>
      }
      //TODO: Change this to right form
      {...register(`lpCoin.value`, {
        onChange: handleChange,
      })}
    />
  );
};

export default OperationEarnCardField;
