"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Post from "../../shared/ui/Post";
import CustomLoader from "../../shared/ui/CustomLoader";
import { ModalContext } from "./ModalContext";
import { LayoutGroup } from "framer-motion";
import Card from "../../shared/ui/Card";
import TextMain from "../../shared/Text/TextMain ";
import CardOpacity from "../../shared/ui/CardOpacity";

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
          <Card style={"flex flex-col justify-center gap-[16px]"} padding={0}>
            <Image
              src={"/artFeed.png"}
              width={805}
              height={200}
              alt="feed art"
              quality={100}
              unoptimized
              loading="lazy"
              className="w-full"
            />
            <div className="flex flex-col gap-[12px] px-[12px] pb-[12px]">
              <TextMain
                text={`Расширьте сеть знакомств и мы сформируем ленту по вашим предпочтениям`}
                style="text-[16px] font-medium leading-[19px] tracking-[-0.24px]"
              />

              <Link href="/search/people" className="w-fit">
                <CardOpacity
                  padding={12}
                  styled="cursor-pointer w-fit"
                  rounded={16}
                >
                  <p className="text-[16px] font-medium leading-[19px] tracking-[-0.24px] text-[#5875e8] group-hover:text-[#3A56C5] group-active:text-[#2C429C]">
                    Перейти в поиск
                  </p>
                </CardOpacity>
              </Link>
            </div>
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
