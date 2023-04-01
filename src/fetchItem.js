"use strict"

const {v4} = require ("uuid");
const AWS = require("aws-sdk");

const fetchItem = async (event) =>{

    const  dynamoDB = AWS.DynamoDB.DocumentClient(); //uso da biblioteca AWS
    const {id} = event.pathParameters;

    let item;
    try{

        const result = await dynamoDB.get({
            TableName: "Items",
            Key: {id}
        }).promise();

        item = result.Items;



    }catch(error){

        console.log(error);

    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(item),
        headers: {'Content-Type': 'application/json'}
    });

    // return{
    //     statusCode: 200,
    //     body: JSON.stringify(item),
    // }
    

}

module.exports{
    
    handler: fetchItem,
}

