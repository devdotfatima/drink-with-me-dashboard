import { useSearchParams } from "react-router-dom";
import TabsView from '../../shared/components/TabsView';
import Introduction from './Introduction';
import Privacy from './Privacy';

const Policies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();

  const tabParam = searchParams.get("tab") || "introduction";

  const contentTabs = [
    { id: "introduction", label: "Introduction", content: <Introduction /> },
    { id: "privacy", label: "Privacy Policy", content: <Privacy /> },
  ];

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  return (
    <div className="h-screen max-h-full">
      <h1 className="mb-4 text-2xl font-semibold">Policies</h1>
      <div className="mx-auto max-w-screen-2xl">
        <div className="my-3">
            <TabsView
              tabs={contentTabs}
              activeTabId={tabParam}
              onTabChange={handleTabChange}
            />
       
        </div>
      </div>
    </div>
  );
};

export default Policies;