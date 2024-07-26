import React, { useState, useContext } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ReactDOM from "react-dom";
import UserContext from "../context/user";
import styles from "./css/CreateList.module.css";
import useFetch from "../hooks/useFetch";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [createList, setCreateList] = useState({
    productname: "",
    description: "",
    price: "",
  });

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { productname, description, price } = formData;
      return await usingFetch(
        "/product",
        "PUT",
        {
          productname,
          description,
          price,
        },
        userCtx.accessToken
      );
    },
  });

  const handleSubmit = () => {
    mutate(createList);
    props.setShowCreateListing(false);
  };

  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div>
            <div>Create Listing</div>

            <div>
              Product Name:
              <input
                onChange={(e) =>
                  setCreateList({ ...createList, productname: e.target.value })
                }
                value={createList.productname}
                type="text"
              ></input>
            </div>
            <div>
              Description:
              <input
                onChange={(e) =>
                  setCreateList({ ...createList, description: e.target.value })
                }
                value={createList.description}
                type="text"
              ></input>
            </div>
            <div>
              Price:
              <input
                onChange={(e) =>
                  setCreateList({ ...createList, price: e.target.value })
                }
                value={createList.price}
                type="number"
              ></input>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <button onClick={() => props.setShowCreateListing(false)}>
            close
          </button>
        </div>
      </div>
    </>
  );
};

const CreateList = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowCreateListing={props.setShowCreateListing} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CreateList;
