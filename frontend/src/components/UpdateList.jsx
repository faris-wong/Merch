import React, { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ReactDOM from "react-dom";
import styles from "./css/UpdateList.module.css";
import successsound from "../assets/success.mp3";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();

  const playsuccesssound = () => {
    const audio = new Audio(successsound);
    audio.play();
  };

  const [updateList, setUpdateList] = useState({
    productid: props.list.uuid,
    productname: props.list.product_name,
    description: props.list.description,
    price: props.list.price,
  });

  const [errors, setErrors] = useState({});

  const validateUpdateListing = () => {
    const newErrors = {};
    if (!updateList.productname || updateList.productname.trim().length === 0) {
      newErrors.productname = " product needs a name";
    }
    if (!updateList.price) {
      newErrors.price = " product needs a price";
    }
    if (updateList.price < 0) {
      newErrors.price = " price cannot be negative";
    }

    setErrors(newErrors);
  };
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
      playsuccesssound();
      props.setShowUpdateList(false);
    },
  });

  const handleSubmit = () => {
    validateUpdateListing();
    if (Object.keys(errors).length === 0) {
      mutate(updateList);
    }
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
              {errors.productname && (
                <span style={{ color: "red" }}>{errors.productname}</span>
              )}
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
              {errors.price && (
                <span style={{ color: "red" }}>{errors.price}</span>
              )}
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
