import React from 'react';
import dynamic from 'next/dynamic';

const TreeIcon = dynamic(() => import('./assets/tree.svg'));
const BellIcon = dynamic(() => import('./assets/bell.svg'));
const PlusIcon = dynamic(() => import('./assets/plus.svg'));
const UserIcon = dynamic(() => import('./assets/user.svg'));

const componentsMap = {
    tree: TreeIcon,
    bell: BellIcon,
    plus: PlusIcon,
    user: UserIcon,
};

const sizesMap = {
    s: 16,
    m: 32,
    l: 48,
};

interface IconProps {
    type: keyof typeof componentsMap;
    size: keyof typeof sizesMap;
    color?: string;
    stroke?: number;
}

export const Icon: React.FC<IconProps> = ({ type, size, color, stroke = 2 }) => {
    const Component = componentsMap[type];
    const sizePx = `${sizesMap[size]}px`;

    return (
        <div style={{ display: 'inherit' }}>
            <Component width={sizePx} height={sizePx} color={color} strokeWidth={stroke} />
        </div>
    );
};
