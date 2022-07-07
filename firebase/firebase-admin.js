import admin from "firebase-admin";
var serviceAccount = './jettasks.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

export default admin;