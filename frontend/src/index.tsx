import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App/App';
import reportWebVitals from './reportWebVitals';

const rootEl: HTMLElement = document.getElementById('root') as HTMLElement
// enable dark theme
rootEl.classList.add('dark')
// apply typography
rootEl.classList.add('prose')

const root = ReactDOM.createRoot(
    rootEl
);
root.render(
        <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
