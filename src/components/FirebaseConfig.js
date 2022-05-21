import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocs,getDoc,collection,query, where,setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey : process.env.REACT_APP_APIKEY,
    authDomain : "drugs-4-u.firebaseapp.com",
    databaseURL : "https://drugs-4-u-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId : "drugs-4-u",
    storageBucket : "drugs-4-u.appspot.com",
    messagingSenderId : process.env.REACT_APP_MESSAGINGSENDERID,
    appId : process.env.REACT_APP_APPID,
    measurementId : process.env.REACT_APP_MEASUREMENTID
};

const app = initializeApp( firebaseConfig );

const db = getFirestore( app );

const storage = getStorage( app );

const auth = getAuth( app );



//Facebook JavaScript SDK
// window.fbAsyncInit = function() {
//     FB.init( {
//         appId : "{your-app-id}",
//         cookie : true,
//         xfbml : true,
//         version : "{api-version}"
//     } );
      
//     FB.AppEvents.logPageView();   
      
// };

// ( function( d, s, id ) {
//     let js, fjs = d.getElementsByTagName( s )[0];
//     if ( d.getElementById( id ) ) { return; }
//     js = d.createElement( s ); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore( js, fjs );
// }( document, "script", "facebook-jssdk" ) );


// Initialize the FirebaseUI Widget using Firebase.








// const SignOut=React.forwardRef( ( props, ref ) => {
//     const user = auth.currentUser;
  
//     let userName;
//     const [ userData, setUserData ] = useState ( "" );

  
//     useEffect( () => {
//         if ( user !== null ) {
//             setUserData( user.uid );
//         }
//     },[ user ] );

//     if ( user !== null ) {
//         user.providerData.forEach( ( profile ) => {
//             userName=profile.displayName;
//         } );
//     }

//     useImperativeHandle( ref, () => ( {
//         getFromData : () => {
//             return userData;
//         }
//     } ) );

//     function exit() {
//         auth.signOut();
//         localStorage.removeItem( "userStatus" );
//     }
//     return(
//         <>
//             <p className="text-right mb-2">Welcome {userName}! You are now signed-in!</p>
//             <div className="text-right mb-3"><Link to="/"><span className="text-right cursor-pointer border-solid rounded-3xl border w-24 mx-auto my-7 p-1.5 bg-slate-300 font-semibold text-gray-800" onClick={exit} >Sign-out</span></Link></div>
//         </>
//     );
// } );





export {
    db, doc, getDocs, getDoc, collection, query, where, setDoc,
    auth,
    storage, ref, getDownloadURL, listAll
};