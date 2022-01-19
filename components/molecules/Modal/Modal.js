import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ModalWrapper, StyledButton } from "./Modal.styles";
import LoadingComments from "../../organisms/LoadingComments/LoadingComments";

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
  return <LoadingComments />;
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
