// Initialize Firebase
// TODO: Replace with your project's customized code snippet

var config = {
  apiKey: "AIzaSyAKQm2R-2MOYp1LYGgpaJ6bTxHnw3DwlII",
  authDomain: "herbfarmcamping.firebaseapp.com",
  databaseURL: "https://herbfarmcamping-default-rtdb.firebaseio.com",
  projectId: "herbfarmcamping",
  storageBucket: "herbfarmcamping.appspot.com",
  messagingSenderId: "736934053363",
  appId: "1:736934053363:web:fc3d91dc67b2ad55cb3e86",
  measurementId: "G-JYVHTXQ6NC"
};
firebase.initializeApp(config);

firebaseEmailAuth = firebase.auth();
database = firebase.database();
