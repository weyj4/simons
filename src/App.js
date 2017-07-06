import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import { fetchWorldPop, fetchShortNames, fetchCountry, fetchRank } from './redux/actions'
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
    this.state = {}
    this.changeDate = this.changeDate.bind(this)
    this.changeSex = this.changeSex.bind(this)
    this.changeCountry = this.changeCountry.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchWorldPop())
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
          <div>Countries Displayed: {mainData.countryData ? Object.keys(mainData.countryData).length : 0}</div>
          <div>Total Population Displayed: {mainData.totalDisplayedPopulation}</div>
          <div onClick={() => dispatch(fetchShortNames())}>Fetch</div>
          <form onSubmit={this.handleSubmit}>
            <label>
              DOB:
              <input type="date" value={this.state.dob} onChange={this.changeDate} />
            </label>
            <label>
              Sex:
              <input type="radio" value="male" checked={this.state.sex === "male"} onChange={this.changeSex} />
              <input type="radio" value="female" checked={this.state.sex === "female"} onChange={this.changeSex} />
            </label>
            <label>
              Country:
              <input type="text" value={this.state.country} onChange={this.changeCountry} />
              <select onChange={this.changeCountry}>
                {mainData.shortNames && mainData.shortNames.map((country) =>
                  <option value={country}>{country}</option>
                )}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
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
        <div className="rank">
          {mainData.rank && <div>Your rank is: {mainData.rank.rank}</div>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App);
