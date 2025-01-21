import { FC } from 'react';

import { SVGProps } from './svg.types';

const More: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.125 6.5C3.125 3.87479 3.15311 3 6.625 3C10.0969 3 10.125 3.87479 10.125 6.5C10.125 9.12521 10.1361 10 6.625 10C3.11393 10 3.125 9.12521 3.125 6.5Z"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.125 6.5C14.125 3.87479 14.1531 3 17.625 3C21.0969 3 21.125 3.87479 21.125 6.5C21.125 9.12521 21.1361 10 17.625 10C14.1139 10 14.125 9.12521 14.125 6.5Z"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.125 17.5C3.125 14.8748 3.15311 14 6.625 14C10.0969 14 10.125 14.8748 10.125 17.5C10.125 20.1252 10.1361 21 6.625 21C3.11393 21 3.125 20.1252 3.125 17.5Z"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.125 17.5C14.125 14.8748 14.1531 14 17.625 14C21.0969 14 21.125 14.8748 21.125 17.5C21.125 20.1252 21.1361 21 17.625 21C14.1139 21 14.125 20.1252 14.125 17.5Z"
      stroke="white"
      strokeOpacity="0.6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default More;
