import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GitApp from './AppGitApi';
import registerServiceWorker from './registerServiceWorker';




// ReactDOM.render(<App />, root);
ReactDOM.render(<GitApp />, root);
//ReactDOM.render(<App label="Do"/>, document.getElementById('root'));
registerServiceWorker();
