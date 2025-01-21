import { FC } from 'react';

import { SVGProps } from './svg.types';

const Asterisk: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 8 8" fill="none" {...props}>
    <g opacity="0.6">
      <path
        d="M3.99992 0.916626V7.08329"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M2.30196 3.99992H0.916626"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M7.08339 3.99992H4.00806"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M4.00795 3.99194L1.81995 6.18028"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M6.18036 1.81958L5.3147 2.68525"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M6.18028 6.17991L1.81995 1.81958"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </g>
  </svg>
);

export default Asterisk;
