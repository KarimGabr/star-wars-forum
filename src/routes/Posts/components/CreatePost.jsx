import { Fragment } from "react";

import CustomInput from "../../../components/CustomInput";
import { Dialog } from "primereact/dialog";

import { usePostContext } from "../../../context/usePostContext";

const POST_FORM_STRUCTURE = [
  { id: "title", name: "title", inputType: "text", isRequired: true },
  { id: "content", name: "content", inputType: "textarea", isRequired: true },
];

export default function CreatePost() {
  const { postForm } = usePostContext();

  return (
    <Fragment>
      <button
        type="button"
        className="btn  btn-outline-custom create-post"
        onClick={() => postForm.dispatch({ type: "CREATE_NEW" })}
      >
        What's on your mind, nerd?
      </button>

      <Dialog
        header={`${
          postForm.state.selected_object ? "Edit your post" : "Create a post"
        }`}
        visible={postForm.state.create_modal_state}
        style={{ width: "35vw" }}
        onHide={() => postForm.dispatch({ type: "CLEAR_FORM_OBJECT" })}
      >
        <form onSubmit={postForm.handleSubmit}>
          {POST_FORM_STRUCTURE.map((formElement) => {
            return (
              <div key={formElement.id} className="form-group">
                {formElement.id && (
                  <span className="label">
                    <span>
                      {formElement.id}
                      {formElement.isRequired && "*"}
                    </span>
                    {postForm.state.errors.required &&
                      postForm.state.errors.required[formElement.name] && (
                        <i
                          className="pi pi-exclamation-circle ml-2"
                          style={{ color: "rgb(255 200 200" }}
                        />
                      )}
                  </span>
                )}
                <CustomInput
                  style={
                    postForm.state.errors.required &&
                    postForm.state.errors.required[formElement.name]
                      ? { backgroundColor: "#FFCDD2" }
                      : null
                  }
                  {...formElement}
                  value={postForm.formValues[formElement.name]}
                  onChange={(event) => {
                    postForm.handleChange(formElement.name, event.target.value);
                  }}
                  onFocus={(event) => {
                    event.target.setAttribute("autoComplete", "off");
                  }}
                />
              </div>
            );
          })}
          <button type="submit" class="btn btn-custom w-100">
            Post
          </button>
        </form>
      </Dialog>
    </Fragment>
  );
}
