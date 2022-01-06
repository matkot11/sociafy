import Image from "next/image";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import GreyWrapper from "../../molecules/GreyWrapper/GreyWrapper";
import {
  BottomWrapper,
  ImageWrapper,
  UserWrapper,
  Wrapper,
} from "./Post.styles";
import IconTextButton from "../../atoms/IconTextButton/IconTextButton";

const Post = ({ profileImage }) => (
  <GreyWrapper>
    <Wrapper>
      <UserWrapper>
        <ProfileImage src={profileImage} width={40} height={40} />
        <div>
          <span>Mateusz Kocik</span>
          <span>1h ago</span>
        </div>
      </UserWrapper>
      <ImageWrapper>
        <Image src="/images/postImage.png" alt="Post image" layout="fill" />
      </ImageWrapper>
      <BottomWrapper>
        <div>
          <IconTextButton src="/icons/like.svg" alt="Like" text="101" />
          <IconTextButton src="/icons/comment.svg" alt="Comment" text="6" />
        </div>
        <hr />
        <div>
          <IconTextButton
            src="/icons/like.svg"
            alt="Like"
            text="Like"
            fontWeight={500}
          />
          <IconTextButton
            src="/icons/comment.svg"
            alt="Comment"
            text="Comment"
            fontWeight={500}
          />
        </div>
      </BottomWrapper>
    </Wrapper>
  </GreyWrapper>
);

export default Post;
