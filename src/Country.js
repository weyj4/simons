import React, { Component } from 'react'

export default class Country extends Component {
  render() {
    const { countryName, fetchCountry, countryData } = this.props
    return (
      <div>
        <div onClick={() => fetchCountry(countryName)}>{countryName}</div>
        {countryData && <div>
          <div>Overall: {countryData.overall}</div>
          <div>Male: {countryData.male}</div>
          <div>Female: {countryData.female}</div>
        </div>}
      </div>
    )
  }
}
