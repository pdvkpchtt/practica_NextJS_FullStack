"use client";

import { createContext, useState, useEffect } from "react";

import { getPitchesCount } from "../../server/actions/pitches/getPitchesCount";
import { fetchChats } from "../../server/actions/messenger/fetchChats";
import { getInfoAboutPremium } from "../../server/actions/messenger/getInfoAboutPremium";

export const MessengerContext = createContext();

const MessengerContextWrap = ({ children }) => {
  const [cursor, setCursor] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatsState, setChatsState] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [count, setCount] = useState(0);
  const [premSender, setPremSender] = useState(null);

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

  const returnPremSender = async (id) => {
    setPremSender(await getInfoAboutPremium(id));
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

  const [pitchesState, setPitchesState] = useState(null);
  const [superpitchesState, setSuperPitchesState] = useState(null);

  const getPitchesCountHanler = async () => {
    setPitchesState(await getPitchesCount());
    setSuperPitchesState(await getPitchesCount("superpitch"));
  };

  useEffect(() => {
    getPitchesCountHanler();
  }, [getUserChatsWithTimer]);

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
        pitchesState,
        setPitchesState,
        superpitchesState,
        setSuperPitchesState,
        getPitchesCountHanler,
        returnPremSender,
        premSender,
      }}
    >
      {children}
    </MessengerContext.Provider>
  );
};

export default MessengerContextWrap;
