import { auth, firebase } from './firebase';

export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

const fbProvider = new firebase.auth.FacebookAuthProvider();
export const doSignInWithFacebook = () => auth.signInWithPopup(fbProvider)

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) => auth.currentUser.updatePassword(password);