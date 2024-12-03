import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import Layout from '@/components/layout';
import { Routes, RoutesEnum } from '@/constants';
import EarnTitleBar from '@/views/components/earn-title-bar';

import EarnCard from '../earn-card';
import { EARN_CARD_DATA } from '../earn-card/earn-card.data';
import EarnCardWrapper from '../earn-card-wrapper';

const EarnDetails = () => {
  const { push } = useRouter();
  const loading = false;
  return (
    <Layout>
      <EarnTitleBar
        loading={loading}
        onBack={() => push(Routes[RoutesEnum.Earn])}
      />
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
    </Layout>
  );
};
export default EarnDetails;
