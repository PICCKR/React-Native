/**
 * @format
 */

import {AppRegistry} from 'react-native';
import awsExports from "./amplifyConfig/aws-exports";
import { Amplify } from "aws-amplify";
import { Provider } from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';

Amplify.configure({
    ...awsExports,
  });
  

const AppRedux = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
AppRegistry.registerComponent(appName, () => AppRedux);
