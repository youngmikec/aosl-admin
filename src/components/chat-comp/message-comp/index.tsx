import { FC } from 'react';
import moment from 'moment';
import { ChatMessage } from '../../../models/chat';

type Props = {
  chatMessage: ChatMessage;
  direction?: 'incoming' | 'outgoing';
}

const MessageComp: FC<Props> = ({ chatMessage, direction }) => {
  const incomingMsgStyle: string = 'border-[#afafaf] bg-[#e0e0e0] rounded-b-2xl rounded-tl-none rounded-tr-2xl';
  const outGoingMsgStyle: string = 'border-[#c8ecff] bg-[#e3f5ff] rounded-b-2xl rounded-tr-none rounded-tl-2xl';

  return (
    <div className={`flex my-4 ${direction === 'incoming' ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`w-auto max-w-[65%] p-4 h-max border-[1px] ${direction === 'incoming' ? incomingMsgStyle : outGoingMsgStyle}`}
      >
        <div className="flex flex-row gap-2">
          <div className="flex-grow">
            <p className="text-gray-700 text-sm">{chatMessage.message}</p>
          </div>
          <div className="flex items-baseline w-max">
            <p className="text-gray-700 text-[10px]">{moment(chatMessage.createdAt).format('hh:mm:a')}</p>
          </div>
        </div>
        {
          direction === 'outgoing' && (
            <div className="flex justify-end">
              <p className="text[$c8ecff] text-[10px] font-bold">Admin {chatMessage.sender?.firstName} {chatMessage.sender?.lastName}</p>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default MessageComp;