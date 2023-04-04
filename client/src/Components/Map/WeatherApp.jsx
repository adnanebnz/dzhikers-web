import { useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
const Api_key = "20fb0ebb2dc7a3365e9ff571a2108c7e";

const WeatherApp = () => {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);

  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setApiData(null);
        if (data.cod == 404 || data.cod == 400) {
          // ARRAY OF OBJ
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png",
            },
          ]);
        }
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="mt-3 ml-3 flex items-center gap-2">
        <h1 className="text-gray-700 text-lg">Temperature</h1>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            ref={inputRef}
            placeholder="Entrez votre emplacement"
            className="border-b
          p-1 border-gray-200 font-semibold"
          />
          <button onClick={fetchWeather}>
            <BiSearch size={28} className="text-gray-700" />
          </button>
        </div>
        <div>
          {loading ? (
            <div className="flex items-center justify-center bg-white opacity-95 w-full h-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 animate-spin"
              />
            </div>
          ) : (
            showWeather && (
              <div className="">
                {apiData && (
                  <div class="mt-2">
                    <div class="flex">
                      <div class="bg-white shadow-2xl rounded-2xl border-2 border-gray-50 min-w-full">
                        <div class="flex flex-col">
                          <div style={{ padding: "0.4rem" }}>
                            <div>
                              <h2 class="font-bold text-gray-600 text-center">
                                {apiData?.name + "," + apiData?.sys?.country}
                              </h2>
                            </div>
                            <div class="pt-4">
                              <div class="flex flex-row space-x-4 items-center">
                                <div>
                                  <img
                                    src={showWeather[0]?.img}
                                    alt="..."
                                    className="w-14"
                                  />
                                </div>
                                <div id="temp">
                                  <h1>{showWeather[0]?.type}</h1>
                                  <h4 class="text-4xl">
                                    {" "}
                                    {Math.ceil(apiData?.main?.temp)} &deg;C
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
