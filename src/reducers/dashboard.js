import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
   name: 'user',
   initialState: {
      user: {
         EmailAddress: '',
         FullName: '',
         AccountType: '',
      },
   },
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
   },
});

export const writeUpReducer = createSlice({
   name: 'writeUp',
   initialState: {
      writeUp: {
         EmailAddress: '',
         Title: '',
         Content: '',
      },
   },
   reducers: {
      setWriteUp: (state, action) => {
         state.writeUp = action.payload;
      },
      logout: (state) => {},
   },
});
