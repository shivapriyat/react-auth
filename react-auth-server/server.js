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
        allUsers.push({ username, email, password: passwordHash })
        console.log({ username, email, password: passwordHash });
        const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '3m' });
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
        let {username} = foundUser;
        const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '3m' });
        return res.status(200).send({ msg: "Login successful", token });
    }
    return res.status(401).send("Unauthorized");
});