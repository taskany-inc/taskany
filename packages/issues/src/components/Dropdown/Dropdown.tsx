import React from 'react';
import styled, { css } from 'styled-components';
import { usePopoverState, Popover, PopoverArrow, PopoverDisclosure } from 'reakit/Popover';

export const useDropdownState = usePopoverState;
export const DropdownAnchor = styled(PopoverDisclosure)`
    appearance: none;
    background: none;
    padding: 0;
    border: 0;
    outline: none;

    cursor: pointer;
`;

const NonStyledPopover = styled(Popover)`
    border: 0;
    background: none;
    padding: 0;
    outline: none;
`;

const StyledDropdown = styled.div<{ visisble: boolean }>`
    box-sizing: border-box;

    outline: none;

    background-color: #fff;
    padding: 16px;

    border-radius: 4px;
    border: 1px solid rgba(33, 33, 33, 0.25);

    opacity: 0;

    ${({ visible }) =>
        visible &&
        css`
            opacity: 1;
        `}
`;

const StyledArrow = styled(PopoverArrow)`
    .fill {
        fill: rgb(255, 255, 255);
    }

    .stroke {
        fill: rgba(33, 33, 33, 0.25);
    }
`;

export const Dropdown: React.FC<ReturnType<typeof useDropdownState>> = ({ children, ...state }) => (
    <>
        <NonStyledPopover aria-label="dropdown" {...state}>
            <StyledDropdown tabIndex={0} visible={state.visible}>
                <StyledArrow {...state} />
                {children}
            </StyledDropdown>
        </NonStyledPopover>
    </>
);
