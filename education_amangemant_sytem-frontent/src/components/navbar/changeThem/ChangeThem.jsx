import React from "react";
import { themingList } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { changeMode } from "../../../redux/themingSlice";
import "./style.css";

const ChangeThem = () => {
  const dispatch = useDispatch();
  return (
    <div className="themingList">
      {themingList.map((item) => (
        <button
         className="theming_btn"
         key={item.id}
         onClick={() => dispatch(changeMode(item.name))}>    
       </button>
       
      ))}
    </div>
  );
};

export default ChangeThem;
