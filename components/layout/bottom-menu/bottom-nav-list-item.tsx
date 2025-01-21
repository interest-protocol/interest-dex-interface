import { Box, Typography } from '@interest-protocol/ui-kit';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { BottomNavListItemProps } from './bottom-menu.types';

const BottomNavListItem: FC<BottomNavListItemProps> = ({
  name,
  path,
  Icon,
  onClick,
}) => {
  const { asPath, push } = useRouter();

  const goToPath = (path: any) => {
    if (path.startsWith('https://'))
      return window.open(path, '_blank')?.focus();

    push(path);
  };

  return (
    <Box flex="1" height="100%">
      <Box
        py="m"
        px="xs"
        gap="xs"
        key={v4()}
        height="100%"
        display="flex"
        cursor="pointer"
        borderRadius="xs"
        alignItems="center"
        alignContent="center"
        flexDirection="column"
        justifyContent="center"
        transition="all 350ms ease-in-out"
        color={asPath === path ? 'primary' : '#ffffff9d'}
        nHover={{ color: asPath !== path ? 'outline' : '' }}
        {...(onClick ? { onClick } : { onClick: () => goToPath(path) })}
      >
        <Box height="2rem" display="flex" alignItems="center">
          <Icon maxHeight="1.5rem" maxWidth="1.5rem" width="1.5rem" />
        </Box>
        <Typography
          size="large"
          variant="label"
          width="max-content"
          nHover={{
            opacity: 0.7,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default BottomNavListItem;
