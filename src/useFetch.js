import {useState,useEffect} from 'react';
const useFetch = (url) =>{
    const [error,setError] = useState(null);
    const [data,setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    useEffect(()=>{
             fetch(url).then((res)=>{
                  if(!res.ok)
                  {
                    throw Error("Couldn't fetch the data, server error");
                  }
                  return res.json();
             }).then((data)=>{
                setData(data);
                setIsPending(false);
                setError(null);
             }).catch((err)=>{
                setError(err.message);
                setIsPending(false);
            
             })
    },[url])

   return {data,error,isPending};
    

}
export default useFetch;