export default {
	items : [
		{
			name : 'Dashboard',
			url : '/dashboard',
			icon : 'icon-speedometer',
			badge : {
				variant : 'info',
				text : 'NEW',
			},
		},
		{
			title : true,
			name : 'UI elements',
			wrapper : { // optional wrapper object
				element : '',        // required valid HTML5 element tag
				attributes : {}        // optional valid JS object with JS API naming ex: { className: "my-class",
			                           // style: { fontFamily: "Verdana" }, id: "my-id"}
			},
			class : ''             // optional class names space delimited list for title item ex: "text-center"
		},
		{
			name : 'Components',
			url : '/components',
			icon : 'icon-puzzle',
			children : [
				{
					name : 'Buttons',
					url : '/components/buttons',
					icon : 'icon-puzzle',
				},
				{
					name : 'Social Buttons',
					url : '/components/social-buttons',
					icon : 'icon-puzzle',
				},
				{
					name : 'Cards',
					url : '/components/cards',
					icon : 'icon-puzzle',
				},
				{
					name : 'Forms',
					url : '/components/forms',
					icon : 'icon-puzzle',
				},
				{
					name : 'Modals',
					url : '/components/modals',
					icon : 'icon-puzzle',
				},
				{
					name : 'Switches',
					url : '/components/switches',
					icon : 'icon-puzzle',
				},
				{
					name : 'Tables',
					url : '/components/tables',
					icon : 'icon-puzzle',
				},
				{
					name : 'Tabs',
					url : '/components/tabs',
					icon : 'icon-puzzle',
				},
			],
		},
		{
			name : 'Icons',
			url : '/icons',
			icon : 'icon-star',
			children : [
				{
					name : 'Font Awesome',
					url : '/icons/font-awesome',
					icon : 'icon-star',
					badge : {
						variant : 'secondary',
						text : '4.7',
					},
				},
				{
					name : 'Simple Line Icons',
					url : '/icons/simple-line-icons',
					icon : 'icon-star',
				},
			],
		},
		{
			name : 'Widgets',
			url : '/widgets',
			icon : 'icon-calculator',
			badge : {
				variant : 'info',
				text : 'NEW',
			},
		},
		{
			name : 'Charts',
			url : '/charts',
			icon : 'icon-pie-chart',
		},
		{
			divider : true,
		},
		{
			title : true,
			name : 'Personal Apps',
		},
		{
			name : 'City Info',
			url : '/cityinfo',
			icon : 'fa fa-street-view mr-2',
		},
		{
			name : 'Chat Room',
			url : '/chatroom',
			icon : 'fa fa-comments mr-2',
		},
		{
			name : 'Secret Links',
			url : '/secretlinks',
			icon : 'fa fa-user-secret mr-2',
		},
		{
			name : 'Test',
			url : '/test',
			icon : 'icon-social-dropbox',
		},

		{
			divider : true,
		},
		{
			title : true,
			name : 'Extras',
		},
		{
			name : 'Pages',
			url : '/pages',
			icon : 'icon-star',
			children : [
				{
					name : 'Login',
					url : '/login',
					icon : 'icon-star',
				},
				{
					name : 'Register',
					url : '/register',
					icon : 'icon-star',
				},
				{
					name : 'Error 404',
					url : '/404',
					icon : 'icon-star',
				},
				{
					name : 'Error 500',
					url : '/500',
					icon : 'icon-star',
				},
			],
		},
		{
			name : 'About',
			url : '/about',
			icon : 'icon-social-dropbox',
			children : [
				{
					name : 'Myself',
					url : '/about/myself',
					icon : 'icon-star',
				},
				{
					name : 'Resume',
					url : '/about/resume',
					icon : 'icon-star',
				},
				{
					name : 'Blog',
					url : '/about/blog',
					icon : 'icon-star',
				},
			],
		},
		{
			name : 'My Website',
			url : 'http://lee5214.com',
			icon : 'icon-layers',
			class : 'mt-auto',
			variant : 'success',
		},

	],
};
