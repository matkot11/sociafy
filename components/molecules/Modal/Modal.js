import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ModalWrapper, StyledButton } from "./Modal.styles";

const Modal = ({ handleClose, isOpen, children }) => {
  const [_document, set_document] = useState(null);

  useEffect(() => {
    set_document(document);
  }, []);

  if (_document) {
    return (
      <ModalWrapper
        appElement={document.getElementById("__next")}
        isOpen={isOpen}
        onRequestClose={handleClose}
      >
        {children}
        <StyledButton onClick={handleClose}>X</StyledButton>
      </ModalWrapper>
    );
  }
  return <h1>loading</h1>;
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.element,
};

export default Modal;
