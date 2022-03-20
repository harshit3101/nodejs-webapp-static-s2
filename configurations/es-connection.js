const { Client } = require('@elastic/elasticsearch');

const BONSAI_ELASTIC_SEARCH_CONNECTION_STRING = (process.env.BONSAI_ELASTIC_SEARCH_CONNECTION_STRING) || ('https://elastic:'+process.env.elasticPass+'@localhost:9200');

const client = new Client({
   node: BONSAI_ELASTIC_SEARCH_CONNECTION_STRING
});

module.exports = client;  