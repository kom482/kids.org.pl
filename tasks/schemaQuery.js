// Based on: https://medium.com/commutatus/whats-going-on-with-the-heuristic-fragment-matcher-in-graphql-apollo-client-e721075e92be

const fetch = require("node-fetch");
const fs = require("fs");

require("dotenv").config();

const graphqlQuery = `
    {
        __schema {
            types {
                kind
                name
                possibleTypes {
                    name
                }
            }
        }
    }
`;

fetch(`${process.env.PRISMIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(graphqlQuery)}`, {
    method: "GET",
    headers: { "prismic-ref": process.env.PRISMIC_REF_HEADER },
})
    .then(result => result.json())
    .then(result => {
        // filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null);
        result.data.__schema.types = filteredData;
        fs.writeFileSync(
            "./src/services/apollo/fragmentTypes.js",
            "export default " + JSON.stringify(result.data),
            err => {
                if (err) {
                    console.error("Error writing fragmentTypes file", err);
                } else {
                    console.log("Fragment types successfully extracted!");
                }
            },
        );
    });
