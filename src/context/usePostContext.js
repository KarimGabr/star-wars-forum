import { createContext, useContext } from "react";

export const PostContext = createContext();

export function usePostContext() {
  return useContext(PostContext);
}
