import { forwardRef } from "react";
import { Wrapper } from "./TextArea.styles";
import PropTypes from "prop-types";

const TextArea = forwardRef(({ placeholder, textAreaHeight }, ref) => (
  <Wrapper textAreaHeight={textAreaHeight}>
    <label>
      <textarea placeholder={placeholder} ref={ref} />
    </label>
  </Wrapper>
));
TextArea.displayName = "TextArea";

TextArea.propTypes = {
  placeholder: PropTypes.string,
  textAreaHeight: PropTypes.string,
};

export default TextArea;
