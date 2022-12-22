import { useEffect, useState } from "react"
import axios from 'axios';

export const useDataGet = (url) => {
    
    const [data,setData] = useState(null);
    useEffect(() => {
        axios.get(url)
        .then((resp) => {setData(resp.data);})
        .catch((er)=>console.log(er))
      
      }, [url]);
    return data 
};
