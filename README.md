# react-auth
React JS with authentication

Notes for OAUTH
Additional Notes:
In Google console create/select a project
API &services> oauth consent screen > exerna luser scope email nd profile
Credentials > Oauth client id > Redirect url needed.

steps in GET  /auth/google/url
scope=[https://www.googleapis.com/auth/userinfo.email, https://www.googleapis.com/auth/userinfo.profile]
create oauthClient with GCP clientid,secret and redirect_url
generate url using oauthCient.generateAuthUrl({access_type, prompt,scope})



On Load of Login Page in frontend, Invoke auth backend URL: /auth/google/url and using the response set the stateVariable : "googleOauthUrl".

User clicks on Login with Google button. -> Redirect browser to url stored in state var "googleOauthUrl".

On user providing consent to gmail about the app using the user details from google, Redirect URL is loaded (/auth/google/callback/?code=<codeValue>)

steps in GET /auth/google/callback/?code=<codeValue>
allMyTokens = oauthclient.getToken(codeValue);
userObj = GET https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=allMyTokens.accessToken , {headers: {Authorization: `Bearer ${allMyTokens.id_token}`}}
jwtToken = jwt.sign(userObj.fields) 
Navigate res.redirect(http://localhost:3000/login/?token=jwtToken)

when loginpage with token queryparam is seen in browser
extract the token
setToken(extracted value)
redirect navigate("/products")
