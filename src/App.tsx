import React, { useEffect, useState } from 'react';
import logo from './assets/logo.png';
import './App.css';
import Phone from './compoents/Phone';
import OneSignal from 'react-onesignal';

type Notification = {
  id: string;
  heading: string;
  content: string;
  data: any;
};

function App() {
  const [initialized, setInitialized] = useState(false);
  const [message, setMessage] = useState('');

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

      OneSignal.addListenerForNotificationOpened((data: any) => {
        const {content,heading} = data as Notification;
        // window.alert("Received NotificationOpened:" + JSON.stringify(data))
        setMessage(`${heading}：${content}`);
      });
    })

  }, [setInitialized]);

  return (
    <main>
      <img src={logo}
        alt="Logo"
        width="106"
        height="36"
      />

      <Phone message={message} />

      <a className="download-btn" href="https://article.zlink.toutiao.com/d13Q">下载今日头条</a>
    </main>
  );
}

export default App;
