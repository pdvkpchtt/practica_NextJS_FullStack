"use client";

import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import Modal from "../../shared/ui/Modal";
import ConnectionCard from "../../shared/ui/ConnectionCard";
import { fetchGetUpdates } from "../../server/actions/connections/fetchGetUpdates";
import CustomLoader from "../../shared/ui/CustomLoader";
import TextCaption from "../../shared/Text/TextCaption";
import MobileModal from "../../shared/ui/MobileModal";
import MobileHeader from "../../shared/ui/MobileHeader";

import Cross2 from "../../shared/icons/Cross2";

const UpdatesModal = ({ modalState = false, setModalState = () => {} }) => {
  const [cursor, setCursor] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  const getRequests = async (cursor) => {
    console.log("fetching");
    if (loading) return;
    setLoading(true);
    const data = await fetchGetUpdates(cursor);
    console.log("client updates", data);
    if (cursor.length) {
      setUsers([...users, ...data.data]);
    } else {
      setUsers(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setCursor("");
    getRequests("");
  }, [fetchGetUpdates]);
  useEffect(() => {
    setCursor("");
    getRequests("");
  }, [modalState]);

  return (
    <>
      <Modal
        withScroll
        isOpen={modalState}
        handleClose={() => setModalState(false)}
      >
        {/* header */}
        <div className="flex [@media(pointer:coarse)]:hidden flex-row justify-end pb-[12px] relative">
          <Cross2 onClick={() => setModalState(false)} />

          <div className="h-[0.5px] w-[calc(100%+24px)] bg-[#e7e7e7] dark:bg-[#2f2f2f] absolute top-[30px] left-[-12px]" />
        </div>
        {/* header */}

        {/* body */}
        <div className="h-[371px] [@media(pointer:coarse)]:hidden mt-[12px] flex flex-col overflow-y-auto rounded-b-[20px] mx-[-12px] px-[12px] mb-[-12px] pb-[12px] gap-[12px]">
          <>
            {!users ? (
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            ) : users?.length === 0 ? (
              <div className="flex w-full justify-center">
                <TextCaption
                  text={`Ничего не менялось`}
                  style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                />
              </div>
            ) : (
              <div className="hideScrollbarNav flex flex-col gap-[12px] overflow-y-scroll pb-[12px]">
                {users.map((item, key) => (
                  <ConnectionCard
                    key={key}
                    update
                    updateModal={() => {
                      setCursor("");
                      getRequests("");
                    }}
                    item={item}
                  />
                ))}
                {hasNextPage ? (
                  <Waypoint
                    onEnter={async () => {
                      console.log("Enter waypoint");
                      await getRequests(cursor);
                    }}
                    topOffset="50px"
                  >
                    <div className="w-full flex justify-center items-center">
                      <CustomLoader diameter={36} />
                    </div>
                  </Waypoint>
                ) : null}
              </div>
            )}
          </>
        </div>
        {/* body */}
      </Modal>
      <MobileModal isOpen={modalState}>
        <div className="fixed w-full z-[-1] h-full top-0 left-0 bg-[#f6f6f8] dark:bg-[#141414]" />
        {/* header */}
        <MobileHeader onClick={() => setModalState(false)} />
        {/* header */}

        {/* body */}
        <div className="mt-[61px] flex flex-col gap-[6px] p-[12px] overflow-y-scroll h-[100vh]">
          <>
            {!users ? (
              <div className="w-full flex justify-center items-center h-full">
                <CustomLoader diameter={36} />
              </div>
            ) : users?.length === 0 ? (
              <div className="flex w-full justify-center">
                <TextCaption
                  text={`Ничего не менялось`}
                  style="text-[18px] leading-[21.6px] tracking-[-0.025em]"
                />
              </div>
            ) : (
              <>
                {users.map((item, key) => (
                  <ConnectionCard
                    key={key}
                    update
                    updateModal={() => {
                      setCursor("");
                      getRequests("");
                    }}
                    item={item}
                  />
                ))}
                {hasNextPage ? (
                  <Waypoint
                    onEnter={async () => {
                      console.log("Enter waypoint");
                      await getRequests(cursor);
                    }}
                    topOffset="50px"
                  >
                    <div className="w-full flex justify-center items-center">
                      <CustomLoader diameter={36} />
                    </div>
                  </Waypoint>
                ) : null}
                <div className="[@media(pointer:coarse)]:pb-[48px] [@media(hover)]:hidden" />
              </>
            )}
            <div className="mb-[61px]" />
          </>
        </div>
        {/* body */}
      </MobileModal>
    </>
  );
};

export default UpdatesModal;
