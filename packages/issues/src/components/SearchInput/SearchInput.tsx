import React from 'react';
import styled from 'styled-components';
import { Input } from 'reakit/Input';

interface SearchInputProps {
    placeholder?: string;
}

const StyledSearchInputWrapper = styled.div`
    max-width: 272px;
`;

const StyledSearchLabel = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    min-height: 28px;
    width: 100%;
    max-width: 100%;
    padding: 0;

    font-size: inherit;
    font-weight: 400;
    line-height: 20px;

    color: #f0f6fc;
    vertical-align: middle;

    background-color: #0d1117;

    border: 1px solid #21262d;
    border-radius: 6px;

    box-shadow: none;
`;

const StyledHeaderInput = styled(Input)`
    display: table-cell;
    box-sizing: border-box;

    width: 100%;
    min-height: 28px;

    padding: 5px 12px;
    margin: 0;

    font-size: inherit;
    color: inherit;

    background: none;
    border: 0;
    outline: none;

    box-shadow: none;

    ::placeholder {
        opacity: 0.2;
        color: #fff;
    }
`;

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
    return (
        <StyledSearchInputWrapper>
            <form>
                <StyledSearchLabel>
                    <StyledHeaderInput placeholder={placeholder} />
                </StyledSearchLabel>
            </form>
        </StyledSearchInputWrapper>
    );
};
