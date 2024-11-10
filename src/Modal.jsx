import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    isVisible: false,
    x: 0,
    y: 0,
    value: {},
  });

  const showModal = (x, y, value) => {
    setModalData({ isVisible: true, x, y, value });
  };

  const hideModal = () => {
    setModalData({ ...modalData, isVisible: false });
  };

  return (
    <ModalContext.Provider value={{ modalData, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
