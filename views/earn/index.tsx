import { Box, Typography } from '@interest-protocol/ui-kit';
import { FC, useState } from 'react';
import { v4 } from 'uuid';

import Layout from '@/components/layout';

import { EarnTabEnum } from './earn.types';
import EarnCard from './earn-card';
import { EARN_CARD_DATA } from './earn-card/earn-card.data';
import EarnCardWrapper from './earn-card-wrapper';
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
        <EarnCardWrapper>
          {EARN_CARD_DATA.map(
            ({ label, tokenName, balance, TokenIcon, earnAmount }) => {
              return (
                <EarnCard
                  label={label}
                  tokenName={tokenName}
                  key={v4()}
                  balance={balance}
                  TokenIcon={TokenIcon}
                  earnAmount={earnAmount}
                />
              );
            }
          )}
        </EarnCardWrapper>
      </Box>
    </Layout>
  );
};

export default Earn;
