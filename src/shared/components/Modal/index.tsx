import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ModalPropsT } from "./types";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryAction,
  secondaryAction,
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
  pending,
}: ModalPropsT) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative" as="div">
      <DialogBackdrop className="fixed inset-0 bg-black/45 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-2xl">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {title && (
                <header className="mt-3 text-center sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                </header>
              )}

              <div className="mt-2">
                {children || (
                  <p className="text-sm text-gray-500">
                    Content goes here. Pass children to customize.
                  </p>
                )}
              </div>
            </div>
            <footer className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {primaryAction && (
                <button
                  type="button"
                  disabled={pending}
                  onClick={primaryAction}
                  className={
                    "inline-flex min-w-20 w-full justify-center rounded-md enabled:bg-primary-600 disabled:bg-primary-600-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-300 sm:ml-3 sm:w-auto enabled:cursor-pointer disabled:cursor-not-allowed"
                  }
                >
                  {pending ? (
                    <span className="gap-2 inline-flex items-center">
                      <ArrowPathIcon className="animate-spin  size-3 justify-center items-center" />
                      {primaryLabel}
                    </span>
                  ) : (
                    primaryLabel
                  )}
                </button>
              )}
              {secondaryAction && (
                <button
                  type="button"
                  disabled={pending}
                  onClick={secondaryAction}
                  className="mt-3 inline-flex min-w-20 w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto enabled:cursor-pointer disabled:cursor-not-allowed"
                >
                  {secondaryLabel}
                </button>
              )}
            </footer>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
