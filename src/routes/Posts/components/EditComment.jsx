import { Fragment, useState, useEffect } from "react";

import CustomInput from "../../../components/CustomInput";
import { Dialog } from "primereact/dialog";

import { usePostContext } from "../../../context/usePostContext";
import { putAPI } from "../../../api/mock/server";

export default function EditComment({ post_id, comment }) {
  const { postDocument } = usePostContext();
  const [commentDialog, setCommentDialog] = useState(false);
  const [commentText, setCommentText] = useState(comment.text);

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-custom mx-2"
        onClick={() => setCommentDialog(true)}
      >
        <i className="bi bi-pen me-2" />
      </button>
      <Dialog
        header="Edit Comment"
        visible={commentDialog}
        style={{ width: "35vw" }}
        onHide={() => setCommentDialog(false)}
      >
        <div className="form-group">
          <CustomInput
            id={"comment"}
            name={"comment"}
            inputType={"textarea"}
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
            onFocus={(event) => {
              event.target.setAttribute("autoComplete", "off");
            }}
          />
        </div>
        <button
          disabled={comment == ""}
          type="button"
          class="btn btn-custom w-100"
          onClick={() =>
            putAPI("comments", {
              post_id: post_id,
              comment: { ...comment, text: commentText },
            }).then((res) => {
              postDocument.updateDoc(res);
              setCommentDialog(false);
            })
          }
        >
          Comment
        </button>
      </Dialog>
    </Fragment>
  );
}
