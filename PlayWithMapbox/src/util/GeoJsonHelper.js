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

export function createCirclePolygon(center, radius, steps = 64, units = 'kilometers', properties = {}) {
  let circle = turf.circle(center, radius, steps, units, properties)

  return circle
}

export function findWithin(geoJsonPoints, geoJsonPolygon, flip=true) {
  
  let searchWithin = turf.featureCollection([geoJsonPolygon])
  let points = turf.featureCollection(geoJsonPoints)

  let pointsWithin = turf.within(points, searchWithin)

  if(flip) {
    pointsWithin = flipCoordinates(pointsWithin)
  }

  console.log('[findWithin] -- pointsWithin : ', pointsWithin)

  return pointsWithin

}

export function convertPolygonToGeoJsonPolygon(polygon) {
  console.log('[convertPolygonToGeoJsonPolygon]')

  let geoJsonPolygon = flipCoordinates(turf.polygon([[...polygon.coordinates]]))

  return geoJsonPolygon
}

export function convertDataPointsToGeoJsonPoints(points) {
  console.log('[convertDataPointsToGeoJsonPoints] -- points : ', points)

  let geoJsonPoints = points.map((point) => {
    return flipCoordinates(turf.point(point.coordinates,{id: point.id}))
  })

  return geoJsonPoints
}

export function getCoords(obj) {

  let coords = turf.coordAll(obj)

  console.log('coords : ', coords)
  return coords
}

export function getPropEach(geoJson) {
  let featureProps = []
  
  turf.propEach(geoJson, (prop) => {
    featureProps.push(prop)
  })

  console.log('featureProps : ', featureProps)

  return featureProps
}