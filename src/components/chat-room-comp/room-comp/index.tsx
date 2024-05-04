import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ChatRoom } from '../../../models/chat-room';
import { SET_ACTIVE_CHAT_ROOM } from '../../../store/Chat';

type Props = {
  room: ChatRoom;
}

const RoomComp: FC<Props> = ({ room }) => {
  const dispatch = useDispatch()
  const setActiveRoom = () => {
    dispatch(SET_ACTIVE_CHAT_ROOM(room))
  }
  
  return (
    <>
      <div 
        className="w-full px-4 py-1 my-1 hover:border-[2px] hover:border-[#e0e0e0] rounded-lg hover:shadow-md cursor-pointer"
        onClick={setActiveRoom}
      >
        <div className="flex justify-start">
          <div>
            <img src={room.roomImage || 'https://picsum.photos/200'} width={'40px'} height={"40px"} className="rounded-lg" alt="room image" />
          </div>

          <div className="my-auto">
            <p className="text-[#042F9C] text-sm font-semibold">{room.name}</p>
            {/* <p className="text-[#BFBFBF] text-sm "></p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomComp;