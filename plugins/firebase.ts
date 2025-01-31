import firebase from 'firebase'
import 'firebase/firestore'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: process.env.FB_APIKEY,
      authDomain: process.env.FB_AUTHDOMAIN,
      databaseURL: process.env.FB_DATABASEURL,
      projectId: process.env.FB_PROJECTID,
      storageBucket: process.env.FB_STORAGEBUCKET,
      messagingSenderId: process.env.FB_MESSAGINGSENDERID,
      appId: process.env.FB_APPID
    }
  )
}

export default firebase
