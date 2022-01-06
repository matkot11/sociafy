import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import RoundedButton from "../../atoms/RoundedButton/RoundedButton";
import Image from "next/image";
import { Wrapper } from "./AddPostButton.styles";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";

const AddPostButton = ({ profileImage }) => (
  <GreyWrapper as="button">
    <Wrapper>
      <ProfileImage src={profileImage} width={60} height={60} />
      <RoundedButton>
        <span>What&apos;s on your mind?</span>
        <Image
          src="/icons/plus-circle.svg"
          alt="plus"
          width={20}
          height={20}
          priority="true"
        />
      </RoundedButton>
    </Wrapper>
  </GreyWrapper>
);

export default AddPostButton;
