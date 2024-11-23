import BigNumber from 'bignumber.js';
import { UseFormSetValue } from 'react-hook-form';

export interface ICreateTokenPool {
  active: boolean;
  quoteValue: string;
  tokenValue: string;
  quoteUsdPrice: number;
  quoteValueBN: BigNumber;
  tokenValueBN: BigNumber;
}

export interface ICreateTokenForm {
  name: string;
  error: string;
  symbol: string;
  supply: number;
  decimals: number;
  imageUrl?: string;
  projectUrl?: string;
  fixedSupply: boolean;
  explorerLink: string;
  executionTime: string;
  pool: ICreateTokenPool;
}

export interface CreateTokenFormImageProps {
  setValue: UseFormSetValue<ICreateTokenForm>;
}
