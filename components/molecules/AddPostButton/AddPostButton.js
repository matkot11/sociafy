import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import RoundedButton from "../../atoms/RoundedButton/RoundedButton";
import Image from "next/image";
import { Wrapper } from "./AddPostButton.styles";
import GreyWrapper from "../GreyWrapper/GreyWrapper";
import PropTypes from "prop-types";

const AddPostButton = ({ profileImage, onClick }) => (
  <GreyWrapper as="button" onClick={onClick}>
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

AddPostButton.propTypes = {
  profileImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddPostButton;
