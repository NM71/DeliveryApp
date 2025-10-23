import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}
