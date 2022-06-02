import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersFunction } from "../../redux/actions/chatactions";
import MyInput from "../../components/Attoms/MyInput/MyInput";
import "./FindContact_Style.scss";
import { useInput } from "../../Hooks/useInput/useInput";
import FindAsideContactItem from "../../components/FindAsideContactItem/FindAsideContactItem";

const FindContact = () => {
  const { allUsers } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const search = useInput("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersFunction());
  }, []);

  return (
    <div className="column">
      <MyInput
        className={"input"}
        value={search.value}
        onChange={(e) => search.onChange(e)}
        onBlur={(e) => search.onBlur(e)}
        placeholder={"Search for a user..."}
      />
      {allUsers
        .filter((user) =>
          user?.username?.toLowerCase().includes(search.value.toLowerCase())
        )
        .filter((users) => users._id !== user.id)
        .map((user) => (
          <FindAsideContactItem key={user.username} chatUser={user} />
        ))}
    </div>
  );
};

export default FindContact;
