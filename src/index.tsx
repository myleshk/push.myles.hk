import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import OneSignal from 'react-onesignal';

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
  OneSignal.showSlidedownPrompt().then(() => {
    console.log('OneSignal prompt shown');
  });
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register(`${process.env.PUBLIC_URL}/service-worker.js`);
serviceWorkerRegistration.register(`${process.env.PUBLIC_URL}/OneSignalSDKWorker.js`);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
