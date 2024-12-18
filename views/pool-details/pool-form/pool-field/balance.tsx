import {
  Button,
  ProgressIndicator,
  Typography,
} from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { FixedPointMath } from '@/lib';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';
import { isAptos, ZERO_BIG_NUMBER } from '@/utils';
import { IPoolForm } from '@/views/pools/pools.types';

import { usePoolDetails } from '../../pool-details.context';
import { NameProps } from './pool-field.types';

const Balance: FC<NameProps> = ({ name }) => {
  const { coinsMap, loading } = useCoins();
  const { setValue, control } = useFormContext<IPoolForm>();
  const { loading: loadingPoolsDetails } = usePoolDetails();

  const token = useWatch({ control, name });

  const balance = coinsMap[token.type]?.balance ?? ZERO_BIG_NUMBER;

  const handleMax = () => {
    setValue(`lpCoin.locked`, false);
    setValue(`tokenList.0.locked`, false);
    setValue(`tokenList.1.locked`, false);
    setValue(`${name}.locked`, true);

    const value = balance.minus(
      FixedPointMath.toBigNumber(isAptos(token.type) ? 1 : 0, token.decimals)
    );

    if (isAptos(token.type) && !value.isPositive()) {
      setValue(`${name}.value`, '0');
      setValue(`${name}.valueBN`, ZERO_BIG_NUMBER);
      return;
    }

    setValue(`${name}.valueBN`, value);
    setValue(
      `${name}.value`,
      FixedPointMath.toNumber(
        value.decimalPlaces(0, 1),
        token.decimals
      ).toString()
    );
  };

  return (
    <Button
      p="2xs"
      gap="0.5rem"
      display="flex"
      color="onSurface"
      variant="outline"
      alignItems="center"
      onClick={handleMax}
      borderColor="transparent"
      nHover={{ bg: 'unset', borderColor: 'primary' }}
      className="loading-balance"
    >
      {!loadingPoolsDetails ? (
        <Typography size="small" variant="body" fontSize="xs">
          Balance: {FixedPointMath.toNumber(balance, token.decimals) ?? '--'}
        </Typography>
      ) : (
        <Skeleton width="4.5rem" />
      )}

      {loading && <ProgressIndicator variant="loading" size={12} />}
    </Button>
  );
};

export default Balance;
