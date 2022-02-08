import axios from 'axios';
import { useEffect, useState } from 'react';

const useServerData = (dataEndpoint) => {
  const [data, setData] = useState(dataEndpoint);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await axios(dataEndpoint);
      if (fetchedData) setData(fetchedData.data);
    };

    if (typeof dataEndpoint === 'string') {
      fetchData();
    }
  }, []);

  return data;
};

export default useServerData;
