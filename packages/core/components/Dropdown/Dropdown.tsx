import React from 'react';
import styled, { css } from 'styled-components';
import { usePopoverState, Popover, PopoverArrow, PopoverDisclosure } from 'reakit/Popover';

export const useDropdownState = usePopoverState;
export const DropdownAnchor: React.FC<React.ComponentProps<typeof PopoverDisclosure>> = (props) => (
    <PopoverDisclosure
        {...props}
        style={{
            appearance: 'none',
            background: 'none',
            padding: 0,
            border: 0,
            outline: 'none',
            cursor: 'pointer',
            ...props.style,
        }}
    />
);

const StyledDropdown = styled.div<{ visible: boolean }>`
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

    .fill {
        fill: rgb(255, 255, 255);
    }

    .stroke {
        fill: rgba(33, 33, 33, 0.25);
    }
`;

export const Dropdown: React.FC<ReturnType<typeof useDropdownState>> = ({ children, ...state }) => (
    <Popover aria-label="dropdown" style={{ border: 0, background: 'none', padding: 0, outline: 'none' }} {...state}>
        {typeof window !== 'undefined' && state.visible && (
            <StyledDropdown tabIndex={0} visible={state.visible}>
                <PopoverArrow {...state} />
                {children}
            </StyledDropdown>
        )}
    </Popover>
);
