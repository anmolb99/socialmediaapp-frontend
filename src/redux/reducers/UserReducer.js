import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  reduxUserData: {},
};

export const UserReducer = createSlice({
  name: 'reduxUserData',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.reduxUserData = action.payload;
    },
  },
});

export const {addUserData} = UserReducer.actions;

export default UserReducer.reducer;
