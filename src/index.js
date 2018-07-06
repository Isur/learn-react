import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GitApp from './AppGitApi';
import AppGame from './Game';
import registerServiceWorker from './registerServiceWorker';




// ReactDOM.render(<App />, root);
ReactDOM.render(<AppGame />, root);
//ReactDOM.render(<App label="Do"/>, document.getElementById('root'));
registerServiceWorker();
