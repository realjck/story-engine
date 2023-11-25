var dojoConfig = {
	async: true,
	packages: [

		{
			name: "util",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/util'
		},

		{
			name: "animator",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/animator'
		},

		{
			name: "engine",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/engine'
		},
		
		{
			name: "pdf",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/pdf'
		},

		{
			name: "dojo",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/dojo/dojo'
		},

		{
			name: "dojox",
			location: location.pathname.replace(/\/[^/]*$/, '') + '/assets/app_src/dojo/dojox'
		}
	]
};