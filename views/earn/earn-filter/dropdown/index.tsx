import { Box, Button, Motion, RadioButton } from '@interest-protocol/ui-kit';
import { not } from 'ramda';
import { FC, useId, useState } from 'react';
import { v4 } from 'uuid';

import { ArrowDownSVG, ArrowUpSVG } from '@/components/svg';
import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { FilterItemProps, FormFilterValue } from '../../earn.types';
import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({ label, type, filterData, disabled }) => {
  const boxId = useId();

  const [isOpen, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<FilterItemProps>({
    type: type,
    value: '' as FormFilterValue,
  });

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == boxId) ||
      event?.composedPath()?.some((node: any) => node?.id == boxId)
    )
      return;

    setOpen(false);
  };

  const handleSelect = (option: FilterItemProps) => {
    if (option.value != selectedOption.value) {
      setSelectedOption(option);
    }
    setOpen(not);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative">
      <Box>
        <Button
          py="s"
          my="xs"
          mx={['unset', 'unset', 'unset', 'xs']}
          variant="filled"
          color="onSurface"
          bg={isOpen ? 'onPrimary' : 'surface'}
          width={['fill-available', 'fill-available', 'fill-available', '8rem']}
          onClick={() => setOpen(!isOpen)}
          nHover={{
            backgroundColor: 'container',
          }}
          SuffixIcon={
            <Box display="flex" justifyContent="center">
              {isOpen ? (
                <ArrowDownSVG
                  maxWidth="1.5rem"
                  maxHeight="1.5rem"
                  width="100%"
                />
              ) : (
                <ArrowUpSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
              )}
            </Box>
          }
        >
          {label}
        </Button>
        {!disabled && isOpen && (
          <Motion
            animate={{ scale: 1 }}
            initial={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={dropdownRef}>
              <Box
                mx="s"
                my="xs"
                zIndex="1"
                bg="surface"
                color="onSurface"
                display="flex"
                minWidth={['8rem', '8rem', '8rem', '15rem']}
                position="absolute"
                borderRadius="xs"
                flexDirection="column"
                cursor={disabled ? 'not-allowed' : 'pointer'}
              >
                {filterData.map((value) => (
                  <Box
                    p="l"
                    gap="xs"
                    key={v4()}
                    display="flex"
                    color="onSurface"
                    borderRadius="xs"
                    textTransform="capitalize"
                    justifyContent="space-between"
                    nHover={{ bg: 'lowestContainer' }}
                    onClick={() => handleSelect(value)}
                  >
                    {value.value}
                    <RadioButton
                      defaultValue={selectedOption.value === value.value}
                    />
                  </Box>
                ))}
              </Box>
            </div>
          </Motion>
        )}
      </Box>
    </Box>
  );
};

export default Dropdown;
