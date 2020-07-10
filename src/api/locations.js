import data from './data/locations.json';

const PER_PAGE = 20;

const locations = {};

locations.list = function(page=1, perPage=PER_PAGE) {
  const docs = data.features.slice(perPage*(page-1), perPage*page).map(feature => ({
    ...feature.properties,
    latitude: feature.geometry.coordinates[1],
    longitude: feature.geometry.coordinates[0],
  }));

  return docs;
}

export default locations
