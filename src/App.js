import React from "react"
import SearchWeather from "./searchWeather"


class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="display-1 jumbotron title">Weather App</h1>
        <SearchWeather/>
      </div>
    );
  }
}

export default App