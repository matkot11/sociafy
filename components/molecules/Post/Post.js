import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileImage from "../../atoms/ProfileImage/ProfileImage";
import GreyWrapper from "../GreyWrapper/GreyWrapper";
import {
  BottomWrapper,
  CounterWrapper,
  ImageWrapper,
  LoaderWrapper,
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
import LoadingCircle from "../../atoms/LoadingCircle/LoadingCircle";

const Post = ({ email, post, onClick, isYourPost, displayDelete }) => {
  const commentRef = useRef();
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [likesArray, setLikesArray] = useState(post.likes);
  const [commentsArray, setCommentsArray] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);
  const { dispatchError } = useError();

  const likeHandler = async () => {
    setIsLikeLoading(true);
    await axios
      .patch("/api/posts/like-post", {
        id: post.id,
      })
      .then(({ data }) => {
        setLikesArray(data.likes);
        setIsLikeLoading(false);
      })
      .catch((e) => {
        setTimeout(() => {
          setIsLikeLoading(false);
          dispatchError(e.response.data.message);
        }, 1200);
      });
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    setIsCommentLoading(true);
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
          setIsCommentLoading(false);
        })
        .catch((e) => {
          setTimeout(() => {
            setIsCommentLoading(false);
            dispatchError(e.response.data.message);
          }, 1200);
        });
    } else {
      dispatchError("Comment is empty");
      setIsCommentLoading(false);
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
          <CounterWrapper>
            <IconTextButton
              src="/icons/like.svg"
              name={likesArray.length.toString()}
            />
            <IconTextButton
              src="/icons/comment.svg"
              name={commentsArray.length.toString()}
            />
          </CounterWrapper>
          <hr />
          <div>
            {isLikeLoading ? (
              <LoadingCircle size={2} borderWeight={2} />
            ) : likesArray && likesArray.includes(email) ? (
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
            {isCommentLoading ? (
              <LoaderWrapper>
                <LoadingCircle size={3} borderWeight={3} />
              </LoaderWrapper>
            ) : (
              <AddComment onSubmit={commentHandler} ref={commentRef} />
            )}
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
