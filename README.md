# User authentication using MERN

In this project the very first step is to register the user with some details like name, email, password and confirm password. While registering if the user password and confirm password does not match then it will send an alert that "Password and Confirm password didn't match". After registration the user's data is stored in database. In this project the database is ## MongoDB. Then it will automatically redirects the user to login page. If the user entered a false details then it will aler the user "Invalid Credentials". when the user is logged in we generate a unique token which is stored in local storage and then user will now see the home page. When the user is logout then the token generated is deleted from the local storage.

## Tools used

- Mongo DB
- Express JS
- React JS
- Node JS

## How to get started ?

In the project directory, you can run:

### `npm start`

After that open a new terminal and cd to src/server and run command:

### `node index.js` or if you have nodemon install then ### `nodemon index.js`

The above command will start the server and stores the data which is coming from the frontend.
