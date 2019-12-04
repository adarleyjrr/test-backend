import Admin from "firebase-admin";

require("dotenv").config();

var serviceAccount = require("../firebaseAccountKey.json");

const managementClient = Admin.initializeApp({
  credential: Admin.credential.cert(serviceAccount),
  databaseURL: "https://perimetre-bbeca.firebaseio.com"
});

const admin = { managementClient };

export default admin;
