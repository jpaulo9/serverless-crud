"use strict"

const {v4} = require ("uuid");
const AWS = require("aws-sdk");


const insertItem = async (event) =>{


        const {item} = JSON.parse(event.body); // criação do objeto item
        const creatAt = new Date().toISOString(); // data de criação da inserção
        const id = v4(); // uuid para gerar id aletório
        const  dynamoDB = AWS.DynamoDB.DocumentClient(); //uso da biblioteca AWS

        const newItem ={
            id,
            item,
            createAt,
            itemStatus: false
        }

        // setando nome e objeto para inserir na tabela
        await dynamoDB.put{
            {
                TableName: "Items",
                Item: newItem
            }
        }

        //status para resposta do servidor
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(newItem),
            headers: {'Content-Type': 'application/json'}
        });
       

        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(newItem)
        // };




}


module.exports{

    handler: insertItem,
}