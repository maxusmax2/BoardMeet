import { useEffect, useState } from "react"
import axios from 'axios';

export const useData = (url) => {
    
    const [data,setData] = useState(null);
    useEffect(() => {
        axios.get(url).then((resp) => {
          setData(resp.data);
        });
      }, [url]);
    
    return data 
};
