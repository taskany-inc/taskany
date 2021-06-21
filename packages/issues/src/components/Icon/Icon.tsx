import React from 'react';
import dynamic from 'next/dynamic';

const TreeIcon = dynamic(() => import('./assets/tree.svg'));
const BellIcon = dynamic(() => import('./assets/bell.svg'));
const PlusIcon = dynamic(() => import('./assets/plus.svg'));
const UserIcon = dynamic(() => import('./assets/user.svg'));
const BookmarkIcon = dynamic(() => import('./assets/bookmark.svg'));
const BulbOnIcon = dynamic(() => import('./assets/bulb-on.svg'));
const CogIcon = dynamic(() => import('./assets/cog.svg'));
const KanabanIcon = dynamic(() => import('./assets/kanban.svg'));
const PieChartIcon = dynamic(() => import('./assets/pie-chart.svg'));

const componentsMap = {
    tree: TreeIcon,
    bell: BellIcon,
    plus: PlusIcon,
    user: UserIcon,
    bookmark: BookmarkIcon,
    bulbOn: BulbOnIcon,
    cog: CogIcon,
    kanban: KanabanIcon,
    pieChart: PieChartIcon,
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
    const Component = componentsMap[type];
    const sizePx = `${sizesMap[size]}px`;

    return (
        <span className={className}>
            <Component width={sizePx} height={sizePx} color={color} strokeWidth={stroke} />
        </span>
    );
};
