import { LOG_OUT_BOTTOM_NAV, SET_CURRENT_ITEM } from "./consts";
import { items } from "./items";

const initialState = {
  bottomItems: items,
  currentItem: 1,
};

export const bottomNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case LOG_OUT_BOTTOM_NAV:
      return {
        bottomItems: items,
        currentItem: 1,
      };
    default:
      return {
        ...state,
      };
  }
};
