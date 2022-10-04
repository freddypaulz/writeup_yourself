import { combineReducers } from '@reduxjs/toolkit';
import { userReducer, writeUpReducer } from './dashboard';

const combinedReducer = combineReducers({
   user: userReducer.reducer,
   writeUp: writeUpReducer.reducer,
});

export const rootReducer = (state, action) => {
   if (action.type === 'writeUp/logout') {
      state = undefined;
   }
   return combinedReducer(state, action);
};
