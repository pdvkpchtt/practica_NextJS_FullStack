"use client";

import { createContext, useState, useEffect } from "react";

import { fetchChats } from "../../server/actions/messenger/fetchChats";

export const MessengerContext = createContext();

const MessengerContextWrap = ({ children }) => {
  const [cursor, setCursor] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatsState, setChatsState] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [count, setCount] = useState(0);

  const getUserChatsWithTimer = async (lastDate) => {
    console.log("timer fetching");
    if (loading) return;

    console.log(lastDate);
    const data = await fetchChats(lastDate, searchInputValue, true);
    console.log("chats update", data);
    if (data?.length === 0) setNoData(true);

    setChatsState(data?.data);

    setCursor(data?.cursor);
    setHasNextPage(data?.hasNextPage);
  };

  const getUserChats = async (cursor) => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchChats(cursor, searchInputValue, false);
    if (data.length === 0) setNoData(true);
    console.log("client chats", data);
    if (cursor.length) {
      setChatsState([...chatsState, ...data.data]);
    } else {
      setChatsState(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLastDate(data.lastDate);
    setLoading(false);
  };

  return (
    <MessengerContext.Provider
      value={{
        cursor,
        setCursor,
        lastDate,
        setLastDate,
        hasNextPage,
        setHasNextPage,
        loading,
        setLoading,
        chatsState,
        setChatsState,
        searchInputValue,
        setSearchInputValue,
        count,
        setCount,
        getUserChats,
        getUserChatsWithTimer,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};

export default MessengerContextWrap;
