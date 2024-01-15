"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { LayoutGroup } from "framer-motion";

import CustomLoader from "../../shared/ui/CustomLoader";
import TextMain from "../../shared/Text/TextMain ";
import Card from "../../shared/ui/Card";
import Post from "../../shared/ui/Post";
import { getRated } from "../../server/actions/posts/getRated";
import Image from "next/image";

const dummyData = [];

const ProfileLiked = ({
  others = false,
  company = false,
  otherId,
  addReaction,
  userId,
}) => {
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const getPosts = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await getRated(otherId, cursor);
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
  }, [getRated]);

  return (
    <LayoutGroup>
      {!posts ? (
        <div className="w-full flex justify-center items-center h-full">
          <CustomLoader diameter={36} />
        </div>
      ) : posts?.length === 0 ? (
        <Card style={"flex justify-center"} padding={16}>
          <div className="[@media(pointer:coarse)]:items-center [@media(pointer:coarse)]:justify-center flex flex-col gap-[7px]  w-full text-start ">
            {others === false && (
              <div className="w-full flex justify-center items-center">
                <Image
                  src={"/TwoGuys1post.png"}
                  quality={100}
                  unoptimized
                  className="w-full h-full max-w-[327px] max-h-[376px] mx-auto"
                  width={1308}
                  height={1504}
                />
              </div>
            )}

            <TextMain
              text={
                !company
                  ? others
                    ? "Пользователь пока ничего не оценил"
                    : "Вы пока ничего не оценили"
                  : "Компания ничего не оценила"
              }
              style="text-[16px] font-medium leading-[19px] tracking-[-0.24px]"
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
              setSelectedId={(val) => setSelectedId(val)}
              selectedId={selectedId}
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
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            </Waypoint>
          ) : null}
        </>
      )}
    </LayoutGroup>
  );
};

export default ProfileLiked;
