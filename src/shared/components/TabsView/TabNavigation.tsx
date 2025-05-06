import { TabItem } from ".";

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string | number;
  setActiveTab: (id: string | number) => void;
}

const TabNavigation = ({ tabs, activeTab, setActiveTab }:TabNavigationProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <button
          className={` ${
            activeTab === tab.id && "bg-primary-600 text-white"
          } rounded-md w-full sm:w-auto text-sm  px-3 py-2  font-medium capitalize   `}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
