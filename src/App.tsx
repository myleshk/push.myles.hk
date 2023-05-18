import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import './App.css';
import Phone from './compoents/Phone';
import OneSignal from 'react-onesignal';
import { Message } from './types';
import styled from 'styled-components';
import { addMessage } from './helpers/messageStore';
import Messages from './compoents/Messages';

const StyledMain = styled.main`
position: relative;
justify-content: center;
align-items: center;
height: 100svh;
display: flex;
flex-direction: column;
`

const StyledAnchor = styled.a`
display: block;
margin: 52px auto 0;
width: 160px;
height: 38px;
line-height: 38px;
color: #fff;
font-size: 14px;
font-weight: 700;
background: -webkit-linear-gradient(173.82deg, #ff373c 4.68%, #ff5757 83.21%);
background: -moz-linear-gradient(173.82deg, #ff373c 4.68%, #ff5757 83.21%);
background: linear-gradient(276.18deg, #ff373c 4.68%, #ff5757 83.21%);
border-radius: 19px;
text-decoration: none;
text-align: center;
`;

function App() {
  const [initialized, setInitialized] = useState(false);
  const [notification, setNotification] = useState<Message | null>(null);
  const [messagesShown, setMessagesShown] = useState(false);

  useEffect(() => {
    OneSignal.init({
      appId: '4141a199-dcc1-4ac0-95c4-d8c15258d208',
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: "push", // current types are "push" & "category"
              autoPrompt: true,
              text: {
                /* limited to 90 characters */
                actionMessage: "请允许接受我们的推送通知，以免错过最新最全资讯哦！",
                /* acceptButton limited to 15 characters */
                acceptButton: "马上允许",
                /* cancelButton limited to 15 characters */
                cancelButton: "再想想"
              },
              delay: {
                pageViews: 1,
                timeDelay: 1
              }
            }
          ]
        }
      }
    }).then(() => {
      setInitialized(true)
      OneSignal.showSlidedownPrompt().then(() => {
        console.log('OneSignal prompt shown');
      });

      OneSignal.addListenerForNotificationOpened((message: any) => {
        message = message as Message;
        // window.alert("Received NotificationOpened:" + JSON.stringify(data))
        setNotification(message)

        /**
         * Save to local storage
         */
        addMessage(message)
      });
    })

  }, [setInitialized]);

  return (
    <StyledMain>
      <img src={logo}
        alt="Logo"
        width="106"
        height="36"
      />

      <Phone notification={notification} />

      {messagesShown && (
        <Messages onClose={setMessagesShown.bind(undefined, false)} />
      )}

      <StyledAnchor href="#" onClick={setMessagesShown.bind(undefined, true)}>下载今日头条</StyledAnchor>
    </StyledMain>
  );
}

export default App;
