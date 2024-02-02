import { useEffect, useState } from "react"

export default function App() {

    const [inputValue, setInputValue] = useState('Istanbul');
    const [isClicked, setIsClicked] = useState(false);
    const [dataLocation, setLocation] = useState([]);
    const [dataCurrent, setCurrent] = useState([]);
    const [dataForecast, setForecast] = useState([]);


    function inputChange(e) {
        setInputValue(e.target.value);
    }

    function clickButton() {
        setIsClicked(true);
        console.log(inputValue)
    }

    useEffect( () => {
        async function fetchData() {
            let database = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3a7fef278f1c4b4586b135731240401&q=${inputValue}&days=3&aqi=yes&alerts=yes`).then(r => r.json());
            setLocation(database.location);
            setForecast(database.forecast.forecastday);
            setCurrent(database.current)
        }
        
        
        if (isClicked) {
            fetchData();
            setIsClicked(false);
        }

        fetchData();
    }, [isClicked])



    return (
        <>
            
            <div className="input">
                <p>{dataLocation.name} / {dataLocation.country} </p>
                <div className="searchInput">
                    <input type="text" placeholder="Şehir giriniz..." onChange={inputChange} value={inputValue}/>
                    <button onClick={clickButton}><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </div>


            <div className="results">

                <div className="current">
                        
                        {dataLocation && typeof dataLocation.localtime === 'string' && <h3>{dataLocation.localtime.slice(8, 10)} . {dataLocation.localtime.slice(5, 7)} . {dataLocation.localtime.slice(0, 4)}</h3>}
                        
                        {dataCurrent.condition && (
                            <img
                            src={dataCurrent.condition.icon}
                            alt={dataCurrent.condition.text}
                            />
                        )}

                        <h2>{dataCurrent.temp_c}°</h2>
                        <p><span>Rüzgar hızı</span>{dataCurrent.wind_kph} km/h</p>
                        <p><span>Yağış miktarı</span>{dataCurrent.precip_mm} mm</p>
                        <p><span>Nem Oranı</span>% {dataCurrent.humidity}</p>
                        <p><span>Hissedilen sıcaklık</span>{dataCurrent.feelslike_c} °</p>

                </div>


                {dataForecast.slice(1).map((forecastDay, index) => (
                    <div className="resultsItem" key={index}>
                    <h3>{forecastDay.date.slice(8, 10)} . {forecastDay.date.slice(5, 7)} . {forecastDay.date.slice(0, 4)}</h3>
                    <img src={forecastDay.day.condition.icon} alt={forecastDay.day.condition.text} />
                    <h2>{forecastDay.day.avgtemp_c}°</h2>

                    <p><span>Rüzgar hızı</span>{forecastDay.day.maxwind_kph} km/h</p>
                    <p><span>Yağmur ihtimali</span>%{forecastDay.day.daily_chance_of_rain}</p>
                    <p><span>Kar ihtimali</span>%{forecastDay.day.daily_chance_of_snow}</p>
                    <p><span>Nem oranı</span>%{forecastDay.day.avghumidity}</p>

                    
                    
                    </div>
                ))}
                </div>


        </>
    )
}