import { createContext, useContext, useState, ReactNode } from 'react';

type Tab = 'search' | 'favorites';

interface TabContextType {
    currentTab: Tab;
    setCurrentTab: (tab: Tab) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTab = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTab must be used within a TabProvider');
    }
    return context;
};

export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [currentTab, setCurrentTab] = useState<Tab>('search');

    return (
        <TabContext.Provider value={{ currentTab, setCurrentTab }}>
            {children}
        </TabContext.Provider>
    );
};
