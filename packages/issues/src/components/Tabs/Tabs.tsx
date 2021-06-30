import React, { useMemo, useContext, createContext, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
    useTabState as useReakitTabState,
    Tab as ReakitTab,
    TabList as ReakitTabList,
    TabPanel as ReakitTabPanel,
    TabStateReturn,
} from 'reakit/Tab';

import { is } from '../../utils/styles';
import { tabsBorderColor, backgroundColorPrimary, textFontFamily } from '../../@generated/tokens';

const useTabState = useReakitTabState;
const StyledTabs = styled.div``;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTab = styled(({ selected, ...props }) => <ReakitTab {...props} />)<{ selected: boolean }>`
    appearance: none;
    background-color: initial;

    display: inline-block;
    flex-shrink: 0;

    padding: 8px 16px;
    margin-bottom: -1px;

    font-size: 14px;
    font-family: ${textFontFamily};
    line-height: 23px;

    cursor: pointer;

    border-radius: 6px 6px 0 0;
    border: 1px solid transparent;

    ${is(
        { selected: true },
        css`
            border-color: ${tabsBorderColor};
            border-bottom-color: ${backgroundColorPrimary};
        `,
    )}
`;
const StyledTabMenu = styled(ReakitTabList)`
    display: flex;

    padding: 0 8px;

    border-bottom: 1px solid ${tabsBorderColor};
`;
const StyledTabPanel = styled(ReakitTabPanel)`
    padding: 8px;
`;

interface TabsProps {
    onChange?: (id: number) => void;
}
interface TabsContext {
    tab: TabStateReturn;
    selected: number;
    register: () => string;
    onChange: TabsProps['onChange'];
    setSelected: (id: number) => void;
}

// @ts-ignore
const TabsContext = createContext<TabsContext>();

export const Tabs: React.FC<TabsProps> = ({ children, onChange, ...initialState }) => {
    const state = useTabState(initialState);
    const tab = useMemo(() => state, Object.values(state));

    let tabId = 0;
    const register = () => String(tabId++);

    let selected = state.selectedId ? Number(state.selectedId) : 0;
    const setSelected = (id: number) => {
        selected = id;
    };

    return (
        <TabsContext.Provider
            value={{
                tab,
                register,
                onChange,
                selected,
                setSelected,
            }}
        >
            <StyledTabs>{children}</StyledTabs>
        </TabsContext.Provider>
    );
};

export const Tab: React.FC = (props) => {
    const { tab, register, onChange, selected, setSelected } = useContext(TabsContext);
    const id = register();
    const isSelected = tab.selectedId === id;

    useEffect(() => {
        const currendId = Number(id);
        if (isSelected && selected === currendId) {
            onChange && onChange(currendId);
            setSelected(currendId);
        }
    }, [selected]);

    return <StyledTab {...tab} {...props} id={id} selected={isSelected} />;
};

export const TabMenu: React.FC = (props) => {
    const { tab } = useContext(TabsContext);

    return <StyledTabMenu {...tab} {...props} />;
};

export const TabPanel: React.FC = (props) => {
    const { tab } = useContext(TabsContext);

    return <StyledTabPanel {...tab} {...props} />;
};
