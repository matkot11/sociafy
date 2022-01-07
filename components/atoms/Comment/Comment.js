import IconLink from "../IconLink/IconLink";
import { Wrapper } from "./Comment.styles";

const Comment = ({ onClick, comment, isYourComment }) => (
  <Wrapper>
    <span>{comment.name}</span>
    <div>
      <p>{comment.comment}</p>
      {isYourComment && (
        <IconLink
          onClick={onClick}
          name="Bin"
          iconPath="/icons/bin.svg"
          width={24}
          height={24}
        />
      )}
    </div>
  </Wrapper>
);

export default Comment;
