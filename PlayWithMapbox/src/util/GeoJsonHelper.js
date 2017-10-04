const turf = require('./turf.min.js')

export function flipCoordinates(feature) {
  let flipCoords = turf.flip(feature)
  return flipCoords
}

export function createGeoJSONFeature(type, lat, long) {
  let geometry = {
    type: type,
    coordinates: [long, lat]
  }

  let feature = turf.feature(geometry)

  return feature
}

export function createCirclePolygon(center, radius, steps=64, units='kilometers', properties={}) {
  let circle = turf.circle(center, radius, steps, units, properties)
  
  return circle
}

export function findWithin(points, polygon) {
  console.log('[findWithin] -- polygon : ', polygon)
  let searchWithin = turf.featureCollection([
    turf.polygon([[
      ...polygon.coordinates
    ]])
  ])
  
  console.log('[findWithin] -- searchWithin : ', searchWithin)

}