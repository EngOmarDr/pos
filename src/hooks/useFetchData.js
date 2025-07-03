import { useEffect, useState } from "react";

export default function useFetchData(fetchFN) {
  const [fetchData, setFetchData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(()=>{
    async function getData() {
        setIsFetching(true)
        try {
            const data = await fetchFN();
            console.log(data);
            setFetchData(data)
            setIsFetching(false)
        } catch (responceError) {
            setError({'message': responceError.response.data.message || 'Faild To Fetch Data'})
            setIsFetching(false)
        }
    }
    getData()
  },[])

  return {
    fetchData,
    setFetchData,
    isFetching,
    error
  }
}
