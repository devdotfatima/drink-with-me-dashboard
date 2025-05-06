import * as Headless from "@headlessui/react";
import { AsideBar } from "./AsideBar";
import CloseMenuIcon from "../../shared/components/icons/CloseMenuIcon";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <Headless.Dialog
      open={open}
      onClose={onClose}
      className=" bg-primary-600 lg:hidden"
    >
      <Headless.DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 transition data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <Headless.DialogPanel
        transition
        className="fixed inset-y-0 w-full max-w-80 p-2 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
      >
        <div className="flex h-full flex-col rounded-lg bg-primary-600 shadow-sm ring-1 ring-zinc-950/5  dark:ring-white/10">
          <div className="-mb-3 px-4 pt-3 flex justify-end ">
            <Headless.CloseButton
              onClick={onClose}
              aria-label="Close navigation"
              className={"text-white size-6"}
            >
              <CloseMenuIcon />
            </Headless.CloseButton>
          </div>
          <AsideBar />
        </div>
      </Headless.DialogPanel>
    </Headless.Dialog>
  );
}
