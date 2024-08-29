import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';
import ServicesView from '../views/ServicesView/ServicesView.vue';
import ServicesServiceView from '../views/ServicesServiceView/ServicesServiceView.vue';
import ContactUs from '../views/ContactUs/ContactUs.vue';
import News from '../views/NewsView/NewsView';
import NewsArticle from '../views/NewsArticleView/NewsArticleView.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/services',
		name: 'services',
		component: ServicesView,
	},
	{
		path: '/services/:id',
		name: 'service',
		component: ServicesServiceView,
	},
	{
		path: '/contact',
		name: 'contact',
		component: ContactUs,
	},
	{
		path: '/news',
		name: 'news',
		component: News,
	},
	{
		path: '/news/:id',
		name: 'article',
		component: NewsArticle,
	},
	{
		path: '/:catchAll(.*)',
		name: 'start',
		component: HomeView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

router.beforeEach((to, from, next) => {
	if (to.path !== from.path) {
		window.scrollTo(0, 0);
	}
	next();
});

export default router;
