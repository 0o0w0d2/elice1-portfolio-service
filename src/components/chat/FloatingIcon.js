import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

import './FloatingIcon.css';
import ChatBox from './ChatBox';
import ChatList from './ChatList';

import { UserStateContext } from '../../App';

const FloatingIcon = ({
  receiverId,
  isMyPortfolio,
  receiver,
  chatList,
  currentUser,
}) => {
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [showChatList, setShowChatList] = useState(false);

  const userState = useContext(UserStateContext);
  const senderId = userState.user?.id;

  const handleClick = () => {
    console.log('Floating icon clicked');
    setShowChatList((prevShowChatList) => !prevShowChatList);
    setHasStartedChat(true);
  };

  const handleChatSelect = (roomId) => {
    console.log('handleChatSelect called with roomId:', roomId);
    setShowChatList(false);
    setSelectedRoomId(roomId);
    setHasStartedChat(true);
  };

  const location = useLocation();

  useEffect(() => {
    setShowChatList(false);
  }, [location]);

  return (
    <div className='floating-icon-container'>
      <FontAwesomeIcon
        icon={faComments}
        className='floating-icon'
        onClick={handleClick}
      />

      {showChatList && (
        <div className='chat-container'>
          {/* <ChatBox
            // show={!isMyPortfolio}
            show={true}
            handleClose={() => {
              setShowChatList(false);
              setSelectedRoomId(null);
            }}
            senderId={senderId}
            receiverId={receiverId}
            selectedRoomId={selectedRoomId}
            resetSelectedRoom={() => setSelectedRoomId(null)}
            isMyPortfolio={isMyPortfolio}
          /> */}
          <ChatBox
            show={true}
            handleClose={() => {
              setShowChatList(false);
              setSelectedRoomId(null);
            }}
            senderId={senderId}
            receiverId={receiverId}
            selectedRoomId={selectedRoomId}
            resetSelectedRoom={() => setSelectedRoomId(null)}
            isMyPortfolio={isMyPortfolio}
            chatHistory={chatList}
            counterpart={receiver}
          />
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
