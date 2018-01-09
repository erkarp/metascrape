   import { combineReducers } from 'redux'
import getLinks from './getLinks'
import getSort from './getSort'
import getStyles from './getStyles'

export default combineReducers({
	getLinks, 
	getSort,
	getStyles
})