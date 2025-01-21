import { Box } from '@interest-protocol/ui-kit';
import { useAptosWallet } from '@razorlabs/wallet-kit';

import { MoreSVG, WalletMenuSVG } from '@/components/svg';
import ConnectWalletModal from '@/components/wallet/connect-wallet/connect-wallet-modal';
import { useModal } from '@/hooks/use-modal';

import { BOTTOM_MENU_ITEMS } from './bottom-menu.data';
import BottomNavListItem from './bottom-nav-list-item';

const BottomNavList = () => {
  const account = useAptosWallet();

  const { setModal, handleClose } = useModal();

  const handleOpenModal = () =>
    setModal(<ConnectWalletModal handleClose={handleClose} />, {
      isOpen: true,
      custom: true,
      onClose: handleClose,
    });

  return (
    <Box display="flex" bg="#1d1f24">
      {BOTTOM_MENU_ITEMS.map(({ name, path, Icon }, index) => (
        <BottomNavListItem key={index} Icon={Icon} name={name} path={path} />
      ))}

      <BottomNavListItem
        Icon={account?.address ? MoreSVG : WalletMenuSVG}
        name={account?.address ? 'More' : 'Connect'}
        {...(!account?.address
          ? { onClick: handleOpenModal }
          : { path: 'more' })}
      />
    </Box>
  );
};

export default BottomNavList;
