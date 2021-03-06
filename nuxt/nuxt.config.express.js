import { resolve } from 'path';

export default {
	alias: {
		'uranio': resolve(__dirname, './src/uranio/client'),
		'uranio-trx': resolve(__dirname, './src/uranio/trx/'),
		'uranio-api': resolve(__dirname, './src/uranio/trx/api/'),
		'uranio-core': resolve(__dirname, './src/uranio/trx/api/core/'),
		'uranio-books': resolve(__dirname, './src/books/'),
	},
	env: {
		URN_CLIENT_FETCH: process.env.URN_CLIENT_FETCH || 'axios',
		URN_CLIENT_PROTOCOL: process.env.URN_CLIENT_PROTOCOL || 'http',
		URN_CLIENT_DOMAIN: process.env.URN_CLIENT_DOMAIN || 'localhost',
		URN_CLIENT_PORT: Number(process.env.URN_CLIENT_PORT) || 4444
	},
	components: [
		{
			path: '~/components/',
			extensions: ['vue']
		}
	],
	buildDir: './.nuxt',
	srcDir: './src/uranio/nuxt/',
	target: 'static',
	ssr: false,
	modules:[
		'@nuxtjs/proxy'
	],
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/style-resources'
	],
	proxy: {
		'/uranio/api': {
			target: 'http://localhost:7777/uranio/api',
			pathRewrite: {'^/uranio/api/':''}
		}
	},
	typescript: {
		typeCheck: true
	},
	generate: {
		dir: '../../dist/client/',
		fallback: '404.html',
		exclude: ['/urn-admin'],
	},
	server: {
		port: 4444,
		host: '0.0.0.0'
	},
	router: {
		trailingSlash: false,
		linkActiveClass: 'urn-active-link',
		linkExactActiveClass: 'urn-exact-active-link',
		parseQuery(q) {
			return require('qs').parse(q);
		},
		stringifyQuery(q) {
			const r = require('qs').stringify(q);
			return r ? '?' + r : '';
		},
	},
	loading: {
		color: '#2222FF',
		height: '2px',
		throttle: 200,
		duration: 2000,
		continuous: true
	},
	// watchers: {
	//   webpack: {
	//     ignored: [
	//       `${process.cwd()}/node_modules/**/*`,
	//       `${process.cwd()}/.uranio/server/**/*`,
	//       `${process.cwd()}/.uranio/.tmp/**/*`,
	//       `${process.cwd()}/src/**/*`,
	//       `${process.cwd()}/dist/**/*`,
	//     ]
	//   }
	// },
	hooks: {
		build: {
			before(){
				// console.log('BEFORE BUILD');
			},
			compile(){
				// console.log('BEFORE COMPILE');
			},
			compiled(){
				// console.log('COMPILED');
			}
		}
	}
};
