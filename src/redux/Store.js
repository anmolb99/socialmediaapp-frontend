import {configureStore} from '@reduxjs/toolkit';
import UserReducer from './reducers/UserReducer';

const Store = configureStore({
  reducer: {reduxUserData: UserReducer},
});

export default Store;
