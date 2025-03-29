import { useState, useEffect } from 'react';
import Filter from './Filter';
import Weather from './Weather';

function CountryApp() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => response.json())
      .then(fetchedData => {
        setData(fetchedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSelectCountry = (countryName, lat, lon) => {
    let selected;

    if (countryName) {
      selected = data.find((item) => item.name.common === countryName);
    } else if (lat && lon) {
      selected = data.find(
        (item) => item.latlng[0] === lat && item.latlng[1] === lon
      );
    }

    if (selected) {
      setSelectedCountry(selected); // Set the selected country with lat and lon
    } else {
      setSelectedCountry(null)
    }
  };

  return (
    <div>
      <Filter
        country={country}
        setCountry={setCountry}
        data={data}
        onSelectCountry={handleSelectCountry}
      />

      {selectedCountry && selectedCountry.latlng ? (
        <>
          <Weather
            lat={selectedCountry.latlng[0]}  // Latitude
            lon={selectedCountry.latlng[1]}  // Longitude
          />
        </>
      ) : (
        selectedCountry && <p>Weather data is unavailable for this country (missing coordinates).</p>
      )}
    </div>
  );
}

export default CountryApp;
