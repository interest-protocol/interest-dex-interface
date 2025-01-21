import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import { IPXSVG } from '@/components/svg';

import { SOCIAL_LINK } from './ social-link.data';

const Footer: FC = () => {
  const [isMobile] = useState(() =>
    typeof window !== 'undefined'
      ? !window.matchMedia('(min-width: 64em)').matches
      : false
  );

  return (
    <Box
      gap="s"
      px="2xl"
      zIndex={0}
      as="footer"
      width="100%"
      alignItems="center"
      flexDirection="column"
      mb={isMobile ? '2xl' : ''}
      justifyContent="space-between"
      display={['flex', 'flex', 'flex', 'grid']}
      gridTemplateColumns={['1fr', '1fr', '1fr', '1fr auto 1fr']}
    >
      <Link
        target="_blank"
        rel="noreferrer"
        title="Visit our landing page"
        href="https://www.interestprotocol.com/"
      >
        <Box
          width="2.5rem"
          height="2.5rem"
          color="onSurface"
          position="relative"
          nHover={{ color: 'primary' }}
        >
          <IPXSVG maxHeight="100%" maxWidth="100%" width="100%" />
        </Box>
      </Link>
      <Box
        gap="m"
        display="flex"
        position="relative"
        flexDirection="column-reverse"
      >
        <Box textAlign="center" pb="m">
          <Typography
            size="medium"
            variant="label"
            color="onSurface"
            textTransform="capitalize"
          >
            &copy; Interest PROTOCOL {new Date().getFullYear()}
          </Typography>
        </Box>
        <Box
          gap="xs"
          display="flex"
          justifySelf="end"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography color="onSurface" variant="label" size="medium">
            Follow us
          </Typography>
          <Box display="flex" gap="xs">
            {SOCIAL_LINK.map(({ title, pathname, Icon }) => (
              <Link
                key={v4()}
                href={pathname}
                target="_blank"
                rel="noreferrer"
                title={`Follow us on ${title}`}
              >
                <Box
                  p="xs"
                  width="2.5rem"
                  height="2.5rem"
                  color="onSurface"
                  border="1px solid"
                  borderRadius="full"
                  borderColor="outlineVariant"
                  nHover={{ borderColor: 'outline' }}
                >
                  <Icon maxHeight="100%" maxWidth="100%" width="100%" />
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
