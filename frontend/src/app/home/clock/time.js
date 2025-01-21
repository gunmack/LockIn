import React, { useState, useEffect } from "react";
import "@/app/home/clock/clock.css";

function TimeUpdater() {
  const [timeData, setTimeData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const location = "America/Vancouver";

    const fetchTime = async () => {
      try {
        var locArray = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (!locArray) {
          locArray = location;
        }
        const result = new Intl.DateTimeFormat("en-US", {
          timeZone: locArray,
          hour: "2-digit",
          minute: "2-digit",
          second: undefined,
          hour12: true, // Enables AM/PM format
        }).format(new Date());

        if (!result) throw new Error("Could not fetch time");

        const timeData = {
          zone: locArray.split("/")[1].replace("_", " "),
          time: result,
        };
        setTimeData(timeData);

        localStorage.setItem("lastTimeData", JSON.stringify(timeData));
        localStorage.setItem("lastFetchTime", new Date().getTime().toString());
      } catch (e) {
        setError(e.message || "An unknown error occurred");
      }
    };

    const lastFetchTime = localStorage.getItem("lastFetchTime");
    const lastTimeData = localStorage.getItem("lastTimeData");
    const currentTime = new Date().getTime();

    if (lastFetchTime && currentTime - lastFetchTime <= 30000 && lastTimeData) {
      setTimeData(JSON.parse(lastTimeData));
    } else {
      fetchTime();
    }

    const interval = setInterval(fetchTime, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cityData = () => {
      if (window.innerWidth > 1100 && timeData) {
        setCity(`in ${timeData.zone}`);
      }
      if (window.innerWidth <= 1100 && timeData) {
        setCity("");
      }
    };
    window.addEventListener("resize", cityData);
    return () => {
      window.removeEventListener("resize", cityData);
    };
  }, [timeData]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-6xl font-mono bg-gray-200 text-black p-4 rounded-lg">
        {error ? (
          <p>Could not fetch time</p>
        ) : timeData ? (
          <p>
            {timeData.time.split(":")[0]}
            <span className="blink">:</span>
            {timeData.time.split(":")[1]}
            {"        "}
            {timeData.time[9]}
            {timeData.time[10]}
            {"        "}
            {city}
          </p>
        ) : (
          <p>
            Fetching time<span className="blink">...</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default TimeUpdater;
