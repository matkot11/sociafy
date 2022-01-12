import Image from "next/image";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledImage = styled(Image)`
  border-radius: 50%;
  height: 12.5rem;
  width: 12.5rem;

  span {
    border-radius: 50%;
  }
`;

const ProfileImage = ({ src, width = 125, height = 125 }) => (
  <StyledImage
    placeholder="blur"
    blurDataURL="/icons/user.svg"
    src={src}
    alt="Profile image"
    width={width}
    height={height}
  />
);

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default ProfileImage;
