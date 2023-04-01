"use strict"

const {v4} = require ("uuid");
const AWS = require("aws-sdk");

const updateItem = async (event) =>{

    const  dynamoDB = AWS.DynamoDB.DocumentClient(); //uso da biblioteca AWS com DynamoDB
    const {id} = event.pathParameters;

    await  dynamoDB.update({
        TableName: "Items",
        Key: {id},
        UpdateExpression: 'set itemsstatus = itemsStatus' ,
        ExpressionAttributeValues: {
            ':itemsStatus': itemsStatus
        },
        
        ReturnValues: "ALL_NEW"
    }).promise();

     //status para resposta do servidor

     callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Item Updated'
        }),
        headers: {'Content-Type': 'application/json'}
    });

    // return{
    //     statusCode: 200,
    //     body: JSON.stringify(
    //         {msg: 'Item Updated'}
    //     ),
    // }

}

module.exports{
    handler: updateItem,
}