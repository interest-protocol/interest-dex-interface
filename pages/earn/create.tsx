import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import PoolCreate from '@/views/pool-create';
import { CreatePoolForm } from '@/views/pool-create/pool-create.types';

const PoolCreatePage: NextPage = () => {
  const form = useForm<CreatePoolForm>({
    defaultValues: {
      step: 0,
      type: 'SR-AMM',
      isStable: false,
      tokens: [
        {
          name: '',
          value: '',
          symbol: '',
          decimals: 0,
          usdPrice: null,
          type: '' as `0x${string}`,
        },
        {
          name: '',
          value: '',
          symbol: '',
          decimals: 0,
          usdPrice: null,
          type: '' as `0x${string}`,
        },
      ],
    },
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Pool Create" />
      <PoolCreate />
    </FormProvider>
  );
};

export default PoolCreatePage;
