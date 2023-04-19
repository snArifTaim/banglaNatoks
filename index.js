/**
 * @format
 */
import OneSignal from 'react-native-onesignal';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

OneSignal.setAppId('5bebfc37-7096-49e8-a096-3b4dfe09c4e9');
AppRegistry.registerComponent(appName, () => App);
