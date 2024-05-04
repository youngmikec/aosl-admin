import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItem } from "../../utils";
import { RootState } from "../../store";
import MessageComp from "./message-comp";
import ChatRoomsComp from "../chat-room-comp";
import ChatInputComp from "./chat-input-comp";
import { ChatMessage } from "../../models/chat";
import ChatProfileComp from "./chat-profile-comp"
import { ChatRoom } from "../../models/chat-room";
import { RETREIVE_CHATE_ROOMS } from "../../service/chat-rooms";
import { RETREIVE_CHAT_MESSAGES, SEND_CHAT_MESSAGE } from "../../service";
import { ADD_CHAT_MESSAGE, SET_CHAT_MESSAGES } from "../../store/Chat";


const ChatComp = () => {
  const ActiveChatRoom: ChatRoom | null = useSelector((state: RootState) => state.chatState.value.activeRoom);
  const ChatMessages: ChatMessage[] = useSelector((state: RootState) => state.chatState.value.chatMessages);

  const dispatch = useDispatch();

  const sender = getItem('clientD');
  const [senderId, setSenderId] = useState<string>('');
  const [recipientId, setRecipientId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');

  const retrieveChatMessages = () => {
    const queryString: string = `?room=${roomId}&populate=sender,recipient,room`
    RETREIVE_CHAT_MESSAGES(queryString).then(res => {
      const { payload } = res.data;
      setChatMessages(payload);
      dispatch(SET_CHAT_MESSAGES(payload));
    }).catch(err => {
      console.log('error', err);
    })
  }


  const sendMessage = () => {
    const data = {
      message,
      room: roomId,
      sender: senderId,
      recipient: recipientId
    }
    if(message !== ''){
      SEND_CHAT_MESSAGE(data).then(res => {
        const { payload } = res.data;
        dispatch(ADD_CHAT_MESSAGE(payload))
      }).catch(err => {
        console.log('error', err);
      });
    }
  }


  useEffect(() => {
    sender && setSenderId(sender.id);
  }, [sender]);

  useEffect(() => {
    if(ActiveChatRoom) {
      setRoomId(ActiveChatRoom.id);
      setRecipientId(ActiveChatRoom.members.filter((member: any) => (member.id !== senderId))[0].id);
    }
  }, [ActiveChatRoom]);


  useEffect(() => {
    if(roomId){
      if(chatMessages.length < 1) {
        setInterval(() => {
          retrieveChatMessages();
        }, 6000);
      }else {
        retrieveChatMessages();
      }
    }
  }, [roomId]);



  return (
    <>
      <div className="flex justify-between gap-4">
        {/* side bar */}
        <div className="w-[30%]">
          <ChatRoomsComp />
        </div>
        {/* side bar */}

        {/* check sections */}
        <div className="flex-2 w-full bg-white border-[1px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
          <ChatProfileComp data={ActiveChatRoom} />

          {/* chats */}
          <div className="w-full bg-white overflow-y-scroll mt-[60px] h-[85%] p-4 pb-12">
            {
              chatMessages.length > 0 && chatMessages.map((chat: ChatMessage, idx) => {
                return <MessageComp key={idx} chatMessage={chat} direction={(chat.sender.id == senderId || chat.sender.userType === 'ADMIN') ? 'outgoing' : 'incoming'} />
              })
            }
          </div>
          {/* chats */}

          <div className="w-full p-4 absolute bottom-0 left-0 right-0 z-10">
            <ChatInputComp value={message} onChannge={(e) => setMessage(e.target.value)} onSubmit={sendMessage}/>
          </div>
        </div>
        {/* check sections */}
      </div>
    </>
  )
}

export default ChatComp