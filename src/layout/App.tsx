import { Outlet } from "react-router";
import {
  Navbar,
  NavbarSection,
  NavbarSpacer,
} from "../shared/components/navbar/index.tsx";
import { useState } from "react";
import {
  Dropdown,
  DropdownButton,
} from "../shared/components/Dropdown/index.tsx";
import { AsideBar } from "./components/AsideBar.tsx";
import { MobileSidebar } from "./components/MobileSidebar.tsx";
import OpenMenuIcon from "../shared/components/icons/OpenMenuIcon.tsx";
import AccountDropdownMenu from "./components/AccountDropdownMenu.tsx";
import { UserIcon } from "@heroicons/react/20/solid";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="text-black antialiased lg:bg-primary-600">
      <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-primary-600">
        {/* Sidebar on desktop */}
        <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
          <AsideBar />
        </div>

        {/* Sidebar on mobile */}
        <MobileSidebar
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
        ></MobileSidebar>

        {/* Navbar on mobile */}
        <header className="flex items-center px-4 lg:hidden ">
          <div className="min-w-0 flex-1">
            <Navbar>
              <div
                onClick={() => setShowSidebar(true)}
                aria-label="Open navigation"
                className="size-10"
              >
                <OpenMenuIcon />
              </div>
              <NavbarSpacer />
              <NavbarSection>
                <Dropdown>
                  <DropdownButton>
                    <div className="w-fit h-fit rounded-full overflow-hidden">
                      <UserIcon
                        className="bg-primary-600  size-8"
                        scale={10}
                      />
                    </div>
                  </DropdownButton>
                  <AccountDropdownMenu anchor="bottom end" />
                </Dropdown>
              </NavbarSection>
            </Navbar>
          </div>
        </header>

        {/* Content */}
        <main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pl-64 lg:pr-2 lg:pt-2">
          <div className="grow p-6 lg:rounded-lg lg:bg-white lg:px-10 lg:py-20 lg:shadow-sm lg:ring-1 lg:ring-primary-900/5 ">
            <div className="mx-auto max-w-6xl">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
