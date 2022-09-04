import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC21ydG7jEmoEyaak2iEnNIb9qROZ7E7Xc',
  authDomain: 'arpittomar-ecommerce.firebaseapp.com',
  databaseURL: 'https://arpittomar-ecommerce.firebaseio.com',
  projectId: 'arpittomar-ecommerce',
  storageBucket: 'arpittomar-ecommerce.appspot.com',
  messagingSenderId: '201269524958',
  appId: '1:201269524958:web:bc192845127d7659d4454f',
  measurementId: 'G-D6162CCP6R',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { dispalyName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        dispalyName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};
