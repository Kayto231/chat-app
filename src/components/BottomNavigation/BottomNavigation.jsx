import React from "react";
import { useSelector } from "react-redux";
import BottomNavigationItem from "./BottomNavigationItem";
import "./BottomNavigation_Style.scss";

const BottomNavigation = () => {
  const { bottomItems } = useSelector((state) => state.bottomNav);
  return (
    <ul className="bottom__menu">
      {bottomItems.map((item) => (
        <BottomNavigationItem
          key={item.imageUrl}
          imageUrl={item.imageUrl}
          alt={item.alt}
          id={item.id}
        />
      ))}
    </ul>
  );
};

export default BottomNavigation;
