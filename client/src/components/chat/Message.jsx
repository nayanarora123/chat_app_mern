import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { AdjustmentsVerticalIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../layout/Modal";
import {
  STATUS_DELETE_FOR_EVERYONE,
  STATUS_DELETE_FOR_ME
} from '../../utils/Constants';

import {
  deleteMessage
} from "../../services/chatService";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Message(
  {
    message,
    self,
    socket,
    setMessages
  }) {


    console.log(message);

  const [hover, setHover] = useState(false);
  const [actionList, setActionList] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".message-wrapper")) {
        setActionList(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [])

  useEffect(() => {
    socket.current?.on('filteredMessages', ({ messageId, status }) => {
      setMessages(messages => {
        return messages.map(message => {
          if (message._id === messageId) {
            return { ...message, status: status }
          } 
          return message;
        })
      });
    })
  }, []);

  const handleDelete = async (e) => {
    const status = (e.target.textContent === 'Delete For Me' ? STATUS_DELETE_FOR_ME : STATUS_DELETE_FOR_EVERYONE);
    await deleteMessage(message._id, status);
    socket.current?.emit('deleteMessage', { messageId: message._id, status });
    setModal(false);
  }

  return (
    <>
      <li
        className={classNames(
          self !== message.sender ? "justify-start" : "justify-end",
          "flex"
        )}
      >
        <div className="message-wrapper">
          <div className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={classNames(
                self !== message.sender
                  ? "text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                  : "bg-blue-600 dark:bg-blue-500 text-white",
                "relative max-w-xl px-4 py-2 rounded-lg shadow flex justify-between"
              )}
            >
              <span className="block font-normal ">{message.message}</span>
              {hover && <button onClick={() => setActionList(!actionList)}>
                <AdjustmentsVerticalIcon className={classNames(self !== message.sender ? "text-white-900" : "text-neutral-900", "h-5", "w-5", "ml-3")} />
              </button>}
            </div>
            {actionList && <div className="absolute text-white action-message-bar">
              <ul>
                <li>
                  <button className="flex justify-end" onClick={() => setModal(true)}>
                    <span>Delete</span> <TrashIcon className="w-4 h-4 mt-0 ml-1" />
                  </button>
                </li>
              </ul>
            </div>}
          </div>
          <span className="block text-sm text-gray-700 dark:text-gray-400">
            {format(message.createdAt)}
          </span>
        </div>
      </li>
      {modal && <Modal
        modal={modal}
        setModal={setModal}
        dialogTitle={'Delete Message'}
        buttons={
          [
            { title: 'Delete For Everyone', click: handleDelete },
            { title: 'Delete For Me', click: handleDelete }
          ]
        }
        handleClick={handleDelete}
      />}
    </>
  );
}
