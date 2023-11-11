"use client";

import { createContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { fetchMessages } from "../../server/actions/messenger/fetchMessages";
import { fetchChats } from "../../server/actions/messenger/fetchChats";
import sendMessage from "../../server/actions/messenger/sendMessage";

export const MesContext = createContext();

const MesContextWrap = ({ children, chatId }) => {
  const pathname = usePathname();

  console.log(chatId, "jop");
  const [cursor, setCursor] = useState(""); // ChatsList
  const [lastDate, setLastDate] = useState(""); // ChatsList
  const [hasNextPage, setHasNextPage] = useState(true); // ChatsList
  const [loading, setLoading] = useState(false); // ChatsList
  const [chatsState, setChatsState] = useState(null); // ChatsList
  const [searchInputValue, setSearchInputValue] = useState(""); // ChatsList

  const [input, setInput] = useState(""); // Messages
  const [wait, setWait] = useState(false); // Messages
  const [searchInput, setSearchInput] = useState(""); // Messages
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [cursorMessages, setCursorMessages] = useState("");
  const [hasNextPageMessages, setHasNextPageMessages] = useState(true);
  const [dataStateMessages, setDataStateMessages] = useState(null);
  const [lastDateMessages, setLastDateMessages] = useState("");

  // -------------- messages
  const getMessages = async () => {
    console.log("fetching");
    // if (loadingMessages) return;
    setLoadingMessages(true);
    const data = await fetchMessages(
      chatId,
      cursorMessages,
      searchInput,
      false
    );
    console.log("client messages", data);
    if (cursorMessages?.length) {
      setDataStateMessages([...dataStateMessages, ...data.data]);
    } else {
      setDataStateMessages(data.data);
    }
    setCursorMessages(data.cursorMessages);
    setHasNextPageMessages(data.hasNextPageMessages);
    setLastDate(data.lastDate);
    setLoadingMessages(false);
  };

  // useEffect(() => {
  //   setCursorMessages("");
  //   getMessages("");
  // }, [fetchMessages, searchInput]);

  // with timer
  const getUserMessengerWithTimer = async () => {
    console.log("timer messages");
    if (loadingMessages) return;

    console.log(lastDateMessages);
    const data = await fetchMessages(
      chatId,
      lastDateMessages,
      searchInput,
      true
    );
    console.log("messenges update", data);
    if (loadingMessages) return;
    setDataStateMessages(data?.data);

    // setCursorMessages(data?.cursorMessages);
    // setHasNextPageMessages(data?.hasNextPageMessages);
  };
  // -------------- messages

  // -------------- list of chats
  const getUserChatsWithTimer = async () => {
    console.log("timer fetching");
    if (loading) return;

    console.log(lastDate);
    const data = await fetchChats(lastDate, searchInputValue, true);
    console.log("chats update", data);
    if (data?.length === 0) setNoData(true);

    if (loading) return;
    setChatsState(data?.data);

    // setCursor(data?.cursor);
    // setHasNextPage(data?.hasNextPage);
  };

  const getUserChats = async () => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchChats(cursor, searchInputValue, false);
    if (data.length === 0) setNoData(true);
    console.log("client chats", data);
    if (cursor?.length) {
      setChatsState([...chatsState, ...data.data]);
    } else {
      setChatsState(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLastDate(data.lastDate);
    setLoading(false);
  };

  const sendMsg = async () => {
    if (input.length !== 0) {
      setWait(true);
      console.log(input);
      await sendMessage(input, chatId);
      setInput("");
      setCursorMessages("");
      await getMessages("");
      setWait(false);
    }
  };

  const interval = useRef();

  useEffect(() => {
    getUserChatsWithTimer();
    interval.current = setInterval(() => {
      console.log("test");
      getUserChatsWithTimer();
      getUserMessengerWithTimer();
    }, [5000]);

    return () => {
      clearInterval(interval.current);
    };
  }, [chatId, cursorMessages]);

  useEffect(() => {
    console.log("test search messages");
    getMessages();
  }, [searchInput, chatId]);

  useEffect(() => {
    getUserChats();
  }, [searchInputValue]);
  // -------------- list of chats

  return (
    <MesContext.Provider
      value={{
        // передаём в ChatsList
        hasNextPage,
        loading,
        chatsState,
        searchInputValue,
        setSearchInputValue,
        getUserChats,
        getUserChatsWithTimer,
        // передаём в ChatsList

        // Messages
        chatId,
        input,
        setInput,
        wait,
        setWait,
        searchInput,
        setSearchInput,
        loadingMessages,
        setLoadingMessages,
        cursorMessages,
        setCursorMessages,
        hasNextPageMessages,
        setHasNextPageMessages,
        dataStateMessages,
        setDataStateMessages,
        lastDateMessages,
        setLastDateMessages,
        getMessages,
        sendMsg,
        // Messages
      }}
    >
      {children}
    </MesContext.Provider>
  );
};

export default MesContextWrap;
