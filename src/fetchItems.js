"use strict"

const {v4} = require ("uuid");
const AWS = require("aws-sdk");


const fetchItems = async (event) =>{

    const  dynamoDB = AWS.DynamoDB.DocumentClient(); //uso da biblioteca AWS


    let items;

    try{

        const results = await dynamoDB.scan({
 
            TableName: "Items"

        }).promise();

        items = results.items;

    }catch(error){

        console.log(error);
       
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {'Content-Type': 'application/json'}
    });
    // return{
        
    //     statusCode: 200,
    //     body: JSON.stringify(items),
    // };

}

module.exports{

    handler: fetchItems,
}
