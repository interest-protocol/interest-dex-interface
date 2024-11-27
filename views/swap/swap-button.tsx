import { Network } from '@interest-protocol/aptos-sr-amm';
import { Box, Button, Typography } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import invariant from 'tiny-invariant';

import { EXPLORER_URL } from '@/constants';
import { useDialog } from '@/hooks';
import { useAptosClient } from '@/lib/aptos-provider/aptos-client/aptos-client.hooks';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import { useCoins } from '@/lib/coins-manager/coins-manager.hooks';

import SuccessModal from '../components/success-modal';
import SuccessModalTokenCard from '../components/success-modal/success-modal-token-card';
import { logSwap } from './swap.utils';
import SwapMessages from './swap-messages';

const SwapButton = () => {
  const { mutate } = useCoins();
  const client = useAptosClient();
  const network = useNetwork<Network>();
  const { dialog, handleClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const {
    account,
    name: wallet,
    signTransaction,
    signAndSubmitTransaction,
  } = useAptosWallet();
  const { getValues, setValue, control, reset } = useFormContext();

  const error = useWatch({ control, name: 'error' });
  const valueIn = useWatch({ control, name: 'from.value' });
  const valueOut = useWatch({ control, name: 'to.value' });

  const gotoExplorer = () => {
    window.open(getValues('explorerLink'), '_blank', 'noopener,noreferrer');
  };

  const handleSwap = async () => {
    try {
      setLoading(true);
      setValue('error', '');

      if (!account) return;

      let txResult;
      const { from, to, payload } = getValues();

      const startTime = Date.now();

      if (wallet === 'Razor Wallet') {
        const tx = await signAndSubmitTransaction({ payload });

        invariant(tx.status === 'Approved', 'Rejected by User');

        txResult = tx.args;
      } else {
        const tx = await client.transaction.build.simple({
          data: payload,
          sender: account.address,
        });

        const signedTx = await signTransaction(tx);

        invariant(signedTx.status === 'Approved', 'Rejected by User');

        const senderAuthenticator = signedTx.args;

        txResult = await client.transaction.submit.simple({
          transaction: tx,
          senderAuthenticator,
        });
      }

      const endTime = Date.now() - startTime;

      setValue('executionTime', String(endTime));

      await client.waitForTransaction({
        transactionHash: txResult.hash,
        options: { checkSuccess: true },
      });

      logSwap(account!.address, from, to, network, txResult.hash);

      setValue(
        'explorerLink',
        EXPLORER_URL[Network.Porto](`txn/${txResult.hash}`)
      );

      reset();
    } catch (e) {
      console.warn(e);

      if ((e as any)?.data?.error_code === 'mempool_is_full')
        throw new Error('The mempool is full, try again in a few seconds.');

      throw e;
    } finally {
      mutate();
      setLoading(false);
    }
  };

  const onSwap = () =>
    dialog.promise(handleSwap(), {
      loading: () => ({
        title: 'Swapping...',
        message: 'We are swapping, and you will let you know when it is done',
      }),
      error: (error) => ({
        title: 'Swap Failure',
        message:
          (error as Error).message ||
          'Your swap failed, please try to increment your slippage and try again or contact the support team',
        primaryButton: { label: 'Try again', onClick: handleClose },
      }),
      success: () => ({
        title: 'Swap Successful',
        message: (
          <SuccessModal
            transactionTime={`${(
              Number(getValues('executionTime')) / 1000
            ).toFixed(2)}`}
          >
            <SuccessModalTokenCard
              from={getValues('from')}
              to={getValues('to')}
            />
          </SuccessModal>
        ),
        primaryButton: {
          label: 'See on Explorer',
          onClick: gotoExplorer,
        },
        secondaryButton: (
          <Button
            mr="s"
            color="onSurface"
            variant="outline"
            onClick={handleClose}
          >
            got it
          </Button>
        ),
      }),
    });

  const disabled = !!error || !(Number(valueIn) && Number(valueOut));

  return (
    <Box display="flex" flexDirection="column" gap="l">
      {error && <SwapMessages />}
      <Button
        variant="filled"
        borderRadius="s"
        onClick={onSwap}
        disabled={disabled}
        justifyContent="center"
      >
        <Typography variant="label" size="large">
          {loading ? 'Swapping...' : 'Confirm Swap'}
        </Typography>
      </Button>
    </Box>
  );
};

export default SwapButton;
