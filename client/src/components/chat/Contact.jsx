import { 
  useState, 
  useEffect 
} from "react";
import UserLayout from "../layout/UserLayout";
import { getUser } from "../../services/chatService";

export default function Contact({
  chatRoom,
  onlineUsersId,
  currentUser
}) {

  const [contact, setContact] = useState();

  useEffect(() => {
    const contactId = chatRoom?.members?.find(
      (member) => member !== currentUser.uid
    );

    if (contactId) {
      const fetchData = async () => {
        const res = await getUser(contactId);
        setContact(res);
      };
      fetchData();
    }

  }, [chatRoom, currentUser]);

  return <UserLayout 
    user={contact}
    onlineUsersId={onlineUsersId}
  />;
}
