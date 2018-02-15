import firebase from 'firebase'

let config = {
	apiKey: "AIzaSyBqm1lWfImVwT88KhwoBpLPtoNtc35mS4A",
	authDomain: "app-box-prod.firebaseapp.com",
	databaseURL: "https://app-box-prod.firebaseio.com",
	projectId: "app-box-prod",
	storageBucket: "app-box-prod.appspot.com",
	messagingSenderId: "141932841759"
};
firebase.initializeApp(config);

export default firebase
