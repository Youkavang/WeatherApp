import React, { useState } from 'react';
import './App.css';
import BoopButton from './button';



function App() {
  
  const api = {
  key: '2fb2b255ce6e148db7e3ef3846fb9428',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

const iconURL = {
  first: 'http://openweathermap.org/img/wn/',
  second: '@2x.png'
}
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useState({});
  const [forecast, setForecast] = useState ({});
  const [currentC, setCurrentC] = useState({});
  const [forecastC, setForecastC] = useState({});
  const [unit, setUnit] = useState('F');
  const [windUnit, setWindUnit] = useState ('mph');
  const [backupCurrent, setBackupCurrent] = useState({});
  const [backupForecast, setBackupForecast] = useState({});
  const [history, setHistory] = useState([]);
 
  // const [icon8, setIcon8] = useState('');
  // const [icon16, setIcon16] = useState('');
  // const [icon24, setIcon24] = useState('');
  // const [icon32, setIcon32] = useState('');

  const search = async (evt) => {
    if(evt.key === 'Enter'){
      await fetch(`${api.baseUrl}forecast?q=${query}&units=imperial&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setForecast(result);
        setBackupForecast(result);
      })
      .catch((err) => {
        console.log(err);
      });

      await fetch(`${api.baseUrl}weather?q=${query}&units=imperial&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setCurrent(result);
        setBackupCurrent(result);
        setHistory([current, result]);
        setHistory([...history, result]);
      })
      .catch((err) => {
        console.log(err);
      });

      await fetch(`${api.baseUrl}forecast?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setForecastC(result);
        
      })
      .catch((err) => {
        console.log(err);
      });

      await fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setQuery('');
        setCurrentC(result);
      
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  const celcius =()=>{
    setUnit('C');
    setWindUnit('km/h')
    setCurrent(currentC);
    setForecast(forecastC);
    console.log('button has been clicked');
  }

  const farenheit =()=>{
    setUnit('F');
    setWindUnit('mph');
    setForecast(backupForecast);
    setCurrent(backupCurrent);
    console.log('button has been clicked');
    console.log(history);
  }


 
  const dateBuilder = (d) => {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
    "Friday", "Saturday"];

    let day = days[d.getDay()];
    let hour = d.getHours();
    let minute = d.getMinutes();

    return `${day} ${hour > 12 ? hour - 12 : hour}:${minute >= 10 ? minute : `0${minute}`} ${hour >= 12 ? 'PM' : 'AM'}`
  }

  const dayBuilder = (d, num) => {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let day = days[d.getDay() + num];

    if(day === undefined){
      return days[d.getDay() + (num-7)];
    } else{
       return day
    }
  }
  
  return (

    <div className="app">
      <main>
          <div className='search-box'>
            <input 
            type="text"
            className='search-bar'
            placeholder='Please enter a city or country'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
          </div>
          {(typeof current.main != "undefined") ? (
            <div className='webpage' >
              <div className='banner'>
                <div className={`banner-background-${current.weather[0].icon}`}>
                  <div className='icon'>
                    <img className='column img' src={`${iconURL.first}${current.weather[0].icon}${iconURL.second}`} alt='icon' />
                  </div>
                  <div className='column temp'>
                    <p className='temp-num'>{`${Math.round(current.main.temp)}°${unit}`}</p>
                  </div>
                  <div className='column weather-info'>
                    <p className='description'>Description: {current.weather[0].description} </p>
                    <p className='humidity'>{`Humidity: ${current.main.humidity}%`} </p>
                    <p className='wind'>{`Wind: ${Math.round(current.wind.speed)} ${windUnit}`}</p>
                  </div>
                  <div className='column location-info'>
                    <p className='location'>{`${current.name}, ${current.sys.country}`}</p>
                    <p className='date'>{dateBuilder(new Date())}</p>
                    <p className='type-weather'>{current.weather[0].main}</p>
                  </div>
                </div>
              </div>
            </div>
         ) : ('')}
         {(typeof current.main != "undefined") ? (
          <div className='forecast'>
            <div className='icon-img-box'>
              <p>{dayBuilder(new Date(),0)}</p>
              <img className='icon-img' src={`${iconURL.first}${current.weather[0].icon}${iconURL.second}`} alt="day1-weather"/>
              <p>{`${Math.round(current.main.temp_max)}° `} {`${Math.round(current.main.temp_min)}° `}</p>
            </div>
            <div className='icon-img-box'>
              <p>{dayBuilder(new Date(),1)}</p>
              <img className='icon-img' src={`${iconURL.first}${forecast.list[8].weather[0].icon}${iconURL.second}`} alt="day1-weather"/>
              <p>{(Math.round(forecast.list[0].main.temp_max) > Math.round(forecast.list[8].main.temp_max)) ? 
              `${Math.round(forecast.list[0].main.temp_max)}°` : `${Math.round(forecast.list[8].main.temp_max)}°`}
              {(Math.round(forecast.list[0].main.temp_min) > Math.round(forecast.list[8].main.temp_min)) ? 
              `${Math.round(forecast.list[8].main.temp_min)}°` : `${Math.round(forecast.list[0].main.temp_min)}°`}
              </p>
            </div>
            <div className='icon-img-box'>
              <p>{dayBuilder(new Date(),2)}</p>
              <img className='icon-img' src={`${iconURL.first}${forecast.list[16].weather[0].icon}${iconURL.second}`} alt="day1-weather"/>
              <p>{(Math.round(forecast.list[8].main.temp_max) > Math.round(forecast.list[16].main.temp_max)) ? 
              `${Math.round(forecast.list[8].main.temp_max)}°` : `${Math.round(forecast.list[16].main.temp_max)}°`}
              {(Math.round(forecast.list[8].main.temp_min) > Math.round(forecast.list[16].main.temp_min)) ? 
              `${Math.round(forecast.list[16].main.temp_min)}°` : `${Math.round(forecast.list[8].main.temp_min)}°`}</p>
            </div>
            <div className='icon-img-box'>
              <p>{dayBuilder(new Date(),3)}</p> 
              <img className='icon-img' src={`${iconURL.first}${forecast.list[24].weather[0].icon}${iconURL.second}`} alt="day1-weather"/>
              <p>{(Math.round(forecast.list[16].main.temp_max) > Math.round(forecast.list[24].main.temp_max)) ? 
              `${Math.round(forecast.list[16].main.temp_max)}°` : `${Math.round(forecast.list[24].main.temp_max)}°`}
              {(Math.round(forecast.list[16].main.temp_min) > Math.round(forecast.list[24].main.temp_min)) ? 
              `${Math.round(forecast.list[24].main.temp_min)}°` : `${Math.round(forecast.list[16].main.temp_min)}°`}</p>
            </div>
            <div className='icon-img-box'>
              <p>{dayBuilder(new Date(),4)}</p>
              <img className='icon-img' src={`${iconURL.first}${forecast.list[32].weather[0].icon}${iconURL.second}`} alt="day1-weather"/>
              <p>{(Math.round(forecast.list[24].main.temp_max) > Math.round(forecast.list[32].main.temp_max)) ? 
              `${Math.round(forecast.list[24].main.temp_max)}°` : `${Math.round(forecast.list[32].main.temp_max)}°`}
              {(Math.round(forecast.list[24].main.temp_min) > Math.round(forecast.list[32].main.temp_min)) ? 
              `${Math.round(forecast.list[32].main.temp_min)}°` : `${Math.round(forecast.list[24].main.temp_min)}°`}</p>
            </div>
          </div>
         ) : ('')}
        {(typeof current.main != "undefined") ? (
          <div className='buttons'>
              <button className='button' onClick={farenheit}>°F</button>
              <button className='button' onClick={celcius}>°C</button>
              <div>What cities have you type in? {history.map((city) =>{
                return `${city.name},`
              })}</div>
          </div> 
        ) : ('')}
         {(typeof current.main != "undefined") ? (   
          <div>
            <div className='empty-space'>              
            </div>
          <BoopButton className='boop-button'/>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
