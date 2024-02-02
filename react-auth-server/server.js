import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome to auth server" })
});

const AUTH_SERVER_PORT = 3001;
app.listen(AUTH_SERVER_PORT, () => {
    console.log(`server started at port ${AUTH_SERVER_PORT}`);
});
// start up script ends

const allUsers = [];
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
const JWT_SECRET = "THESECRETKEYDECIDEDBYME";
app.post("/auth/signup", async (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    if (req.headers.authorization) {
        let mytoken = req.headers.authorization.split(" ")[1];
        console.log("verify token:" + mytoken);
        jwt.verify(mytoken, JWT_SECRET, (err, user) => {
            if (user) {
                console.log("user is valid" + user);
                return res.status(200).send({ user });
            }
            else {
                return res.status(401).send("expired");
            }
        })
    } else {
        const { username, email, password, confirmPassword } = req.body;
        console.log("auth signup started" + password)

        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).send({
                err: "Required fields missing"
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).send({
                err: "Password and ConfirmPassword mismatch"
            })
        }

        const isNewUserDuplicate = allUsers.some((user) => {
            return user.username === username || user.email === email;
        })

        if (isNewUserDuplicate) {
            return res.status(400).send({
                err: "username already exists. Please choose a diff username"
            })
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verificationString = uuid();
        let isVerified = false;
        try {
            sendEmail({
                from: "SENDER_GMAIL_ID",
                to: email,
                subject: "Please verify your email",
                text: `Please click the below link http://localhost:3000/verify-user/${verificationString}`
            })
        } catch (error) {

        }
        console.log({ username, email, password: passwordHash, verificationString, isVerified });
        allUsers.push({ username, email, password: passwordHash, verificationString, isVerified });
        const token = jwt.sign({ username, email,verificationString, isVerified }, JWT_SECRET, { expiresIn: '10m' });
        console.log(token);
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            for (let fields in decodedToken) {
                console.log("decoded::: " + fields);
            }

        });
        return res.status(200).send({ msg: "Signup of user is successful", token })
    }
});

app.post("/auth/login", async (req, res) => {
   
    const { email, password } = req.body;
    console.log("auth login started" + password)

    if ( !email || !password ) {
        return res.status(400).send({
            err: "Required fields missing"
        })
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let foundUser = allUsers.filter( (user) => {
        
        if(user.email === email && bcrypt.compareSync(password,user.password)) {
            return user;
        }
        return null;
    });
    console.log(foundUser.length);
    if(foundUser.length > 0) {
        let {username,verificationString,isVerified} = foundUser[0];
        const token = jwt.sign({ username, email,verificationString, isVerified }, JWT_SECRET, { expiresIn: '3m' });
        return res.status(200).send({ msg: "Login successful", token, username,verificationString,isVerified });
    }
    return res.status(401).send("Unauthorized");
});

app.put("/auth/verify-mail/", (req,res)=> {
    const {verificationString} = req.body;

    console.log('req body verify str='+ JSON.stringify(req.body));
    let isUserFound = false;
    let newUserToken = "";
    console.log('recd verify str='+ verificationString);
    for(let i=0;i<allUsers.length; i++) {
        let user = allUsers[i];
        console.log('system verify str='+ user.verificationString);
        
        if(user.verificationString === verificationString) {
            user.isVerified = true;
            let {username, email,verificationString, isVerified} = user;
            newUserToken = jwt.sign({ username, email,verificationString, isVerified }, JWT_SECRET, { expiresIn: '3m' });
            isUserFound = true;
            break;
        }
    }
    if(!isUserFound) {
        return res.status(400).send({msg: "Invalid verificaionString"});
    }
    return res.status(200).send({msg: "User verified successfully", token:newUserToken});
})

import  {sendEmail}  from "./sendEmail.js";
import { v4 as uuid } from "uuid";
// app.get("/auth/send-mail", async(req,res) => {
//     sendEmail({
//         from: "SENDER_GMAIL_ID",
//         to: "RECEIVER_GMAIL_ID",
//         subject: "test email verify",
//         text: "The body of mail goes here"
//     })
// })`

app.put("/auth/forgot-password/:email", async(req,res) => {
    const {email} = req.params;
    let isUserFound = false;
    for(let i=0;i<allUsers.length; i++) {
        if(allUsers[i].email === email) {
            let passwordResetCode = uuid();
            allUsers[i].passwordResetCode = passwordResetCode;
            try {
                sendEmail({
                    to: email,
                    from : "SENDER_GMAIL_ID",
                    subject: "Password reset",
                    text: `To reset password please click the below link http://localhost:3000/reset-password/${passwordResetCode}`
                })
            } catch(err) {
                console.log(err);
                res.status(500).send({"msg": "password reset mail failed Contact admin"})
            }
        }
    }
    res.status(200).send();
});

app.put("/auth/:passwordResetCode/reset-password", async(req,res) => {
    const {passwordResetCode} = req.params;
    const {newPassword} = req.body;
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    let userFound = false;
    for(let i=0;i<allUsers.length;i++) {
        if(allUsers[i]?.passwordResetCode === passwordResetCode) {
            allUsers[i].password = newPasswordHash;
            delete allUsers[i].passwordResetCode;
            userFound = true;
            break;
        }
    }
    if(!userFound) {
        res.status(404).send();
    }
    res.status(200).send();
})