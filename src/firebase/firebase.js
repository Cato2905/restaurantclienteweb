import app from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/auth';

import firebaseConfig from './config';

class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig)
        this.db = app.firestore();
        this.storage = app.storage();
        this.auth = app.auth();
    }
}


const firebase = new Firebase();
export default firebase;