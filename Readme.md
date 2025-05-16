# Welcome to HMS_MERCY Portal

Hello everyone, In this project, I'm going to creating **HMS_MERCY Portal**.

## Working with the Project

Download this project from above link. Create two configaration files into the project.
First in the client and second in the server.

In the Client Folder create .env file and put this code inside it.

.env

```
REACT_APP_SERVER_DOMAIN='<server_domain>' # example 'http://localhost:8080'
```

After that create a file in the Server Folder with the name .env and put the below code inside it.

```
export default {
    JWT_SECRET : "<secret>",
    MAIL_USER: "steve.franecki@gmail.com", // testing email & password
    MAIL_PASS: "sMf46xCzrvdrxvuagc",  //I have used gmail smtp for sending mail. So, you to use the GMAIL APP_Passkey
    ATLAS_URI: "<MONGODB_ATLAS_URI>"
}
```

> **Note:** The **ATLAS_URI** is important to work this project.

Now, create all these variables in the project and make sure you set ATLAS_URI variable.
Otherwise, the project will not work.
