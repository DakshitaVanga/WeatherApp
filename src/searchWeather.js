import React, {useState} from "react"
import DayCard from "./dayCard"
import DegreeToggle from "./degreeToggle"

function SearchWeather(){
    
    const [query, setQuery] = useState('')
    const [cityData, setCityData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [degreeType, setDegreeType] = useState('celsius')
    
    const searchWeather = async (e) => {
        e.preventDefault()

        const url = `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${query}&appid=${process.env.REACT_APP_owmApiKey}`
        
        try {
            const response = await fetch(url)
            const data  = await response.json()
            const dailyData = data.list.filter(reading => {   
                return reading.dt_txt.includes("18:00:00")
                })
            const city = data.city.name
            const country = data.city.country
            setDailyData(dailyData)
            setCityData([city, country])
        }catch(err){
            console.error(err)
        }
    }

    const updateForecastDegree = (e)=>setDegreeType(e.target.value)

    return (
        <div>
            <form className="form" onSubmit={searchWeather}>
                <label className="label" htmlFor="query">City Name</label>
                <input className="input" type="text" name="query"
                        placeholder="i.e. Mumbai"
                        value={query} onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>
            <div>
                <h1 className="display-1 jumbotron ban">5-Day Forecast</h1>
                <h5 className="display-5 text-muted">{cityData[0]} {cityData[1]}</h5>
                <div className="toggle row justify-content-center">
                    <DegreeToggle degreeType={degreeType} updateForecastDegree={updateForecastDegree}/>
                </div>
                <div className="row justify-content-center flex-container">    
                    {dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={degreeType}/>)}
                </div> 
            </div>
        </div>
    )
}

export default SearchWeather
