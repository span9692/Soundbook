# Soundbook

*By Sean Pan* - [Visit Soundbook](https://sound-book.herokuapp.com/)

This is the README for the final solo project from App Academy.
The project was inspired by Facebook and built using Javascript,
React.js and Redux for the front end and Python with Flask for the backend.

# Soundbook at a Glance

Soundbook is a fullstack app that allows artists to connect with one another all over the world. Artists can customize their profile pages by creating posts, adding photos, and updating their personal info. By connecting with other artists, artists can see, comment, and like each other's posts. 

![feed](https://res.cloudinary.com/photofinder/image/upload/v1640727220/Capture_a9jsms.jpg)

![profile](https://res.cloudinary.com/photofinder/image/upload/v1640734120/Capture_rs9gqq.jpg)

# Frontend Overview
- Javascript
- React
- Redux
- HTML
- CSS
- Node.js

# Backend Overview
- Python
- Flask
- PostgreSQL
- SQLAlchemy
- Docker

# Project Installation

1. Clone the project repository [here](https://github.com/span9692/Soundbook)

2. Rename the folder to whatever you want.

3. Install dependencies

      ```
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

4. Create a **.env** file based on the example with proper settings for your
   development environment
5. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

6. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```
   pipenv shell
   ```

   ```
   flask db upgrade
   ```

   ```
   flask seed all
   ```

   ```
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory OR `cd` into the `react-app` folder and run `npm install` to install node package manager dependencies.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```
   pipenv lock -r > requirements.txt
   ```
 *IMPORTANT!*
 
  After running the above command, navigate to `requirements.txt` in the root directory and add `email_validator==1.1.3` to the dependency list. This is due to a bug where the email_validator is not automatically added to the dependency list when installed.
   

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

# Deploy to Heroku
1. Before you deploy, don't forget to run the following command in order to ensure that your production environment has all of your up-to-date dependencies. You only have to run this command when you have installed new Python packages since your last deployment, but if you aren't sure, it won't hurt to run it again.

```
pipenv lock -r > requirements.txt
```
2. Create a new project on Heroku

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"

4. Install the Heroku CLI

5. Run
```
heroku login
```
6. Login to the heroku container registry
```
heroku container:login
```
7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile. This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"

8. Push your docker container to heroku from the root directory of your project. (If you are using an M1 mac, follow the steps below instead, then continue on to step 9.) This will build the Dockerfile and push the image to your heroku container registry.
```
heroku container:push web -a {NAME_OF_HEROKU_APP}
```
9. Release your docker container to heroku
```
heroku container:release web -a {NAME_OF_HEROKU_APP}
```
10. Set up your database
```
heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
heroku run -a {NAME_OF_HEROKU_APP} flask seed all
```
11. Under Settings find "Config Vars" and add any additional/secret .env variables.

12. Profit

### For M1 Mac users
(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace {NAME_OF_HEROKU_APP} with your own tag:
```
docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
```
2. Tag your app with the url for your apps registry. Make sure to use the name of your Heroku app in the url and tag name:
```
docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
```
3. Use docker to push the image to the Heroku container registry:
```
docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
```

# Running Locally
>To start the server, run `flask run` from the root directory, then run `npm start` from the `react-app` directory. This will allow you to make requests to http://localhost:3000 using any client (browser and Postman).
>To stop the server from listening to requests, press CTRL + c for Windows/Linux or CMD + c for MacOS in the terminal that you started the server (wherever you >ran npm start).
