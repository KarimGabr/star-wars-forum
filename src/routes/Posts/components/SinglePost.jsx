import { Fragment } from "react";
import trash from "../../../assets/images/trash.svg";

import "../Posts.scss";

import { useAuthContext } from "../../../context/useAuthContext";
import { usePostContext } from "../../../context/usePostContext";

import dark_side_logo from "../../../assets/images/dark-side-logo.png";

import PostCard from "./PostCard";
import AddComment from "./AddComment";
import EditComment from "./EditComment";

import { deletePostComment } from "../../../api/mock/server";

export default function SinglePost() {
  const { state } = useAuthContext();
  const { authUser } = state;

  const { postDocument, postForm } = usePostContext();

  const renderComments = () => {
    return (
      <div className="comments-container">
        {postDocument.doc.comments?.length > 0 &&
          postDocument.doc.comments.map((comment) => (
            <Fragment>
              <div
                key={comment.id}
                className="comment-container d-flex flex-row align-items-center justify-content-between"
              >
                <div className="comment-content">
                  <div className="comment-author d-flex flex-row">
                    <img src={dark_side_logo} alt="author_img" />
                    <span className="mx-2">{comment.author.username}</span>
                    <span style={{ lineHeight: "1" }}>.</span>
                    <span className="mx-2">{comment.date}</span>
                  </div>
                  <div>{comment.text}</div>
                </div>
                {authUser.id == comment.author.id && (
                  <div className="comment-action-btns">
                    <EditComment
                      post_id={postDocument.doc.id}
                      comment={comment}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-custom mx-2"
                      onClick={() =>
                        deletePostComment({
                          post_id: postDocument.doc.id,
                          comment_id: comment.id,
                        }).then((res) => postDocument.updateDoc(res))
                      }
                    >
                      <i className="bi bi-trash me-2" />
                    </button>
                  </div>
                )}
              </div>
              <hr />
            </Fragment>
          ))}
      </div>
    );
  };

  return (
    <div className="posts-container">
      <button
        type="button"
        className="btn btn-outline-custom create-post mt-3"
        onClick={() => postForm.dispatch({ type: "CLEAR_SELECTED_OBJECT" })}
      >
        <i className="bi bi-arrow-bar-left me-2" />
        <span>Browse all Posts</span>
      </button>
      {postDocument.doc ? (
        <div className="single-post-container">
          <PostCard post={postDocument.doc} />
          <AddComment postDocument={postDocument} />
          {renderComments()}
        </div>
      ) : postDocument.isDeleted ? (
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h3 className="mt-5 mb-4" style={{ color: "#ffe81f" }}>
            Post Deleted
          </h3>
          <img src={trash} alt="trash" style={{ width: "50px" }} />
        </div>
      ) : null}
    </div>
  );
}
