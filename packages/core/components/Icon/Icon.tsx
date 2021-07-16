import React from 'react';
import dynamic from 'next/dynamic';

const componentsMap = {
    tree: dynamic(() => import('./assets/tree.svg')),
    bell: dynamic(() => import('teenyicons/outline/bell.svg')),
    plus: dynamic(() => import('teenyicons/outline/plus-circle.svg')),
    user: dynamic(() => import('teenyicons/outline/user.svg')),
    bookmark: dynamic(() => import('teenyicons/outline/bookmark.svg')),
    bulbOn: dynamic(() => import('teenyicons/outline/double-caret-up-circle.svg')),
    cog: dynamic(() => import('teenyicons/outline/cog.svg')),
    kanban: dynamic(() => import('teenyicons/outline/servers.svg')),
    pieChart: dynamic(() => import('teenyicons/outline/pie-chart-alt.svg')),
    arrowDownSmall: dynamic(() => import('teenyicons/outline/down-small.svg')),
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
    className?: string;
}

export const Icon: React.FC<IconProps> = ({ type, size, color, stroke = 1, className }) => {
    const Component: React.ComponentType<any> = componentsMap[type];
    const sizePx = `${sizesMap[size]}px`;

    return (
        <span className={className} style={{ lineHeight: 'initial' }}>
            <Component width={sizePx} height={sizePx} color={color} strokeWidth={stroke} />
        </span>
    );
};
