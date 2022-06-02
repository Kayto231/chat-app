import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBottomItemFunction } from "../../redux/actions/bottomNavActions";

const BottomNavigationItem = ({ imageUrl, alt, id }) => {
  const dispatch = useDispatch();
  const { currentItem } = useSelector((state) => state.bottomNav);

  return (
    <li
      onClick={() => dispatch(setCurrentBottomItemFunction(id))}
      className={currentItem === id ? "item active" : "item"}
    >
      <img src={imageUrl} alt={alt} />
    </li>
  );
};

export default BottomNavigationItem;
