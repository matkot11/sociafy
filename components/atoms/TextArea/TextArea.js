import { forwardRef } from "react";
import { Wrapper } from "./TextArea.styles";
import PropTypes from "prop-types";

const TextArea = forwardRef(({ placeholder }, ref) => (
  <Wrapper>
    <label>
      <textarea placeholder={placeholder} ref={ref} />
    </label>
  </Wrapper>
));
TextArea.displayName = "TextArea";

TextArea.propTypes = {
  placeholder: PropTypes.string,
};

export default TextArea;
