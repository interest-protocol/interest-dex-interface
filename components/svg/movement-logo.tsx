import { FC } from 'react';

import { SVGProps } from './svg.types';

const MovementLogo: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 32 25"
    fill="none"
    {...props}
  >
    <path
      d="M27.3262 6.8751L27.3712 6.85611C27.5052 6.79876 27.6036 6.76745 27.681 6.7576L27.7661 6.74317C27.9405 6.70729 28.1205 6.68935 28.3005 6.68935C29.3833 6.68935 30.2875 6.35196 30.9154 5.71377C31.3671 5.25431 31.6514 4.65799 31.7508 3.96773L31.8059 3.96844V0H25.1928V2.87113C25.1768 3.078 25.1781 3.26833 25.1795 3.43685C25.1809 3.6219 25.182 3.79675 25.1597 3.92938L25.1534 3.9716C25.0787 4.53239 24.8077 5.05307 24.3905 5.4376C23.9632 5.83163 23.7633 5.91818 23.6974 5.93682C23.6311 5.95582 23.5348 5.94702 23.2564 5.90938C23.0164 5.87701 22.6875 5.83269 22.2863 5.83269C20.5725 5.83269 19.1361 7.12665 18.9449 8.84384C18.9023 9.23435 18.9264 9.52636 18.9438 9.7392C18.9634 9.97597 18.9693 10.0474 18.8873 10.2831C18.7248 10.7464 18.3787 11.1764 17.9131 11.4933C17.4474 11.8103 16.9112 11.9852 16.404 11.9852L16.3545 11.9845L16.3049 11.9852C15.7977 11.9852 15.2616 11.8107 14.7959 11.4933C14.3299 11.1764 13.9838 10.7464 13.822 10.2842C13.7396 10.0474 13.7452 9.97562 13.7651 9.7385C13.7826 9.52565 13.8066 9.234 13.7641 8.84243C13.5733 7.1263 12.1368 5.83233 10.423 5.83233C10.0218 5.83233 9.69287 5.87666 9.45113 5.90938C9.17486 5.94667 9.07823 5.95547 9.01195 5.93647C8.94602 5.91747 8.74614 5.83128 8.31883 5.4369C7.90163 5.05272 7.63093 4.53204 7.55593 3.97125L7.54966 3.92903C7.53884 3.86465 7.53361 3.79042 7.53117 3.70985V0H0.916646V3.36367C0.908972 4.3111 1.21211 5.12379 1.79256 5.71413C2.4201 6.35231 3.32427 6.68935 4.40704 6.68935C4.58704 6.68935 4.76669 6.70764 4.9418 6.74353L5.02657 6.7576C5.10366 6.7678 5.20203 6.79911 5.33702 6.85646L5.38133 6.8751C5.82957 7.05382 6.22236 7.35322 6.51712 7.74126C7.24268 8.69538 7.24478 10.0305 6.5227 10.9874C6.28619 11.3012 5.97852 11.563 5.63353 11.7449L5.60248 11.7618C5.50795 11.8138 5.42353 11.8525 5.34609 11.8796C5.31156 11.8916 5.28051 11.9014 5.25156 11.9099L5.21877 11.9197C4.95785 12.0042 4.68471 12.0467 4.40739 12.0467C2.31092 12.0467 0.902344 13.347 0.902344 15.2823C0.902344 16.793 1.58535 17.5769 2.15813 17.9684C2.85719 18.4462 3.70031 18.5816 4.50751 18.6562L4.56332 18.6626C4.7775 18.6907 4.95819 18.735 5.16575 18.8103L5.26586 18.8487L5.28296 18.855C5.82643 19.0422 6.28166 19.4246 6.56526 19.9322C6.72537 20.219 6.8363 20.5944 6.87746 20.9887C6.89351 21.1439 6.90432 21.2941 6.91478 21.4426C6.92281 21.5555 6.93188 21.6822 6.94409 21.8095V24.7232H13.5572V20.8325L13.5105 20.8318C13.4016 20.0835 13.0493 19.3982 12.4919 18.8659C12.4427 18.8195 12.3974 18.7801 12.3611 18.7487L12.3387 18.7294C11.6271 18.1074 10.7017 18.0909 10.0257 18.0785H10.0183C9.90531 18.0764 9.79822 18.0743 9.70368 18.0698L9.60217 18.0539L9.38485 18.005L9.18009 17.9413L8.95928 17.8527C8.728 17.7468 8.51208 17.6089 8.32057 17.4446L8.27766 17.4073C7.66582 16.8556 7.36233 16.1756 7.34978 15.3288C7.35152 14.7237 7.54338 14.1502 7.90476 13.67C8.25708 13.2021 8.75626 12.8538 9.3102 12.6891C9.87112 12.5227 10.9173 12.5185 11.4217 12.6811C12.3408 12.9769 12.9932 13.8276 13.0444 14.7979C13.0486 14.8781 13.0455 14.9622 13.042 15.0607C13.0315 15.3453 13.0172 15.7351 13.1801 16.228C13.6409 17.5994 14.9156 18.5243 16.3555 18.5299C17.7917 18.5243 19.0659 17.599 19.5278 16.2256C19.69 15.7355 19.6757 15.3457 19.6652 15.0597C19.6617 14.9622 19.6586 14.8781 19.6628 14.7983C19.7141 13.828 20.3664 12.9769 21.2855 12.6814C21.79 12.5189 22.8358 12.5231 23.3967 12.6895C23.951 12.8545 24.4505 13.2028 24.8025 13.6707C25.1638 14.1509 25.3557 14.7244 25.3574 15.3295C25.3449 16.1763 25.0414 16.8564 24.4292 17.4083L24.3901 17.4425C24.1955 17.6092 23.9792 17.7475 23.7479 17.8534L23.5275 17.942L23.3227 18.0057L23.1448 18.0472L23.0039 18.0705C22.9097 18.075 22.8023 18.0771 22.6892 18.0793H22.6819C22.0059 18.0916 21.0804 18.1081 20.3706 18.7287L20.3461 18.7502C20.3099 18.7815 20.2649 18.8205 20.2146 18.868C19.6778 19.3806 19.3311 20.0381 19.21 20.7569H19.1507V24.7243H25.7638V21.8106C25.776 21.6836 25.7851 21.5566 25.7931 21.4436C25.8036 21.2976 25.8144 21.1467 25.8305 20.9905C25.8716 20.5954 25.9825 20.22 26.1427 19.9333C26.4263 19.426 26.8815 19.0436 27.425 18.856L27.5422 18.8114C27.7497 18.7364 27.9304 18.6921 28.1449 18.6636L28.2004 18.6573C29.0076 18.5827 29.8507 18.4472 30.5498 17.9695C31.5879 17.2602 31.8056 16.1172 31.8056 15.2834C31.8056 13.3481 30.397 12.0478 28.3005 12.0478C28.0232 12.0478 27.7501 12.0049 27.4891 11.9208L27.4564 11.9109C27.4274 11.9025 27.3964 11.8926 27.3639 11.8814C27.2844 11.8539 27.2 11.8149 27.1033 11.7618L27.0744 11.7459C26.7294 11.564 26.4217 11.3023 26.1849 10.9885C25.4628 10.0316 25.4649 8.69643 26.1905 7.74232C26.4852 7.35462 26.878 7.05488 27.3262 6.87651V6.8751Z"
      fill="currentColor"
    />
  </svg>
);

export default MovementLogo;
