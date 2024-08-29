const Services = {
	namespaced: true,
	state() {
		return {
			blocks: [
				{
					picture: '1.jpg',
					title: '<p>BRAND</p> <p>MARKETING</p>',
					text: 'We Craft bespoke branding strategies',
					num: '01',
					id: 0,
				},
				{
					picture: '2.jpg',
					title: '<p>CAREER</p> <p>MANAGEMENT</p>',
					text: 'We Guide our clients through every phase of their careers',
					num: '02',
					id: 1,
				},
				{
					picture: '3.jpg',
					title: '<p>LEGAL</p><p>& CONTRACT</p>',
					text: 'We offer comprehensive legal support',
					num: '03',
					id: 2,
				},
				{
					picture: '4.jpg',
					title: '<p>PR</p><p>& Media</p>',
					text: 'We manage all aspects of public relations and media interactions',
					num: '04',
					id: 3,
				},
				{
					picture: '5.jpg',
					title: '<p>CONTENT</p><p>& SOCIAL MEDIA</p>',
					text: 'We create compelling content',
					num: '05',
					id: 4,
				},
				{
					picture: '6.jpg',
					title: '<p>wellbering</p><p>& nuTRION</p>',
					text: "We Focus on optimizing our clients' physical and mental health",
					num: '06',
					id: 5,
				},
				{
					picture: '7.jpg',
					title: '<p>DATA</p><p> & VIDEO</p> <p>ANALISIS</p>',
					text: 'We provide our clients with actionable insights',
					num: '07',
					id: 6,
				},
				{
					picture: '8.jpg',
					title: '<p>CONCIERGE</p>',
					text: 'We Provide personalized concierge services to handle logistical needs',
					num: '08',
					id: 7,
				},
			],
		};
	},
	mutations: {
		setBlocks(state, payload) {
			state.blocks = payload;
		},
	},
	getters: {
		ServicesBlocks(state) {
			return state.blocks;
		},
	},
	actions: {},
};

export default Services;
