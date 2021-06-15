import { useState } from "react";
import { useAuthContext } from "../../../context/useAuthContext";
import CustomInput from "../../../components/CustomInput";
import { postAPI } from "../../../api/mock/server";

export default function AddComment({ postDocument }) {
  const { state } = useAuthContext();
  const { authUser } = state;

  const [comment, setComment] = useState("");

  const handleAddComment = () => {
    postAPI("comments", {
      post_id: postDocument.doc.id,
      comment: {
        text: comment,
        date: "10-30-2010",
      },
    }).then((res) => {
      postDocument.updateDoc(res);
      setComment("");
    });
  };

  return postDocument.doc ? (
    <div>
      <div className="commenter">
        <span>Comment as </span>
        <span>{authUser.username}</span>
      </div>
      <div className="d-flex flex-column">
        <CustomInput
          inputType="textarea"
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          onFocus={(event) => {
            event.target.setAttribute("autoComplete", "off");
          }}
        />
        <button
          className="btn btn-custom mt-3"
          type="button"
          disabled={comment === ""}
          onClick={() => handleAddComment()}
        >
          Comment
        </button>
      </div>
    </div>
  ) : null;
}
