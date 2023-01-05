import { useState, useEffect, useRef, createContext, useContext } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";

import { ALLPOST_QUERY } from "../../../graphql/queries/allpost_query";

import { POST_CREATED_SUBSCRIPTION } from "../../../graphql/subscriptions";
import { MESSAGE } from "../../../graphql/msgSub";
import { POST_MSG_QUERY } from "../../../graphql/queries/postMsg";
import { MYPOST_QUERY } from "../../../graphql/queries/mypost_query";
import { POST_ATTENDED_SUBSCRIPTION } from "../../../graphql/postsub";

const PostContext = createContext({
  Status: [],
  content: [],
  date: "",
  type: "",
  place: "",
  addPost: () => {},
  setID: () => {},
  setAccountHook: () => [],
  allPostData: [],
  postMsgData: [],
  myPostData: [],
});

const PostProvider = (props) => {
  const [content, setContent] = useState([]);
  const [accountHook, setAccountHook] = useState(() => JSON.parse(localStorage.getItem('account')) || "")
  const [State, setState] = useState(false);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("飯局");
  const [place, setPlace] = useState("新北");
  const [id, setID] = useState("");
  const { 
    loading: mypostloading,
    error: myposterror,
    data: myPostData,
    subscribeToMore: myPostSubscribeToMore } = 
    useQuery(MYPOST_QUERY, {
    variables: {
      account: accountHook,
    },
  });
  useEffect(() => {

    myPostSubscribeToMore({
      document: POST_ATTENDED_SUBSCRIPTION,
      variables: { account: accountHook },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          myPost: {
            posts: subscriptionData.data.postAttended,
          },
        };
      },
    });
  }, [accountHook, myPostSubscribeToMore]);

  const {
    loading,
    error,
    data: allPostData,
    subscribeToMore: allPostSubscribeToMore,
  } = useQuery(ALLPOST_QUERY);

  const {
    loading: msgLoading,
    error: msgError,
    data: postMsgData,
    subscribeToMore: MsgSubscribeToMore,
  } = useQuery(POST_MSG_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    MsgSubscribeToMore({
      document: MESSAGE,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const Msg = subscriptionData.data.message;
        return {
          postMsg: [...Msg],
        };
      },
    });
  }, [postMsgData]);

  useEffect(() => {
    allPostSubscribeToMore({
      document: POST_CREATED_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost = subscriptionData.data.postCreated;
        return {
          allPost: [newPost, ...prev.allPost],
        };
      },
    });
  }, [allPostSubscribeToMore]);

  const addCardMessage = (message) => {};

  if (error || myposterror || msgError) {
    // eslint-disable-next-line no-console
    console.error(error);
    return <p>Error :</p>;
  }

  if (loading ) return <p>Loading...</p>;
  // if (mypostloading ) return <p>Loading...</p>;
  return (
    <PostContext.Provider
      value={{
        content,
        date,
        type,
        place,
        allPostData,
        postMsgData,
        myPostData,
        setContent,
        setDate,
        setType,
        setPlace,
        setID,
        setAccountHook
      }}
      {...props}
    />
  );
};

function usePost() {
  return useContext(PostContext);
}

export { PostProvider, usePost };
