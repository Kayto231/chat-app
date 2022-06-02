import {
  LOG_OUT_BOTTOM_NAV,
  SET_CURRENT_ITEM,
} from "../reducers/BottomoNavReducer/consts";

export const setCurrentBottomItemAction = (num) => ({
  type: SET_CURRENT_ITEM,
  payload: num,
});
export const logOutBottomNavAction = () => ({
  type: LOG_OUT_BOTTOM_NAV,
});

export const setCurrentBottomItemFunction = (id) => {
  return (dispatch) => {
    dispatch(setCurrentBottomItemAction(id));
  };
};
