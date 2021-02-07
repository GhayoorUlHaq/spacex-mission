# SpaceX Missions - React.js + GraphQL
Simple React, Apollo, GraphQL App - SpaceX Missions

**This repo contains:** 

- Node Server and Schema for GraphQL using [SpaceX](https://docs.spacexdata.com/) API
- React.js Client App with Apollo-Client to use graphQL

**To check this in Action, follow following steps:**

- Run `npm install` in root directory to install dependencies for server.
- Run `npm install` in */client* to install dependencies for client application.
- Run `npm run dev` in root directory.
  - This command with run dev script to run both server (at port 5000) and react.js application (at port 3000) at same time using <u>concurrently</u> package. Check package.json to see how concurrently is used to setup script *dev*

**Note**: As of now there is no error in this repo and working well. If you're getting any error in loading data, please verify server is up and running. In addition to this you might want to check if schema and API are on same page. There is possibility that API got changed, in this case you need to update schema as well. Please update schema and generate MR if face something like that. I'll be happy to merge that 😊.

