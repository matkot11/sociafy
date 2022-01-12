import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import GreyWrapper from "../GreyWrapper/GreyWrapper";
import {
  BottomWrapper,
  ImageWrapper,
  Paragraph,
  UserWrapper,
  Wrapper,
} from "./Post.styles";
import IconTextButton from "../../atoms/IconTextButton/IconTextButton";
import axios from "axios";
import { useError } from "../../../hooks/useError";
import Comments from "../../organisms/Comments/Comments";
import AddComment from "../../atoms/Add Comment/AddComment";
import Icon from "../../atoms/Icon/Icon";
import PropTypes from "prop-types";

const Post = ({ email, post, onClick, isYourPost, displayDelete }) => {
  const commentRef = useRef();
  const [likesArray, setLikesArray] = useState(post.likes);
  const [commentsArray, setCommentsArray] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const { dispatchError } = useError();
  const likeHandler = async () => {
    await axios
      .patch("/api/posts/like-post", {
        id: post.id,
      })
      .then(({ data }) => {
        setLikesArray(data.likes);
      })
      .catch((e) => {
        setTimeout(() => {
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    const comment = commentRef.current.value;

    if (comment !== "") {
      await axios
        .patch("/api/posts/add-comment-post", {
          id: post.id,
          comment,
          email,
        })
        .then(({ data }) => {
          setCommentsArray(data.comments);
          commentRef.current.value = "";
        })
        .catch((e) => {
          setTimeout(() => {
            dispatchError(e.response.data.message);
          }, 1200);
        });
    } else {
      dispatchError("Comment is empty");
    }
  };

  return (
    <GreyWrapper>
      <Wrapper>
        <UserWrapper>
          <Link href={`/user/${post.userId}`} passHref>
            <div>
              <ProfileImage src={post.profileImage} width={40} height={40} />
              <div>
                <span>{post.name}</span>
                <span>{post.date}</span>
              </div>
            </div>
          </Link>
          {displayDelete && isYourPost && (
            <Icon
              onClick={onClick}
              name="Bin"
              iconPath="/icons/bin.svg"
              imageWidth={24}
              imageHeight={24}
            />
          )}
        </UserWrapper>
        <Paragraph>{post.text}</Paragraph>
        {post.image && (
          <ImageWrapper>
            <Image
              placeholder="blur"
              blurDataURL="/svg/post.svg"
              src={post.image}
              alt="Post image"
              layout="fill"
              objectFit="contain"
            />
          </ImageWrapper>
        )}
        <BottomWrapper>
          <div>
            <IconTextButton
              src="/icons/like.svg"
              name={likesArray.length.toString()}
            />
            <IconTextButton
              src="/icons/comment.svg"
              name={commentsArray.length.toString()}
            />
          </div>
          <hr />
          <div>
            {likesArray && likesArray.includes(email) ? (
              <IconTextButton
                onClick={likeHandler}
                src="/icons/like.svg"
                name="Unlike"
                fontWeight={500}
              />
            ) : (
              <IconTextButton
                onClick={likeHandler}
                src="/icons/like.svg"
                name="Like"
                fontWeight={500}
              />
            )}

            <IconTextButton
              onClick={() => setShowComments(!showComments)}
              src="/icons/comment.svg"
              name="Comment"
              fontWeight={500}
            />
          </div>
        </BottomWrapper>
        {showComments && (
          <>
            <Comments comments={commentsArray} email={email} postId={post.id} />
            <AddComment onSubmit={commentHandler} ref={commentRef} />
          </>
        )}
      </Wrapper>
    </GreyWrapper>
  );
};

Post.propTypes = {
  email: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isYourPost: PropTypes.bool.isRequired,
  displayDelete: PropTypes.bool.isRequired,
};

export default Post;
