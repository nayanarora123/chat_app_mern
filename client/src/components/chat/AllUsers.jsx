import React, { useEffect, useState } from "react";
import Contact from "./Contact";
import UserLayout from "../layout/UserLayout";

export default function AllUsers({
  users,
  currentUser,
}) {

  const [nonContacts, setNonContacts] = useState([]);

  useEffect(() => {
    setNonContacts(
      users.filter(u => u.uid !== currentUser.uid)
    )
  }, [users, currentUser.uid])

  return (
    <>
      <ul className="overflow-auto h-[30rem] h-full">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
        <li>
          {...Array(5).keys().map((chatRoom, index) => (
            <div
              key={index}
              className={
                // classNames(
                // index === selectedChat
                //   ? 
                  "bg-gray-100 dark:bg-gray-700"
                //   : "transition duration-150 ease-in-out cursor-pointer bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700",
                // "flex items-center px-3 py-2 text-sm "
            //   )
            }
            //   onClick={() => changeCurrentChat(index, chatRoom)}
            >
              <Contact />
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Other Users
        </h2>
        <li>
          {nonContacts.map((nonContact, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
            //   onClick={() => handleNewChatRoom(nonContact)}
            >
              <UserLayout />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
