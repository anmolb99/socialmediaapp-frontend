import React from 'react';
import Routing from './Routing';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={Store}>
        <Routing />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
