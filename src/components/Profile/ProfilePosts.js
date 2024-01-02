"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { LayoutGroup } from "framer-motion";

import Card from "../../shared/ui/Card";
import CustomLoader from "../../shared/ui/CustomLoader";
import TextMain from "../../shared/Text/TextMain ";
import Post from "../../shared/ui/Post";

const ProfilePosts = ({
  getUserFeed,
  addReaction,
  others = false,
  company = false,
  userId,
}) => {
  const [posts, setPosts] = useState(null);
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const getPosts = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await getUserFeed(cursor);
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
  }, [getUserFeed]);
  // console.log(posts, "dasdasdsa");

  return (
    <>
      <LayoutGroup>
        {!posts ? (
          <div className="w-full flex justify-center items-center h-full">
            <CustomLoader diameter={36} />
          </div>
        ) : posts?.length === 0 ? (
          <Card style={"flex justify-center"}>
            <div className="items-center flex flex-col gap-[24px] justify-center w-full text-center ">
              <TextMain
                text={
                  !company
                    ? `У ${!others ? "вас" : "пользователя"} пока нет постов`
                    : `У компании пока нет постов`
                }
                style="text-[14px] font-medium leading-[18px] tracking-[-0.013em]"
              />
            </div>
          </Card>
        ) : (
          <>
            {posts.map((item) => (
              <Post
                userId={userId}
                key={item?.id}
                item={item}
                addReaction={addReaction}
                selectedId={selectedId}
                setSelectedId={(val) => setSelectedId(val)}
              />
            ))}

            {hasNextPage ? (
              <Waypoint
                onEnter={async () => {
                  console.log("Enter waypoint");
                  await getPosts(cursor);
                }}
                topOffset="50px"
              >
                <div className="w-full flex  justify-center items-center h-full">
                  <CustomLoader diameter={36} />
                </div>
              </Waypoint>
            ) : null}
          </>
        )}
      </LayoutGroup>
    </>
  );
};

export default ProfilePosts;
