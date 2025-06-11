import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return <h1>{message || "Loading..."}</h1>;
}
