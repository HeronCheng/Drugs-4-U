/* eslint-disable max-len */
// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Import all needed modules.
import functions from "firebase-functions";
// import admin from "firebase-admin";
import algoliasearch from "algoliasearch";


// // Set up Firestore.
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: "https://drugs-4-u-default-rtdb.asia-southeast1.firebasedatabase.app"
// });
// const db = admin.firestore();

// Set up Algolia.
// The app id and API key are coming from the cloud functions environment, as we set up in Part 1, Step 3.
const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
// Since I'm using develop and production environments, I'm automatically defining
// the index name according to which environment is running. functions.config().projectId is a default
// property set by Cloud Functions.

const collectionIndex = algoliaClient.initIndex("undischarged");

// Create a HTTP request cloud function.
export const onProductCreated = functions.firestore.document("undischarged/{undischargedId}").onCreate(
  ((snap, context) => {
    return collectionIndex.saveObject({
      objectID : snap.id,
      ...snap.data()
    })
  })
)

export const onProductUpdated = functions.firestore
  .document("undischarged/{undischargedId}")
  .onUpdate((change, context) => {

    // Get the old product data
    const oldProduct = change.before.data();

    // Get the new product document
    const product = change.after.data();
    product.objectID = change.after.id;

    return collectionIndex.partialUpdateObject(product)
});

export const onProductDeleted = functions.firestore.document("undischarged/{undischargedId}").onDelete(
  ((snap, context) => {
    return collectionIndex.deleteObject(snap.id)
  })
)