import { FC } from 'react';
import UserLayout from '../../shared/layouts/user-layout';
import ChatComp from '../../components/chat-comp';


// style link end 

const ChatPage: FC = () => {

    return (

        <UserLayout>
            <div className="mx-auto w-full sm:w-11/12 md:w-10/12 lg:w-10/12">
                <ChatComp />
            </div>
        </UserLayout>
    )
}

export default ChatPage;


