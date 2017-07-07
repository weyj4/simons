import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import { fetchCountries, fetchWorldPop, fetchUSAPop, fetchShortNames, fetchCountry, fetchRank } from './redux/actions'
import './App.css'
import Country from './Country'

function mapStateToProps(state) {
  return {
    mainData: state.mainData
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dob: new Date().toJSON().slice(0,10),
      sex: 'male',
      country: 'United States'
    }
    this.changeDate = this.changeDate.bind(this)
    this.changeSex = this.changeSex.bind(this)
    this.changeCountry = this.changeCountry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchWorldPop())
    this.props.dispatch(fetchUSAPop())
    this.props.dispatch(fetchCountries())
  }

  changeDate(e) {
    this.setState({ dob: e.target.value })
  }

  changeSex(e) {
    this.setState({ sex: e.target.value })
  }

  changeCountry(e) {
    this.setState({ country: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(fetchRank(this.state.dob, this.state.sex, this.state.country))
  }

  render() {
    const { dispatch, mainData } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <div className="initialPopulation">
            <div className="header">World Population</div>
            <div>as of today</div>
            <div>{mainData.worldPopulation}</div>
          </div>
          <div className="initialPopulation">
            <div className="header">U.S. Population</div>
            <div>as of today</div>
            <div>{mainData.usaPopulation}</div>
          </div>
        </div>
        <div className="App-body">
          <div className="header">Shortest Country Names</div>
          <div>Countries Displayed: {mainData.countryData ? Object.keys(mainData.countryData).length : 0}</div>
          <div>Total Population Displayed: {mainData.totalDisplayedPopulation}</div>
          <button onClick={() => dispatch(fetchShortNames())}>Fetch</button>
          <div className="countries">
            {mainData.shortNames && mainData.shortNames.map((name, i) =>
              <Country 
                fetchCountry={(i) => dispatch(fetchCountry(i))}
                countryName={name}
                countryData={mainData.countryData && mainData.countryData[name]}
                key={i}
              />
            )}
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="rankForm">
                <div className="rankInput">
                  DOB:
                  <input type="date" value={this.state.dob} onChange={this.changeDate} />
                </div>
                <div className="rankInput">
                  Sex:
                  <select onChange={this.changeCountry}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="rankInput">
                  Country:
                  <select onChange={this.changeCountry} defaultValue="United States">
                    {mainData.countries && mainData.countries.map((country, i) =>
                      <option value={country} key={i}>{country}</option>
                    )}
                  </select>
                </div>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="rank">
            {mainData.rank && <div>Your rank is: {mainData.rank.rank}</div>}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);
