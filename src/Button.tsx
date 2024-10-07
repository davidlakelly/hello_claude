import { useState, useEffect } from "react";

export default function Button() {
  const [data, setData] = useState(0);
  async function getData() {
    const url = import.meta.env.VITE_APP_URL
    const response = await fetch(url);
    const data = await response.json();
    setData(data.message);
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <button onClick={getData}>
      Data is: {data}
    </button>
  );
}