import React from "react";
import { format } from "date-fns";
export const Time = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div>
      <p className="time">{`Сейчас ${format(time, "HH:mm")} `} </p>
    </div>
  );
};
