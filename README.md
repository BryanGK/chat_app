# Chat App

To run this application locally please do the following:

1. Have instance of PostgreSQL database running locally. Click [here](https://www.postgresql.org/download/) to download.
2. In the `app` directory run:
```bash
$ cp ./sample.env .env
```

3. Input values to the `.env` file for the following:
```bash
DB_HOST # database host url as a string: 'localhost'
DB_PORT # database port as a number: 5432
DB_NAME # database name as a string: 'chat_app'
DB_USERNAME # database username as a string: 'postgres'
DB_PASSWORD # database password as a string: 'postgres'
ACCESS_TOKEN_SECRET # JWT access token as a string
REFRESH_TOKEN_SECRET # JWT refresh token as a string

# (optional) To generate random access tokens:
# Open terminal and run:
$ node
$ require('crypto').randomBytes(64).toString('hex');
```
4. In the `app` directory run:
```bash
$ yarn
$ yarn dev
```
5. Open browser to `http://localhost:3000`
