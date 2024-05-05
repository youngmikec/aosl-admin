import { FC, useState, useEffect } from 'react';
import { ChatRoom } from '../../models/chat-room';
import { RETREIVE_CHAT_ROOMS } from '../../service/chat-rooms';
import { BiSearch } from 'react-icons/bi';
import RoomComp from './room-comp';

const ChatRoomsComp: FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>('');
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  const retrieveChatRooms = () => {
    const query: string = `?sort=-createdAt&populate=members,createdBy`;
    RETREIVE_CHAT_ROOMS(query).then(res => {
      const { payload } = res.data;
      setChatRooms(payload);
    }).catch(err => {
      console.log('error', err);
    })
  }

  useEffect(() => {
    retrieveChatRooms();
  }, []);

  return (
    <>
      <div className="w-full bg-white border-[2px] border-[#e0e0e0] rounded-lg shadow-md relative h-[90vh]">
        <div className="w-full flex justify-start bg-white z-10 gap-4 p-4 border-b-[1px] border-[#e0e0e0] absolute top-0 left-0 right-0">
          <input 
            type="text"
            value={searchString}
            placeholder='search'
            onChange={(e) => setSearchString(e.target.value)}
            className="w-full rounded-md bg-[#e3f5ff] border-[1px] border-[#e0e0e0] p-2 focus:outline-none focus:ring-0"
          />
        </div>

        <div className="w-full h-full overflow-y-auto p-4 my-2">
          <div className="w-full flex flex-col gap-4 mt-[60px]">
            {
              chatRooms && chatRooms.map((chatRoom: ChatRoom, idx: number) => {
                return ( <RoomComp key={idx} room={chatRoom} /> )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatRoomsComp;