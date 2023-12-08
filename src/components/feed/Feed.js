"use client";

import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Post from "../../shared/ui/Post";
import CustomLoader from "../../shared/ui/CustomLoader";
import { ModalContext } from "./ModalContext";
import { LayoutGroup } from "framer-motion";
import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain ";

const Feed = ({ getFeed, addReaction, userId }) => {
  const pathname = usePathname();

  const { posts, setPosts, navState } = useContext(ModalContext);

  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [done, setDone] = useState(false);

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
    setDone(true);
  };

  useEffect(() => {
    setCursor("");
    getPosts("");
  }, [getFeed]);

  return (
    <>
      <LayoutGroup>
        {done && pathname.includes("foryou") && posts.length === 0 && (
          <Card style={"flex justify-center text-center"}>
            <TextMain
              text={`Расширьте свою сеть нетворкинга`}
              style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
            />
          </Card>
        )}
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
