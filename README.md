# play-with-mapbox

### Install
```npm install```
---

#### [IOS] There's error with UIBezierPath
fixed by
```pathLength = [_path pathLength];```
refs: [No visible @interface for 'UIBezierPath' declares the selector 'length'](https://github.com/react-native-community/react-native-svg/issues/460)
