import { userReducer } from 'reducers/dashboard';
const { setUser } = userReducer.actions;
export const setUserAction = (user) => (dispatch) => {
   dispatch(setUser(), user);
};
