import firebase from 'firebase'

let config = {
  apiKey: "AIzaSyC93_2czzwvyfAcQLqo0y9UoD3d0exUnBo",
  authDomain: "appbox-prod.firebaseapp.com",
  databaseURL: "https://appbox-prod.firebaseio.com",
  projectId: "appbox-prod",
  storageBucket: "appbox-prod.appspot.com",
  messagingSenderId: "198256784874"
	// apiKey: "AIzaSyBqm1lWfImVwT88KhwoBpLPtoNtc35mS4A",
	// authDomain: "app-box-prod.firebaseapp.com",
	// databaseURL: "https://app-box-prod.firebaseio.com",
	// projectId: "app-box-prod",
	// storageBucket: "app-box-prod.appspot.com",
	// messagingSenderId: "141932841759"
};
firebase.initializeApp(config);

export default firebase
