import React from "react";

const SellCard = (props) => {
  return (
    <>
      <div>
        {props.list.product_name}
        {props.list.description}
        {props.list.price}
        <button>update</button>
        <button>delete</button>
      </div>
    </>
  );
};

export default SellCard;
