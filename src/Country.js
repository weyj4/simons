import React, { Component } from 'react'
import "./Country.css"

export default class Country extends Component {
  render() {
    const { countryName, fetchCountry, countryData } = this.props
    return (
      <div className="Country">
        <button onClick={() => fetchCountry(countryName)}>{countryName}</button>
        {countryData && <div>
          <div>Overall Aged 18: {countryData.total}</div>
          <div>Males Aged 18: {countryData.males}</div>
          <div>Females Aged 18: {countryData.females}</div>
        </div>}
      </div>
    )
  }
}
