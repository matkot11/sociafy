import Image from "next/image";
import styled from "styled-components";

const StyledImage = styled(Image)`
  border-radius: 50%;
  height: 12.5rem;
  width: 12.5rem;

  span {
    border-radius: 50%;
  }
`;

const ProfileImage = ({ src }) => (
  <StyledImage src={src} alt="Profile image" width={125} height={125} />
);

export default ProfileImage;
