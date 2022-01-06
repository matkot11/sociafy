import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 1rem;
    font-size: ${({ theme }) => theme.fontSize.m};
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;

const IconTextButton = ({
  src,
  alt,
  text,
  imageWidth = 23,
  imageHeight = 23,
  fontWeight = 600,
}) => (
  <Wrapper fontWeight={fontWeight}>
    <Image src={src} alt={alt} width={imageWidth} height={imageHeight} />
    <span>{text}</span>
  </Wrapper>
);

IconTextButton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  fontWeight: PropTypes.number,
};

export default IconTextButton;
