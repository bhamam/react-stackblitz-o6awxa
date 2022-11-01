import * as React from "react";
import { Component } from "react";
import { LatLng, LatLngBounds } from "leaflet";
import { Map, TileLayer, CircleMarker, Popup } from "react-leaflet";

import data from "./data.json";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 6,
      markers: []
    };
    this.allMarkers = null;
    this.mapRef = React.createRef();
    this.displayMarkers = this.displayMarkers.bind(this);
  }

  generateMarkers(count, bounds) {
    const minLat = bounds.getSouthWest().lat,
      rangeLng = bounds.getNorthEast().lat - minLat,
      minLng = bounds.getSouthWest().lng,
      rangeLat = bounds.getNorthEast().lng - minLng;

    const result = Array.from({ length: count }, (v, k) => {
      return new LatLng(
        minLat + Math.random() * rangeLng,
        minLng + Math.random() * rangeLat
      );
    });
    const result2 = data.map(item => {
      return new LatLng(item.Latitude, item.Longitude)
});
    console.log(result[0]);
    console.log(result2[0]);
    return result2;
  }

  componentDidMount() {
    const southWest = new LatLng(30.0, -20.0),
      northEast = new LatLng(60.0, 20.0),
      bounds = new LatLngBounds(southWest, northEast);
    this.allMarkers = this.generateMarkers(30000, bounds);
    this.displayMarkers();
    console.log(data)
  }

  displayMarkers() {
    const map = this.mapRef.current.leafletElement;
    const markers = this.allMarkers.filter(m => map.getBounds().contains(m));
    //console.log(markers);
    this.setState({
      markers: markers
    });
  }

  render() {
    const markers = this.state.markers.map((v, i) => (
      <CircleMarker key={i} center={v} radius={3} />
    ));
    return (
      <Map
        onMoveEnd={this.displayMarkers}
        preferCanvas={false}
        ref={this.mapRef}
        center={new LatLng(51.505, -0.09)}
        zoom={this.state.zoom}
      >
        <TileLayer url="https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-2/all/{z}/{x}/{y}.png" />
        {markers}
      </Map>
    );
  }
}
