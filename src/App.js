import React, { PureComponent } from 'react';

import Map from './Map';
import ControlPlane from './ControlPlane';
import MediaModal from './MediaModal';

import locationsApi from './api/locations';
import mediasApi from './api/medias';

class App extends PureComponent {
  constructor() {
    super()

    this.state = {
      locations: locationsApi.list(1),
      page: 1,
      hoveredLocation: null,
      selected: false,
      selectedLocation: {},
    }
  }

  handleLocationOnHover = (loc_id) => {
    this.setState({ hoveredLocation: loc_id });
  }

  handleSelectLocation = (loc) => {
    this.setState({ selectedLocation: loc, selected: true });
  }

  handleClose = () => {
    this.setState({ selected: false });
  }

  handleLoadMoreLocations = () => {
    this.setState(state => ({
      locations: state.locations.concat(locationsApi.list(state.page + 1)),
      page: state.page + 1,
    }))
  }

  render() {
    const medias = mediasApi.getByLocation(this.state.selectedLocation.id)

    return (
      <div>
        <Map
          locations={locationsApi.list(1, 3000)}
          hoveredLocation={this.state.hoveredLocation}
        />
        <ControlPlane
          locations={this.state.locations}
          locationOnHover={this.handleLocationOnHover}
          selectLocation={this.handleSelectLocation}
          onLoadMore={this.handleLoadMoreLocations}
          isLoading={false}
        />
        <MediaModal
          open={this.state.selected}
          onClose={this.handleClose}
          loc={this.state.selectedLocation}
          medias={medias}
        />
      </div>
    );
  }
}

export default App;
