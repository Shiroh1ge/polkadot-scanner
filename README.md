# polkadot-scanner

### Setup

1. Make sure you have [NodeJS](https://nodejs.org/)  and [Yarn](https://yarnpkg.com/getting-started/install)  and installed.
2. Install your dependencies

    ```
    yarn
    ```

3. To start the projects run:

    ```
    yarn start
    ```
This will start both the `frontend` and `backend` projects in parallel.
You can access the frontend on `http://localhost:4001` and the backend on `http://localhost:3001`


**NOTE:** In order to access the web app from the Node.js server, you need to build the frontend app first with `yarn build`.

4. To build the projects run:
    ```
    yarn build
    ```

5. To run the tests run:
    ```
    yarn test
    ```

## Limitations

1. There is no support for authentication or a database that stores the user password. We use hardcoded ones for the sake of simplicity.


2. When the backend is being deployed we have to copy the frontend build contents into the static folder, otherwise
the Cloud Function cannot detect it, as it's only aware of its adjacent files and folders. Ideally the frontend app is hosted
separately from the backend.


3. Not enough frontend tests are written to cover all the edge cases.


4. CI/CD is missing test/lint steps.
