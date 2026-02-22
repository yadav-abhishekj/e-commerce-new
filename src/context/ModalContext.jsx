import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import GlobalModal from "../components/GlobalModal";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalConfig, setModalConfig] = useState(null);

  const openModal = (config) => {
    setModalConfig(config);
  };

  const closeModal = () => {
    setModalConfig(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalConfig &&
        createPortal(
          <GlobalModal {...modalConfig} onClose={closeModal} />,
          document.getElementById("modal-root"),
        )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
