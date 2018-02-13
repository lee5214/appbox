const mongoose = require ('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({
	guest : Boolean,
	local : {
		username : String,
		password : String,
		email : String,
		displayName : String,
		avatar : String,
		language : String,
	},
	google : Object,
	facebook : Object,
});

mongoose.model ('Users_Model', userSchema);

// { id: '108514836326941919078',
// 	[1]   displayName: 'Cong Li',
// 	[1]   name: { familyName: 'Li', givenName: 'Cong' },
// 	[1]   emails: [ { value: 'lee5214@hotmail.com', type: 'account' } ],
// 	[1]   photos: [ { value:
// 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50' } ], [1]
// gender: undefined, [1]   provider: 'google', [1]   _raw: '{\n "kind": "plus#person",\n "etag":
// "\\"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/qUAfeS7Zfxab5YLKDo3yrtIhf-4\\"",\n "emails": [\n  {\n   "value":
// "lee5214@hotmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "108514836326941919078",\n
// "displayName": "Cong Li",\n "name": {\n  "familyName": "Li",\n  "givenName": "Cong"\n },\n "url":
// "https://plus.google.com/108514836326941919078",\n "image": {\n  "url":
// "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",\n
// "isDefault": true\n },\n "organizations": [\n  {\n   "name": "SFSU",\n   "type": "school",\n   "primary": false\n
// }\n ],\n "placesLived": [\n  {\n   "value": "SF",\n   "primary": true\n  }\n ],\n "isPlusUser": true,\n "language":
// "zh_CN",\n "circledByCount": 0,\n "verified": false\n}\n', [1]   _json: [1]    { kind: 'plus#person', [1]      etag:
// '"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/qUAfeS7Zfxab5YLKDo3yrtIhf-4"', [1]      emails: [ [Object] ], [1]      objectType:
// 'person', [1]      id: '108514836326941919078', [1]      displayName: 'Cong Li', [1]      name: { familyName: 'Li',
// givenName: 'Cong' }, [1]      url: 'https://plus.google.com/108514836326941919078', [1]      image: [1]       { url:
// 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50', [1]
// isDefault: true }, [1]      organizations: [ [Object] ], [1]      placesLived: [ [Object] ], [1]      isPlusUser:
// true, [1]      language: 'zh_CN', [1]      circledByCount: 0, [1]      verified: false } } [1] profile=> { id:
// '108514836326941919078', [1]   displayName: 'Cong Li', [1]   name: { familyName: 'Li', givenName: 'Cong' }, [1]
// emails: [ { value: 'lee5214@hotmail.com', type: 'account' } ], [1]   photos: [ { value:
// 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50' } ], [1]
// gender: undefined, [1]   provider: 'google', [1]   _raw: '{\n "kind": "plus#person",\n "etag": "\\"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/qUAfeS7Zfxab5YLKDo3yrtIhf-4\\"",\n "emails": [\n  {\n   "value": "lee5214@hotmail.com",\n   "type": "account"\n  }\n ],\n "objectType": "person",\n "id": "108514836326941919078",\n "displayName": "Cong Li",\n "name": {\n  "familyName": "Li",\n  "givenName": "Cong"\n },\n "url": "https://plus.google.com/108514836326941919078",\n "image": {\n  "url": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50",\n  "isDefault": true\n },\n "organizations": [\n  {\n   "name": "SFSU",\n   "type": "school",\n   "primary": false\n  }\n ],\n "placesLived": [\n  {\n   "value": "SF",\n   "primary": true\n  }\n ],\n "isPlusUser": true,\n "language": "zh_CN",\n "circledByCount": 0,\n "verified": false\n}\n', [1]   _json: [1]    { kind: 'plus#person', [1]      etag: '"ucaTEV-ZanNH5M3SCxYRM0QRw2Y/qUAfeS7Zfxab5YLKDo3yrtIhf-4"', [1]      emails: [ [Object] ], [1]      objectType: 'person', [1]      id: '108514836326941919078', [1]      displayName: 'Cong Li', [1]      name: { familyName: 'Li', givenName: 'Cong' }, [1]      url: 'https://plus.google.com/108514836326941919078', [1]      image: [1]       { url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50', [1]         isDefault: true }, [1]      organizations: [ [Object] ], [1]      placesLived: [ [Object] ], [1]      isPlusUser: true, [1]      language: 'zh_CN', [1]      circledByCount: 0, [1]      verified: false } }
