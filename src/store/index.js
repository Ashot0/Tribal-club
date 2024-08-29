import { createStore } from 'vuex';
import Services from './modules/services';
import News from './modules/news';

export default createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		Services,
		News,
	},
});
