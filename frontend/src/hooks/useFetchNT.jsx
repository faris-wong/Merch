const useFetchNT = () => {
  const fetchData = async (endpoint, method, body) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);

    if (!res.ok) {
      throw new Error({ status: res.status, msg: "database error" });
    }

    const resData = await res.json();
    return resData;
  };

  return fetchData;
};

export default useFetchNT;
