const useFetchNT = () => {
  const fetchData = async (endpoint, method, body) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const resData = await res.json();

    if (!res.ok) {
      // throw new Error("database error");
      if (resData.errors) {
        // let returnErrors = "";
        // for (const error of resData.errors) {
        //   returnErrors += error.msg + " ";
        // }
        // throw new Error(returnErrors);
        throw new Error(resData.errors[0].msg);

        // let returnErrorsArray = []
        // for (const error of resData.errors) {
        //  returnErrorsArray.push(error.msg)
        // }
        // throw new Error(returnErrorsArray)
      }

      if (resData.status === "error") {
        throw new Error(resData.msg);
      }

      throw new Error('an error has occurred, please try again later')
    }

    return resData;
  };

  return fetchData;
};

export default useFetchNT;
