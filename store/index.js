import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		selectCity:''
	},
	mutations: {
		setSelectCity(state,city){
			state.selectCity = city;
		}
	},
	actions: {
	}
})

export default store
