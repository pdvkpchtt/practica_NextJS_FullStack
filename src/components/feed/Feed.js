"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Post from "../../shared/ui/Post";
import CustomLoader from "../../shared/ui/CustomLoader";
import { ModalContext } from "./ModalContext";
import { LayoutGroup } from "framer-motion";

const Feed = ({ getFeed, addReaction, userId }) => {
  const { posts, setPosts, navState } = useContext(ModalContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getPosts = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await getFeed(cursor);
    console.log("client posts", data);
    if (cursor.length) {
      setPosts([...posts, ...data.data]);
    } else {
      setPosts(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getPosts("");
  }, [getFeed]);

  return (
    <>
      {/* из за этого лагает */}
      <LayoutGroup>
        {posts.map((item) => (
          <Post
            userId={userId}
            key={item.id}
            item={item}
            addReaction={addReaction}
            setSelectedId={(val) => setSelectedId(val)}
            selectedId={selectedId}
          />
        ))}
      </LayoutGroup>

      {hasNextPage ? (
        <Waypoint
          onEnter={async () => {
            console.log("Enter waypoint");
            await getPosts(cursor);
          }}
          topOffset="50px"
        >
          <div className="w-full flex justify-center items-center h-full">
            <CustomLoader diameter={36} />
          </div>
        </Waypoint>
      ) : null}
    </>
  );
};

export default Feed;
