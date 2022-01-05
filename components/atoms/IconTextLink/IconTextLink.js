import { forwardRef } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    outline: none;
  }

  span {
    margin-left: 1rem;
    font-size: ${({ theme }) => theme.fontSize.m};
    color: ${({ theme }) => theme.color.lightGrey};
  }
`;

const IconTextLink = forwardRef(
  ({ onClick, href, iconPath, width, height, name }, ref) => (
    <StyledLink href={href} onClick={onClick} ref={ref}>
      <Image
        src={iconPath}
        alt={name}
        layout="fixed"
        width={width}
        height={height}
      />
      <span>{name}</span>
    </StyledLink>
  ),
);
IconTextLink.displayName = "IconTextLink";

IconTextLink.propTypes = {
  iconPath: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default IconTextLink;
