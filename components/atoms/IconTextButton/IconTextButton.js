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
  onClick,
  src,
  name,
  imageWidth = 23,
  imageHeight = 23,
  fontWeight = 600,
}) => (
  <Wrapper onClick={onClick} fontWeight={fontWeight}>
    <Image src={src} alt={name} width={imageWidth} height={imageHeight} />
    <span>{name}</span>
  </Wrapper>
);

IconTextButton.propTypes = {
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageWidth: PropTypes.number,
  imageHeight: PropTypes.number,
  fontWeight: PropTypes.number,
};

export default IconTextButton;
