import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./css/UpdateList.module.css";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [updateList, setUpdateList] = useState({
    productid: props.list.uuid,
    productname: props.list.product_name,
    description: props.list.description,
    price: props.list.price,
  });

  const { mutate } = useMutation({
    mutationFn: async (updateData) => {
      const { productid, productname, description, price } = updateData;
      return await usingFetch(
        "/product",
        "PATCH",
        {
          productid,
          productname,
          description,
          price,
        },
        userCtx.accessToken
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
    },
  });

  const handleSubmit = () => {
    mutate(updateList);
    console.log(updateList);
    props.setShowUpdateList(false);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>Update Product Listing</div>
            <div>
              Product Name:
              <input
                onChange={(e) =>
                  setUpdateList({ ...updateList, productname: e.target.value })
                }
                value={updateList.productname}
                type="text"
              ></input>
            </div>
            <div>
              Description:
              <input
                onChange={(e) =>
                  setUpdateList({ ...updateList, description: e.target.value })
                }
                value={updateList.description}
                type="text"
              ></input>
            </div>
            <div>
              Price:
              <input
                onChange={(e) =>
                  setUpdateList({ ...updateList, price: e.target.value })
                }
                value={updateList.price}
                type="number"
              ></input>
            </div>
            <div>
              <button onClick={handleSubmit}>Update</button>
            </div>
          </div>

          <button onClick={() => props.setShowUpdateList(false)}>close</button>
        </div>
      </div>
    </>
  );
};

const UpdateList = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowUpdateList={props.setShowUpdateList}
          list={props.list}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateList;
