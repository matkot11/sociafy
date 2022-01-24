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

    @media only screen and (min-width: ${({ theme }) => theme.size.m}) {
      font-size: ${({ theme }) => theme.fontSize.s};
    }
  }
`;

const IconTextLink = forwardRef(
  ({ href, iconPath, imageWidth, imageHeight, name }, ref) => (
    <StyledLink href={href} ref={ref}>
      <Image
        src={iconPath}
        alt={name}
        layout="fixed"
        width={imageWidth}
        height={imageHeight}
      />
      <span>{name}</span>
    </StyledLink>
  ),
);
IconTextLink.displayName = "IconTextLink";

IconTextLink.propTypes = {
  href: PropTypes.string,
  iconPath: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default IconTextLink;
