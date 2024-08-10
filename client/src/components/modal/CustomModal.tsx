import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { useState, ReactNode } from "react";

interface CustomModalProps {
  buttonLabel: string;
  children: ReactNode;
  description?: string;
  title?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  buttonLabel,
  children,
  description,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {buttonLabel}
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <DialogTitle className="text-xl md:text-2xl font-semibold">
              {title && title}
            </DialogTitle>
            {description && (
              <Description className="mt-2 text-gray-600">
                {description}
              </Description>
            )}
            <div className="mt-4">{children}</div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default CustomModal;
