const client = require('../configurations/es-connection.js');
const handlers = require('../utils/errorHandle.js');
const index_name = "mongo-users";



async function queryString(location){

    try {
        let res = await client.search({
            index: index_name,
            body: {
                    query: {
                        bool: {
                            filter: {
                                geo_distance : {
                                    distance: location.radius,
                                    location: {
                                        lat: location.latitude,
                                        lon: location.longitude
                                    }
                                }
                            }
                        }
                    }
            }
        });
        let users = (res?.body?.hits?.hits|| []).flatMap(hit => hit._source);
        return users;
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    queryString : queryString
}
