import { Box, Typography } from '@interest-protocol/ui-kit';
import Link from 'next/link';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';

import { EarnTabEnum } from './earn.types';
import EarnFilter from './earn-filter';
import Header from './header';

const Earn: FC = () => {
  const [tab, setTab] = useState<EarnTabEnum>(EarnTabEnum.Earn);
  return (
    <Layout>
      <Box py="xl">
        <Header setTab={setTab} currentTab={tab} />
      </Box>
      <Box
        px="s"
        gap="2xs"
        display="flex"
        bg="container"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius="xs"
        minHeight="30rem"
        color="onSurface"
        flexDirection="column"
        py={['s', 's', 's', '2xl']}
      >
        <EarnFilter />
        <Typography variant="title" size="large" p="m">
          {tab == EarnTabEnum.Earn ? 'Earn' : 'My Position'}
        </Typography>
        <Box
          px="s"
          gap="xl"
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          {[1, 2, 3, 4].map((item) => {
            return (
              <Link
                key={v4()}
                href={`${Routes[RoutesEnum.EarnDetails]}/${item}`}
              >
                <Box
                  p="m"
                  height="20.5rem"
                  width="23.368rem"
                  borderRadius="2xs"
                  bg="lowestContainer"
                  border="0.063rem solid"
                  borderColor="outlineVariant"
                  nHover={{
                    cursor: 'pointer',
                    borderColor: '#76767A',
                    boxShadow: '0px 24px 46px -10px rgba(13, 16, 23, 0.16)',
                    '.arrow-wrapper': { opacity: 1 },
                  }}
                >
                  Ean card
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Earn;
