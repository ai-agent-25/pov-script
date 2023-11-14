import { MessagesType } from "../types/types";
const BASE_URL = "https://pov-script.onrender.com";

export const createMessage = async (messages: MessagesType[]) => {
  return fetch(`${BASE_URL}/`, {
    mode: "cors",
    method: "post",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => error);
};
