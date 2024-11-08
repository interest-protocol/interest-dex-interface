import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react';
import { useFormContext } from 'react-hook-form';

import useSrAmmPool from '@/hooks/use-sr-amm-pool';
import { SdkSrAmmConfig, SrAmmPoolWithMetadata } from '@/interface';

import { IPoolForm } from '../pools/pools.types';

interface PoolDetailsProviderProps {
  address: string;
}

interface PoolDetailsContext {
  loading: boolean;
  config: SdkSrAmmConfig | undefined;
  pool: SrAmmPoolWithMetadata | null | undefined;
}

const INITIAL: PoolDetailsContext = {
  pool: null,
  loading: true,
  config: undefined,
};

const poolDetailsContext = createContext<PoolDetailsContext>(INITIAL);

export const PoolDetailsProvider: FC<
  PropsWithChildren<PoolDetailsProviderProps>
> = ({ address, children }) => {
  const { Provider } = poolDetailsContext;
  const { setValue, getValues } = useFormContext<IPoolForm>();
  const { pool, config, loading } = useSrAmmPool(address);

  useEffect(() => {
    if (pool) {
      setValue(
        'tokenList',
        [pool.metadataX, pool.metadataY].map((metadata, index) => ({
          ...getValues('tokenList')[index],
          ...metadata,
        }))
      );
      setValue('lpCoin', {
        ...getValues('lpCoin'),
        ...pool.metadata,
      });
    }
  }, [pool]);

  return <Provider value={{ loading, pool, config }}>{children}</Provider>;
};

export const usePoolDetails = () => useContext(poolDetailsContext);
