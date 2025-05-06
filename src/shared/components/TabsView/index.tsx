
import { ReactNode } from "react";


export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};
type TabsViewProps = {
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
};

const TabsView = ({ tabs, activeTabId, onTabChange }: TabsViewProps) => (
  <>
    <div className="flex gap-4  mb-4">
      {tabs.map((tab) => (

        <button
          className={` ${activeTabId === tab.id && "bg-primary-600 text-white"
            } rounded-md w-full sm:w-auto text-sm  px-3 py-2  font-medium capitalize   `}
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div>{tabs.find((t) => t.id === activeTabId)?.content}</div>
  </>
);

export default TabsView;


