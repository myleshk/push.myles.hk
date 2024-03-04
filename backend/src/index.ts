import {onRequest} from "firebase-functions/v2/https";
import expressApp from "./api";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const api = onRequest({region: "asia-east2"}, expressApp);
