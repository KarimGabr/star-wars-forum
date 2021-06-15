import dark_side_logo from "../../../assets/images/dark-side-logo.png";

import numberRangeFormatter from "../../../utils/numberRangeFormatter";

import { useAuthContext } from "../../../context/useAuthContext";
import { usePostContext } from "../../../context/usePostContext";

import { deletePostAPI } from "../../../api/mock/server";

export default function PostCard({ post }) {
  const { state } = useAuthContext();
  const { authUser } = state;

  const { postForm, postsCollection, postDocument } = usePostContext();

  const { id: postID, author, date, title, content, comments_n, votes } = post;

  const postActionButtons = {
    publicActions: [
      {
        id: 1,
        icon: "bi-chat-square",
        label: `${comments_n} Comments`,
        fn: () => {
          if (!postForm.state.selected_object) {
            postForm.dispatch({
              type: "SET_SELECTED_OBJECT",
              selected_object: post,
            });
          }
        },
      },
      { id: 2, icon: "bi-bookmark", label: "Save", fn: () => {} },
    ],
    privateActions: [
      {
        id: 1,
        icon: "bi-pen",
        label: "Edit",
        fn: () => {
          if (!postForm.state.selected_object) {
            postForm.dispatch({
              type: "SET_SELECTED_OBJECT",
              selected_object: post,
            });
          } else {
            postForm.dispatch({
              type: "TOGGLE_EDIT",
            });
          }
        },
      },
      {
        id: 2,
        icon: "bi-trash",
        label: "Delete",
        fn: () => {
          if (!postForm.state.selected_object) {
            postForm.dispatch({
              type: "SET_SELECTED_OBJECT",
              selected_object: post,
            });
          } else {
            deletePostAPI(postID).then((res) => {
              postsCollection.dispatch({
                type: "UPDATE_COLLECTION",
                payload: res.data,
              });
              postDocument.deleteDoc(true);
            });
          }
        },
      },
    ],
  };

  const renderVotingContainer = () => {
    return (
      <div className="voting-container d-flex flex-column align-items-center me-4">
        <i class="bi bi-caret-up" />
        <i class="bi bi-caret-down" />
        <div className="votes-count">{numberRangeFormatter(votes)}</div>
      </div>
    );
  };

  const renderPostContent = () => {
    return (
      <div className="post-content row">
        <div className="post-author d-flex flex-row">
          <img src={dark_side_logo} alt="author_img" />
          <span className="mx-2">{author.username}</span>
          <span style={{ lineHeight: "1" }}>.</span>
          <span className="mx-2">{date}</span>
        </div>
        <div className="post-title my-2">{title}</div>
        <div
          className={`post-body ${content.length > 300 ? "long-content" : ""}`}
        >
          {content}
        </div>
        <div className="post-actions d-flex flex-row justify-content-between">
          <div className="public-actions d-flex flex-row">
            {postActionButtons.publicActions.map((action) => (
              <button
                type="button"
                className="btn btn-outline-custom mx-2"
                onClick={() => action.fn(postID)}
              >
                <i className={`bi ${action.icon} me-2`} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
          {authUser.id == author.id && (
            <div className="private-actions d-flex flex-row">
              {postActionButtons.privateActions.map((action) => (
                <button
                  type="button"
                  className="btn btn-outline-custom mx-2"
                  onClick={() => action.fn()}
                >
                  <i className={`bi ${action.icon} me-2`} />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return post ? (
    <div
      className="post-container d-flex flex-row"
      onClick={() =>
        !postForm.state.selected_object &&
        postForm.dispatch({
          type: "SET_SELECTED_OBJECT",
          selected_object: post,
        })
      }
    >
      {renderVotingContainer()}
      {renderPostContent()}
    </div>
  ) : null;
}
