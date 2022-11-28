require('dotenv').config();

import { App } from './src';

App.getInstance().init().then((response) => console.log('Application started'));

