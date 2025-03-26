import { useState } from "react";
import { Button } from "./ui/button";

interface LayoutProps {
  apiKey: string | null;
}

const Layout = ({ apiKey }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button className="bg-red-100 text-black" onClick={openModal}>
        Mode AI
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Mode {apiKey}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <p className="">Are you sure you want to proceed?</p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                variant="outline"
                className="bg-green-100"
                onClick={() => {
                  // Add your accept logic here
                  closeModal();
                }}
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
