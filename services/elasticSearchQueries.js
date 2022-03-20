const client = require('../configurations/es-connection.js');
const handlers = require('./errorHandle.js')
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

async function addDocumentToMongoUsers(user){

    const operations = [user]
    .flatMap(doc => [
        { index: { _index: 'mongo-users'}}
        ,{username: doc.username, location: {lat:doc.location.latitude, lon: doc.location.longitude}}
    ]);

    if(operations.length > 0){
        client.bulk({  
            body: operations 
        }).then(
            ...handlers
        ).finally(
            ()=>{
                console.log('Harshit Finally');
            }
        );

    }

}

async function deleteDocumentFromMongoUsers(username){

    client.deleteByQuery({  
        index: "mongo-users",
        body: {
            query: {
                match: {
                    username: username
                }
            }
        }
      }).then(
        ...handlers
      )

}


module.exports = {
    queryString : queryString,
    addDocumentToMongoUsers: addDocumentToMongoUsers,
    deleteDocumentFromMongoUsers: deleteDocumentFromMongoUsers
}
