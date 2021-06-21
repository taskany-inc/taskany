import React from 'react';

export interface CommonButtonProps {
    disabled?: boolean;
    text: string;
    view?: 'default' | 'primary';
    size?: 's' | 'm' | 'l';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
