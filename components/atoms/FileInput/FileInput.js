import Image from "next/image";
import PropTypes from "prop-types";
import { StyledLabel } from "./FileInput.styles";

const FileInput = ({
  onClick,
  onChange,
  src = "/icons/plus-circle.svg",
  text,
}) => (
  <StyledLabel lightGrey>
    <span>{text}</span>
    <Image src={src} alt="plus" width={20} height={20} priority="true" />
    <input type="file" accept="image/*" onChange={onChange} onClick={onClick} />
  </StyledLabel>
);

FileInput.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  src: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default FileInput;
