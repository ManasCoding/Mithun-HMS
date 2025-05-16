import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
// import { getUserName } from "../helper/helper";

// Custom hook...
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        // const { username } = !query ? await getUserName() : "";
        const token = JSON.parse(localStorage.getItem("token"));
        const { id } = jwtDecode(token);

        const { data, status } = !query
          ? await axios.get(`/api/user/${id}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}
