import Image from "next/image";
import PropTypes from "prop-types";
import { StyledLabel } from "./FileInput.styles";

const FileInput = ({ onChange }) => (
  <StyledLabel>
    <span>Add profile image</span>
    <Image
      src="/icons/plus-circle.svg"
      alt="plus"
      width={20}
      height={20}
      priority="true"
    />
    <input type="file" accept="image/*" onChange={onChange} />
  </StyledLabel>
);

FileInput.propTypes = {
  onChange: PropTypes.func,
};

export default FileInput;
