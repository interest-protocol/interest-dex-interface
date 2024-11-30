import { NextPage } from 'next';

import { SEO } from '@/components';
import Earn from '@/views/earn';

const EarnPage: NextPage = () => (
  <>
    <SEO pageTitle="Earn" />
    <Earn />
  </>
);

export default EarnPage;
