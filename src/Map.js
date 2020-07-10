import React, { PureComponent } from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
} from '@material-ui/core';

const TOKEN = "pk.eyJ1IjoiaG9tdWNoZW4iLCJhIjoiY2tiYXNwdzdvMDkxZTJ0bWJpczgzaTA5aiJ9.acmjRyVDuQZu4BRZoOckhw";

const styles = theme => ({
  marker: {
    //display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: 8,
    background: '#2484b7',
    border: '1px #fff solid',
    position: 'absolute',
    zIndex: -1,
    top: -8,
    left: -8,
  },
  avatar: {
    position: 'absolute',
    top: -8,
    left: -8,
    zIndex: 2,
  }
})

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 23.6,
      longitude: 120,
      zoom: 7,
    }
  }

  render() {
    const {
      classes,
      locations,
      hoveredLocation,
    } = this.props;

    return (
      <ReactMapGL
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        { ...this.state }
      >
        {
          locations.map(loc => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              captureDrag={false}
              captureDoubleClick={false}
            >
              {
                hoveredLocation === loc.id &&
                <div className={classes.avatar}>
                  <Avatar
                    src={loc.imageUrl}
                  />
                </div>
              }
              {
                hoveredLocation !== loc.id &&
                <div
                  className={classes.marker}
                >
                </div>
              }
            </Marker>
          ))
        }
      </ReactMapGL>
    );
  }
}

export default withStyles(styles)(Map);
