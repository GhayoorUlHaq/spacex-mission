const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

// Idea is to fetch data from API or resource and create schema from that.
// Need to define types that can be accessed from clients in schema.
// Root Queries are direct access for clients.
// Other types can be sccessed using root.

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: ()=>({
        flight_number: { type: GraphQLString}, // Key name is in response
        mission_name: { type: GraphQLString}, // Key name is in response
        launch_year: { type: GraphQLString}, // Key name is in response
        launch_date_local: { type: GraphQLString }, // Key name is in response
        launch_success: { type: GraphQLBoolean}, // Key name is in response
        rocket: { type: RocketType}, // Key name is in response

    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: ()=>({
        rocket_id: { type: GraphQLString}, // Key name is in response
        rocket_name: { type: GraphQLString}, // Key name is in response
        rocket_type: { type: GraphQLString}, // Key name is in response
    })
});

// Root
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches`)
                .then(res => res.data);
            }
        }, // direct access for clients
        launch: {
            type: LaunchType,
            args: {
                flight_number: { type: GraphQLString }
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data);
            }
        }, // direct access for clients
        rockets: {
            type: new GraphQLList(RocketType),
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/rockets`)
                .then(res => res.data);
            }
        }, // direct access for clients
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data);
            }
        } // direct access for clients
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

// Sample Query for Launches
// {
//     launches {
//       flight_number,
//       mission_name,
//       launch_year,
//       launch_success,
//       rocket {
//         rocket_id,
//         rocket_type,
//         rocket_name
//       }
//     }
//   }

// Sample Query for Launch
// {
//     launch(flight_number: 2){
//       mission_name,
//       launch_year,
//       launch_success
//      }
// }
