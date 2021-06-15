import "./Posts.scss";

import useCollection from "../../custom-hooks/useCollection";
import useDoc from "../../custom-hooks/useDoc";
import useAatroxForm from "../../custom-hooks/useAatroxForm";
import { PostContext } from "../../context/usePostContext";

import formRequiredValidation from "../../utils/formRequiredValidation";

import CreatePost from "./components/CreatePost";
import PostList from "./components/PostList";
import SinglePost from "./components/SinglePost";

const POST_SCHEMA = {
  title: "",
  content: "",
};

const POST_FORM_VALIDATION = (form_values) => {
  let errors = {};

  const required_values = ["title", "content"];

  errors = { ...formRequiredValidation(form_values, required_values) };

  return errors;
};

export default function Posts() {
  const postsCollection = useCollection({
    path: "posts",
    paginationLimit: 10,
  });

  const postForm = useAatroxForm({
    form_schema: POST_SCHEMA,
    validate_fn: POST_FORM_VALIDATION,
    api_path: "posts",
    show_toast_success: true,
    toast_success_message: "Post Saved",
    collectionHandler: postsCollection,
  });

  const postDocument = useDoc({
    path: "posts",
    formHandler: postForm,
  });

  return (
    <PostContext.Provider
      value={{
        postsCollection: postsCollection,
        postDocument: postDocument,
        postForm: postForm,
      }}
    >
      <div className="posts container">
        <div className="row">
          <div className="col-12 p-5">
            <CreatePost />
            {postForm.state.container_view_state === "list" ? (
              <PostList />
            ) : (
              <SinglePost />
            )}
          </div>
        </div>
      </div>
    </PostContext.Provider>
  );
}
