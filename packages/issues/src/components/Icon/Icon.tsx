import React from 'react';
import dynamic from 'next/dynamic';

const TreeIcon = dynamic(() => import('./assets/tree.svg'));
const BellIcon = dynamic(() => import('teenyicons/outline/bell.svg'));
const PlusIcon = dynamic(() => import('teenyicons/outline/plus-circle.svg'));
const UserIcon = dynamic(() => import('teenyicons/outline/user.svg'));
const BookmarkIcon = dynamic(() => import('teenyicons/outline/bookmark.svg'));
const BulbOnIcon = dynamic(() => import('teenyicons/outline/double-caret-up-circle.svg'));
const CogIcon = dynamic(() => import('teenyicons/outline/cog.svg'));
const KanabanIcon = dynamic(() => import('teenyicons/outline/servers.svg'));
const PieChartIcon = dynamic(() => import('teenyicons/outline/pie-chart-alt.svg'));
const ArrowDownSmall = dynamic(() => import('teenyicons/outline/down-small.svg'));

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
    arrowDownSmall: ArrowDownSmall,
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
        <span className={className} style={{ lineHeight: 'initial' }}>
            <Component width={sizePx} height={sizePx} color={color} strokeWidth={stroke} />
        </span>
    );
};
