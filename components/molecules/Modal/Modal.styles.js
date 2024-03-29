import styled from "styled-components";
import ReactModal from "react-modal";

export const ModalWrapper = styled(ReactModal)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 50rem;
  max-height: 80vh;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  box-shadow: 0px -5px 25px -10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  opacity: 1;

  &:focus {
    outline: none;
  }
`;

export const StyledButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
