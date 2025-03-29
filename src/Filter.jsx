import { useState } from "react";

const Filter = ({ country, setCountry, data, onSelectCountry }) => {
  const [searchItem, setSearchItem] = useState('');
  const [showInfo, setShowInfo] = useState(null); // Track which country's info to show

  const handleInput = (event) => {
    const searchCountry = event.target.value;
    setSearchItem(searchCountry);

    if (searchCountry === '') {
      setCountry([]); // Don't show anything if the search field is empty
      onSelectCountry(null); // ...and also no weather is shown
    } else {
      const filtered = data.filter((countryItem) =>
        countryItem.name.common.toLowerCase().includes(searchCountry.toLowerCase())
      );
      setCountry(filtered); // Update the country list based on the search

      if (filtered.length === 1) {
        const countryItem = filtered[0];
        onSelectCountry(countryItem.name.common, countryItem.latlng[0], countryItem.latlng[1]); // Fetch weather with only 1 match
      } else {
        onSelectCountry(null); // No weather is shown when there are multiple matches
      }
    }
  };

  // Toggle the display of country info for the clicked country
  const toggleInfo = (countryName, lat, lon) => {

    console.log(`Toggling info for country: ${countryName}`); // Show when/if toggleInfo triggered

    if (showInfo === countryName) {
      setShowInfo(null); // Hide the info if the same country is clicked
      onSelectCountry(null); // Reset the selected country and weather
    } else {
      setShowInfo(countryName); // Show the info for the selected country
      onSelectCountry(countryName, lat, lon); // Set the selected country with lat and lon
    }
  };

  // Function to show the filtered country list
  const showCountryList = () => {
    if (country.length > 10) {
      return <p>Too many matches, please specify!</p>;
    }

    if (country.length === 1) {
      // If only one match, show the info immediately
      const countryItem = country[0];
      return (
        <div>
          <h3>{countryItem.name.common}</h3>
          <p>Capital: {countryItem.capital}</p>
          <p>Area: {countryItem.area} km²</p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(countryItem.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <p>Flag</p>
          <div><img src={countryItem.flags.png} alt="Flag" /></div>
        </div>
      );
    }

    return (
      <ul>
        {country.map((countryItem) => (
          <li key={countryItem.name.common}>
            {countryItem.name.common}
            <button type="button" onClick={() => toggleInfo(countryItem.name.common, countryItem.latlng[0], countryItem.latlng[1])}>
              Show
            </button>
            {showInfo === countryItem.name.common && (
              <div>
                <h3>{countryItem.name.common}</h3>
                <p>Capital: {countryItem.capital}</p>
                <p>Area: {countryItem.area} km²</p>
                <h4>Languages:</h4>
                <ul>
                  {Object.values(countryItem.languages).map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
                <p>Flag</p>
                <div><img src={countryItem.flags.png} alt="Flag" /></div>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2>Find countries:</h2>
      <input type="text" value={searchItem} onChange={handleInput} />
      {showCountryList()} {/* Show the filtered country list with buttons or auto info */}
    </div>
  );
};

export default Filter;
