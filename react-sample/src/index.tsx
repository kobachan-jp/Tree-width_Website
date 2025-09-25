import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Hello from './components/Hello';
import Name from './components/Name';
import Message from './components/Message';
//import Parent from './components/ContainerSample';
import Parents from './components/ContainerSample2';
import Page from './components/ContextSample';
import Counter from './ReactSample/useState';
import Counter2 from './ReactSample/useReducer';
import { Parent2 } from './components/Parent2';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  //以下はJSXタグ（JavaScriptやTypescript中にHTMLタグをそのまま書き込めるもの)
  <React.StrictMode>
    <Hello />
    <Name />
    <Message />
    <Parent2 />
    <Parents />
    <Page />
    <Counter initialValue={0} />
    <Counter2 initialValue={0} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
