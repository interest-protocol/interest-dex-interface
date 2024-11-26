import { yupResolver } from '@hookform/resolvers/yup';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { PRICE_TYPE } from '@/constants/prices';
import CreateToken from '@/views/create-token';
import { validationSchema } from '@/views/create-token/create-token-form/create-token-form.validation';

const CreateTokenPage: NextPage = () => {
  const form = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      decimals: 8,
      fixedSupply: true,
      pool: { active: true },
    },
  });

  useEffect(() => {
    fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      body: JSON.stringify({ coins: [PRICE_TYPE['MOVE']] }),
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    })
      .then((response) => response.json())
      .then((data) =>
        form.setValue('pool.quoteUsdPrice' as never, data[0].price as never)
      )
      .catch(() => null);
  });

  return (
    <FormProvider {...form}>
      <SEO pageTitle="Create Token" />
      <CreateToken />
    </FormProvider>
  );
};

export default CreateTokenPage;
