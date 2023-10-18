import { useEffect, useState } from "react";

export default function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <time dateTime={date.toISOString()}>
        <p>{date.toLocaleDateString()}</p>
      </time>
    </>
  );
}
