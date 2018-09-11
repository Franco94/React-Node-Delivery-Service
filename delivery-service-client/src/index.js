import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles.css';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(<App/>, document.getElementById('root'));
