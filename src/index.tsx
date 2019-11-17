import React from 'react';
import ReactDOM from 'react-dom';
import * as ServiceWorker from './serviceWorker';

import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));
ServiceWorker.unregister();
