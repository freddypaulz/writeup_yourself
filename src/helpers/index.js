import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'reducers';

export {
   validEmail,
   validFullName,
   validPassword,
   validWriteUpTitle,
   validWriteUpContent,
} from './RegExpression';

export const store = configureStore({
   reducer: rootReducer,
});
