var activeDatabase;
var activeCategories = ['Crop plant', 'Garden weed'];
var plantDatabase = [ 
	// CROP PLANTS
	{ 
		category: "Crop plant",
		wikiSrc: 'https://en.wikipedia.org/wiki/Eruca_sativa',
		commonName: 'Arugula',
		latinName: 'Eruca sativa',
		lifeCycle: 'annual',
		edibleParts: ['leaves', 'flowers'],
		description: "this plant grows 20-100 centimetres (8-39 in) in height. The pinnate leaves have four to ten small, deep, lateral lobes and a large terminal lobe. The flowers are 2-4 cm (0.8-1.6 in) in diameter, arranged in a corymb in typical Brassicaceae fashion, with creamy white petals veined in purple, and having yellow stamens; the sepals are shed soon after the flower opens. The fruit is a siliqua (pod) 12-35 millimetres (0.5-1.4 in) long with an apical beak, and containing several seeds (which are edible).",
		imgs: [
			{ tags: ['leaves', 'overview'], src: 'https://1rxbfb2hflyo2jt6jd3f6sjr-wpengine.netdna-ssl.com/wp-content/uploads/2014/12/Astro-Arugula-Organic-Seeds-MS504-1.jpg' },
			{ tags: ['seedling', 'leaves'], src: 'https://www.ecosia.org/images?q=arugula+seedling#id=E1A41F0AB562989901263CE145BA078A5EB06B4F' },
			{ tags: ['flowering'], src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Eruca_sativa_1_IP0206101.jpg/1200px-Eruca_sativa_1_IP0206101.jpg", "http://photos1.blogger.com/hello/275/6184/1024/flowering%20arugula%20on%204-25.jpg' }
		],
		family: 'brassicaceae',
	},

	{ 
		category: "Crop plant",
		wikiSrc: 'https://en.wikipedia.org/wiki/Asparagus',
		commonName: 'Asparagus',
		latinName: 'Asparagus officinalis',
		lifeCycle: 'perennial',
		edibleParts: ['shoots'],
		description: "this plant is a herbaceous, perennial plant growing to 100-150 cm (39-59 in) tall, with stout stems with much-branched, feathery foliage. The \"leaves\" are in fact needle-like cladodes (modified stems) in the axils of scale leaves; they are 6-32 mm (0.24-1.26 in) long and 1 mm (0.039 in) broad, and clustered four to 15 together, in a rose-like shape. The root system is adventitious and the root type is fasciculated. The flowers are bell-shaped, greenish-white to yellowish, 4.5-6.5 mm (0.18-0.26 in) long, with six tepals partially fused together at the base; they are produced singly or in clusters of two or three in the junctions of the branchlets. It is usually dioecious, with male and female flowers on separate plants, but sometimes hermaphrodite flowers are found. The fruit is a small red berry 6-10 mm diameter, which is poisonous to humans.",
		imgs: [
			{ tags: ['overview', 'shoots'], src: 'https://i.pinimg.com/736x/b5/48/68/b54868d52cc6ffaae63fae52030b6a41.jpg' },
			{ tags: ['harvested', 'shoots'], src: 'https://4.bp.blogspot.com/-jTbdCCgobvU/WdabPYgjAkI/AAAAAAAAEIk/QSKbeZqawEYaJmH7VsrlzLvE8j-mGCM6QCEwYBhgL/s1600/asparagus.jpg' },
			{ tags: ['flowering'], src: 'http://www.hort.cornell.edu/4hplants/Vegetables/images/Asparagus%201.jpg' },
		],
		family: 'Asparagaceae',
	},


	// GARDEN WEEDS

];