import { Network } from '@interest-protocol/aptos-sr-amm';
import { Button, Motion, Typography } from '@interest-protocol/ui-kit';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';
import TokenIcon from '@/components/token-icon';
import { COIN_TYPE_TO_FA } from '@/constants/coin-fa';
import { PRICE_TYPE } from '@/constants/prices';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/lib/aptos-provider/network/network.hooks';
import {
  AssetMetadata,
  TokenStandard,
} from '@/lib/coins-manager/coins-manager.types';
import SelectTokenModal from '@/views/components/select-token-modal';

import { SwapForm } from '../swap.types';
import { InputProps } from './input.types';

const SelectToken: FC<InputProps> = ({ label }) => {
  const network = useNetwork<Network>();
  const { setModal, handleClose } = useModal();

  const { setValue, control } = useFormContext<SwapForm>();

  const currentToken = useWatch({
    control,
    name: label,
  });

  const swapping = useWatch({
    control,
    name: 'swapping',
  });

  const { symbol: currentSymbol } = currentToken ?? {
    symbol: undefined,
    type: undefined,
  };

  const opposite = useWatch({
    control,
    name: `${label === 'to' ? 'from' : 'to'}`,
  });

  const onSelect = async (metadata: AssetMetadata) => {
    if (
      (metadata.standard == TokenStandard.FA
        ? metadata.type
        : COIN_TYPE_TO_FA[metadata.type].toString()) ==
      (opposite.standard == TokenStandard.FA
        ? opposite.type
        : COIN_TYPE_TO_FA[opposite.type].toString())
    )
      return;

    if (
      metadata.standard === opposite.standard &&
      metadata.symbol === opposite.symbol
    ) {
      setValue(label === 'to' ? 'from' : 'to', {
        ...currentToken,
        value: '',
      });
    }

    setValue(label, {
      ...metadata,
      value: '',
      usdPrice: null,
    });

    fetch('https://rates-api-production.up.railway.app/api/fetch-quote', {
      method: 'POST',
      body: JSON.stringify({ coins: [PRICE_TYPE[metadata.symbol]] }),
      headers: { 'Content-Type': 'application/json', accept: '*/*' },
    })
      .then((response) => response.json())
      .then((data) => setValue(`${label}.usdPrice`, data[0].price))
      .catch(() => null);

    if (label === 'from') setValue('to.value', '');

    setValue('lock', false);
  };

  const openModal = () =>
    !swapping &&
    setModal(
      <Motion
        animate={{ scale: 1 }}
        initial={{ scale: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <SelectTokenModal
          onSelect={onSelect}
          closeModal={handleClose}
          isOutput={label === 'to'}
        />
      </Motion>,
      {
        isOpen: true,
        custom: true,
        opaque: false,
        allowClose: true,
      }
    );

  return (
    <Button
      py="2xs"
      pr="s"
      fontSize="s"
      variant="tonal"
      color="onSurface"
      borderRadius="xs"
      border="1px solid"
      disabled={swapping}
      onClick={openModal}
      bg="highestContainer"
      opacity={swapping ? 0.7 : 1}
      pl={currentSymbol ? '2xs' : 'm'}
      borderColor="#C6C6CA !important"
      {...(currentSymbol && {
        PrefixIcon: (
          <TokenIcon
            withBg
            size="1.1rem"
            network={network}
            symbol={currentSymbol}
            rounded={currentToken.standard === TokenStandard.COIN}
          />
        ),
      })}
    >
      <Typography
        size="large"
        variant="label"
        overflow="hidden"
        whiteSpace="nowrap"
        fontFamily="Satoshi"
        width={['0px', 'auto']}
        display={[currentSymbol ? 'none' : 'block', 'block']}
      >
        {currentSymbol ?? 'Select Token'}
      </Typography>
      <ChevronDownSVG maxHeight="1rem" maxWidth="1rem" width="100%" />
    </Button>
  );
};

export default SelectToken;
