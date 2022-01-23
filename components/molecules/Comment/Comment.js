import Icon from "../../atoms/Icon/Icon";
import { LoaderWrapper, Wrapper } from "./Comment.styles";
import PropTypes from "prop-types";
import LoadingCircle from "../../atoms/LoadingCircle/LoadingCircle";

const Comment = ({ onClick, comment, isYourComment }) => (
  <Wrapper>
    <span>{comment.name}</span>
    <div>
      <p>{comment.comment}</p>
      {isYourComment && (
        <Icon
          onClick={onClick}
          name="Bin"
          iconPath="/icons/bin.svg"
          imageWidth={24}
          imageHeight={24}
        />
      )}
    </div>
  </Wrapper>
);

Comment.propTypes = {
  onClick: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  isYourComment: PropTypes.bool.isRequired,
};

export default Comment;
