import {google } from "googleapis";

let clientId = "<clientID from Google app setup>" // google/gmail setup= https://support.google.com/cloud/answer/6158849?hl=en (update OAuth COnsent screen and credelntials page in google console )
let clientSecret = "<clientSetup from Google app setup>";
let redirectUri = "http://localhost:3001/auth/google/callback";
export const oauthClient = new google.auth.OAuth2({
clientId,clientSecret,redirectUri
})