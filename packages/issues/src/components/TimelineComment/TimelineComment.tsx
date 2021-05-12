import React from 'react';
import styled from 'styled-components';
import { inputBorderColor, inputBackgroundColorFocus } from '@/generated/tokens';

import { User } from '../../components/User/User';

interface TimelineCommentProps {
    image: string;
}

const StyledTimelineComment = styled.div`
    position: relative;
    padding-left: 56px;
`;
const StyledTimelineUser = styled.div`
    float: left;
    margin-left: -56px;
`;
const StyledTimelineCommentContent = styled.div`
    position: relative;
    padding-bottom: 5px;
    max-width: 850px;

    border: 1px solid ${inputBorderColor};
    border-radius: 6px;

    &::before {
        position: absolute;
        top: 11px;
        right: 100%;
        left: -8px;
        display: block;
        width: 8px;
        height: 16px;
        pointer-events: none;
        content: ' ';
        clip-path: polygon(0 50%, 100% 0, 100% 100%);

        background-color: ${inputBorderColor};
    }

    &::after {
        position: absolute;
        top: 11px;
        right: 100%;
        left: -8px;
        display: block;
        width: 8px;
        height: 16px;
        pointer-events: none;
        content: ' ';
        clip-path: polygon(0 50%, 100% 0, 100% 100%);

        margin-left: 1px;

        background-color: ${inputBackgroundColorFocus};
    }
`;

export const TimelineComment: React.FC<TimelineCommentProps> = ({ image, children }) => {
    return (
        <StyledTimelineComment>
            <StyledTimelineUser>{<User src={image} size={40} />}</StyledTimelineUser>

            <StyledTimelineCommentContent>{children}</StyledTimelineCommentContent>
        </StyledTimelineComment>
    );
};
