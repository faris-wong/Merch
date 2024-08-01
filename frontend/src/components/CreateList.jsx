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
import successsound from "../assets/success.mp3";

const Overlay = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const queryClient = useQueryClient();
  const [createList, setCreateList] = useState({
    productname: "",
    description: "",
    price: "",
    image: null,
  });

  const playsuccesssound = () => {
    const audio = new Audio(successsound);
    audio.play();
  };

  const { mutate } = useMutation({
    mutationFn: async (formData) => {
      const { productname, description, price, image } = formData;

      //   const data = new FormData();
      //   data.append("productname", productname);
      //   data.append("description", description);
      //   data.append("price", price);
      //   if (image) {
      //     data.append("imageurl", image);
      //   }

      return await usingFetch(
        "/product",
        "PUT",

        formData,
        userCtx.accessToken,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list"] });
      playsuccesssound();
      props.setShowCreateListing(false);
    },
  });

  const handleFileChange = (e) => {
    setCreateList({ ...createList, image: e.target.files[0] });
  };

  const [errors, setErrors] = useState({});

  const validateCreateListing = () => {
    const newErrors = {};
    if (!createList.productname) {
      newErrors.productname = " product needs a name";
    }
    if (!createList.price) {
      newErrors.price = " product needs a price";
    }
    if (createList.price < 0) {
      newErrors.price = " price cannot be negative";
    }

    setErrors(newErrors);
  };

  const handleSubmit = () => {
    validateCreateListing();
    if (Object.keys(errors).length === 0) {
      mutate(createList);
    }
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
              {errors.productname && (
                <span style={{ color: "red" }}>{errors.productname}</span>
              )}
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
              {errors.price && (
                <span style={{ color: "red" }}>{errors.price}</span>
              )}
            </div>
            <div>
              Upload image:
              <input onChange={handleFileChange} type="file"></input>
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
