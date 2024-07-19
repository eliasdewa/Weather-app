import { useEffect, useRef, useState } from 'react'
import { FiSearch, FiWind } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';
import { toast } from 'react-toastify';

export default function Weather() {
  // To store data that comes from api calls
  const [weatherData, setWeatherData] = useState(false);

  // To get the value from input field
  const inputRef = useRef();

  const search = async( city ) => {
    if (city === "") {
      toast.error("Please enter a city");
    }
    try {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
				import.meta.env.VITE_API_KEY
			}`;
      const response = await fetch(apiURL);
      const data = await response.json();
			if (!response.ok) {
				toast.error(data.message)
			}
      // console.log(data);
      setWeatherData({
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				temperature: Math.floor(data.main.temp),
				location: data.name,
				icon: data.weather[0].icon,
			});
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching weather data from the api", error);
    }
  };
  // To call the search function whenever the component is loaded
  useEffect(() => {
    search('London');
  }, []);
  return (
		<div className='place-self-center p-10 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center'>
			<div className='flex items-center gap-3'>
				<input
					type='text'
					placeholder='Search the city...'
					className='h-12 border-0 outline-none rounded-3xl pl-6 text-[#626262] bg-[#ebfffc] text-xl'
					ref={inputRef}
				/>
				<div>
					<FiSearch
						className='w-12 h-12 rounded-full bg-[#ebfffc] p-2 cursor-pointer mx-auto'
						onClick={() => search(inputRef.current.value.trim())}
					/>
				</div>
			</div>
			{weatherData ? (
				<>
					<div>
						<img
							src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
							alt=''
							className='w-60 h-60 place-self-center'
						/>
					</div>
					<p className='text-white text-6xl'>{weatherData.temperature} °C</p>
					<p className='text-white text-4xl'>{weatherData.location}</p>
					<div className='w-full mt-10 text-white flex gap-12'>
						<div className='flex items-start gap-2 text-2xl'>
							<div className='place-self-center'>
								<WiHumidity size={60} />
							</div>
							<div>
								<p className='text-xl'>{weatherData.humidity} %</p>
								<span className='text-lg'>Humidity</span>
							</div>
						</div>
						<div className='flex gap-2 text-2xl'>
							<div className='place-self-center'>
								<FiWind size={60} />
							</div>
							<div>
								<p className='text-xl'>{weatherData.windSpeed} Km/h</p>
								<span className='text-lg'>Wind Speed</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
}
