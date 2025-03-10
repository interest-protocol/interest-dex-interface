import { FC } from 'react';

import { SVGProps } from './svg.types';

const WalletMenu: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      d="M12.785 2.51814L12.755 2.58814L9.855 9.31814M12.785 2.51814C9.805 1.37814 8.325 2.06814 7.015 5.09814C6.985 5.14814 6.965 5.20814 6.945 5.26814L6.875 5.42814L6.835 5.52814M12.785 2.51814C12.935 2.56814 13.075 2.63814 13.225 2.69814L15.435 3.62814C16.665 4.13814 17.525 4.66814 18.045 5.30814C18.145 5.42814 18.225 5.53814 18.295 5.66814C18.385 5.80814 18.455 5.94814 18.495 6.09814C18.535 6.18814 18.565 6.27814 18.585 6.35814C18.855 7.19814 18.695 8.22814 18.175 9.51814C17.725 9.37814 17.245 9.31814 16.765 9.31814H9.855M9.855 9.31814H7.005C6.325 9.31814 5.675 9.45814 5.085 9.70814M5.085 9.70814L6.835 5.52814M5.085 9.70814C3.345 10.4581 2.125 12.1881 2.125 14.1981V11.2681C2.125 8.42814 4.145 6.05814 6.835 5.52814M21.6467 14.1984V16.1484C21.6467 16.3484 21.6367 16.5484 21.6267 16.7484C21.4367 20.2384 19.4867 21.9984 15.7867 21.9984H7.98672C7.74672 21.9984 7.50672 21.9784 7.27672 21.9484C4.09672 21.7384 2.39672 20.0384 2.18672 16.8584C2.15672 16.6284 2.13672 16.3884 2.13672 16.1484V14.1984C2.13672 12.1884 3.35672 10.4584 5.09672 9.70836C5.69672 9.45836 6.33672 9.31836 7.01672 9.31836H16.7767C17.2667 9.31836 17.7467 9.38836 18.1867 9.51836C20.1767 10.1284 21.6467 11.9884 21.6467 14.1984ZM21.6436 11.2677V14.1977C21.6436 11.9977 20.1836 10.1277 18.1836 9.52766C18.7036 8.22766 18.8536 7.20766 18.6036 6.35766C18.5836 6.26766 18.5536 6.17766 18.5136 6.09766C20.3736 7.05766 21.6436 9.02766 21.6436 11.2677Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default WalletMenu;
