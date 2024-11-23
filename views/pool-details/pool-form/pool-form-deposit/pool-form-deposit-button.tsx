import { Network } from '@interest-protocol/aptos-sr-amm';
import { Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useInterestDex } from '@/hooks/use-interest-dex';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';

import { PoolFormButtonProps } from '../pool-form.types';
import { logDepositPool } from '../pool-form.utils';

const PoolFormDepositButton: FC<PoolFormButtonProps> = ({ form }) => {
  const dex = useInterestDex();
  const client = useAptosClient();
  const { dialog, handleClose } = useDialog();
  const { getValues, control, setValue } = form;
  const { account, signAndSubmitTransaction } = useAptosWallet();

  const handleDeposit = async () => {
    try {
      invariant(account, 'You must be connected to proceed');
      setValue('error', '');
      const [token0, token1] = getValues('tokenList');

      const payload = dex.addLiquidity({
        faA: token0.type,
        faB: token1.type,
        recipient: account.address,
        amountA: BigInt(token0.valueBN.decimalPlaces(0, 1).toString()),
        amountB: BigInt(token1.valueBN.decimalPlaces(0, 1).toString()),
      });

      const txResult = await signAndSubmitTransaction({ payload });

      invariant(txResult.status === 'Approved', 'Rejected by User');

      await client.waitForTransaction({
        transactionHash: txResult.args.hash,
        options: { checkSuccess: true },
      });

      await client.waitForTransaction({
        transactionHash: txResult.args.hash,
        options: { checkSuccess: true },
      });

      logDepositPool(
        account.address,
        getValues('tokenList.0'),
        getValues('tokenList.1'),
        Network.Porto,
        txResult.args.hash
      );

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.Porto](`txn/${txResult.args.hash}`)
      );
    } catch (e) {
      console.warn({ e });

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    }
  };

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');

    setValue('explorerLink', '');
  };

  const onDeposit = () =>
    dialog.promise(handleDeposit(), {
      loading: () => ({
        title: 'Depositing...',
        message: 'We are Depositing, and you will let you know when it is done',
      }),
      success: () => ({
        title: 'Deposit Successfully',
        message:
          getValues('error') ||
          'Your deposit was successfully, and you can check it on the Explorer',
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
      }),
      error: (error) => ({
        title: 'Deposit Failure',
        message:
          (error as Error).message ||
          'Your deposit failed, please try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
    });

  const error = useWatch({ control, name: 'error' });

  return (
    <Button
      py="s"
      my="xl"
      mt="xl"
      mx="auto"
      variant="filled"
      width="fill-available"
      onClick={onDeposit}
      disabled={!!error}
    >
      <Typography variant="label" size="large" textAlign="center" width="100%">
        Confirm Deposit
      </Typography>
    </Button>
  );
};

export default PoolFormDepositButton;
