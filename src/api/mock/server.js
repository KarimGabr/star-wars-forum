// IMPORT POST APIs
import LOGIN from "./POST/LOGIN";

// IMPORT GET COLLECTION APIs
import POSTS_COLLECTION from "./GET/POSTS_COLLECTION";

// IMPORT GET DOC APIs
import POSTS_DOCS from "./GET/POSTS_DOC";

// define POST APIs
const post_apis = {
  login: () => {
    return { data: { ...LOGIN } };
  },
  posts: (args) => createPost(args),
  comments: (args) => addPostComment(args),
};

const put_apis = {
  posts: (args) => editPost(args),
  comments: (args) => editPostComment(args),
};

// define GET COLLECTION APIs
const get_collection_apis = {
  posts: POSTS_COLLECTION,
};

// define GET DOC APIs
const get_doc_apis = {
  posts: POSTS_DOCS,
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// mock axios post api call
export const postAPI = async (path, args) => {
  await sleep(500);
  return Promise.resolve(post_apis[path](args));
};

// mock axios put api call
export const putAPI = async (path, args) => {
  await sleep(500);
  return Promise.resolve(put_apis[path](args));
};

// mock axios get api call
export const getCollectionAPI = async (path) => {
  await sleep(500);
  return Promise.resolve({ data: { ...get_collection_apis[path] } });
};

export const getDocAPI = async (path, id) => {
  await sleep(500);
  const _collection = get_doc_apis[path];
  const _doc = _collection.find((doc) => doc.id == id);
  return Promise.resolve({ data: { ..._doc } });
};

export const createPost = (post) => {
  const _postsCollection = { ...get_collection_apis.posts };
  _postsCollection.data.push({
    ...post,
    id: Date.now(),
    author: { id: 1, username: "Darth Vader" },
    date: "10-30-2010",
    comments_n: 0,
    votes: 0,
    content: post.content,
  });
  return { data: { ..._postsCollection } };
};

export const editPost = (post) => {
  const _postsCollection = { ...get_collection_apis.posts };
  const _post = { ...post.params };
  const _postIndex = _postsCollection.data.findIndex(
    (doc) => doc.id == _post.id
  );
  _postsCollection.data.splice(_postIndex, 1, _post);
  return { data: { ..._postsCollection } };
};

export const deletePostAPI = async (postID) => {
  await sleep(500);
  let _postsCollection = { ...get_collection_apis.posts };
  const _postIndex = _postsCollection.data.findIndex(
    (post) => post.id == postID
  );
  _postsCollection.data.splice(_postIndex, 1);
  return Promise.resolve({ data: { ..._postsCollection } });
};

export const addPostComment = (args) => {
  const { post_id, comment } = args;
  const _postsCollection = [...get_doc_apis.posts];
  let _post = { ..._postsCollection.find((doc) => doc.id == post_id) };
  _post.comments.push({
    ...comment,
    id: Date.now(),
    author: { id: 1, username: "Darth Vader" },
  });
  return { data: { ..._post } };
};

export const editPostComment = async (args) => {
  await sleep(500);
  const { post_id, comment } = args;
  const _postsCollection = [...get_doc_apis.posts];
  let _post = { ..._postsCollection.find((doc) => doc.id == post_id) };
  let _commentIndex = _post.comments.findIndex(
    (_comment) => _comment.id == comment.id
  );
  _post.comments.splice(_commentIndex, 1, comment);
  return { data: { ..._post } };
};

export const deletePostComment = async (args) => {
  await sleep(500);
  const { post_id, comment_id } = args;
  const _postsCollection = [...get_doc_apis.posts];
  let _post = { ..._postsCollection.find((doc) => doc.id == post_id) };
  let _commentIndex = _post.comments.findIndex(
    (comment) => comment.id == comment_id
  );
  _post.comments.splice(_commentIndex, 1);
  console.log(_post.comments);
  return Promise.resolve({ data: { ..._post } });
};
