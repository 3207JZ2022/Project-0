import {createStore} from 'redux';
import {reducer} from './reducer/home'



const homeStore = createStore(reducer);

export default homeStore;