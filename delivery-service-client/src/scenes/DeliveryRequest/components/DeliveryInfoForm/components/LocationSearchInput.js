import React from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

import './LocationSearchInput.css';

class LocationSearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false
    };
  }

  handleChange = address => {
    this.setState({address, latitude: null, longitude: null, errorMessage: ''});
  };

  handleSelect = selected => {
    this.setState({isGeocoding: true, address: selected});
    geocodeByAddress(selected).then(res => getLatLng(res[0])).then(({lat, lng}) => {
      this.setState({latitude: lat, longitude: lng, isGeocoding: false});

      const locationData = {
        address: selected,
        latLng: lat + ',' + lng
      }
      this.props.handleUserLocation(locationData);

    }).catch(error => {
      this.setState({isGeocoding: false});
      console.log('error', error);
    });
  };

  handleCloseClick = () => {
    this.setState({address: '', latitude: null, longitude: null});
    this.props.handleUserLocation(null);
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status);
    this.setState({
      errorMessage: status
    }, () => {
      clearSuggestions();
    });
  };

  render() {
    const {address, errorMessage} = this.state;

    return (<div>
      <PlacesAutocomplete onChange={this.handleChange} value={address} onSelect={this.handleSelect} onError={this.handleError} shouldFetchSuggestions={address.length > 2}>
        {
          ({getInputProps, suggestions, getSuggestionItemProps}) => {
            return (<div className="search-bar-container">
              <div className="search-input-container">
                <input {...getInputProps({
                      placeholder: 'Search Places...',
                      className: 'location-search-input',
                    })}/> {
                  this.state.address.length > 0 && (<button className="clear-button" onClick={this.handleCloseClick}>
                    x
                  </button>)
                }
              </div>
              {
                suggestions.length > 0 && (<div className="autocomplete-dropdown-container">
                  {
                    suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';

                      return (<div {...getSuggestionItemProps(suggestion, { className })}>
                        <strong>
                          {suggestion.formattedSuggestion.mainText}
                        </strong>{' '}
                        <small>
                          {suggestion.formattedSuggestion.secondaryText}
                        </small>
                      </div>);

                    })
                  }

                </div>)
              }
            </div>);
          }
        }
      </PlacesAutocomplete>
      {errorMessage.length > 0 && (<div className="error-message">{this.state.errorMessage}</div>)}

    </div>);
  }
}

// ========================================
export default LocationSearchInput;
