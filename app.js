'use strict';

require('dotenv').config();
const { Kafka } = require('kafkajs');
const inquirer = require('inquirer');

const kafka = new Kafka({
  clientId: 'retrieve-tweets',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092']
});

const producer = kafka.producer();


(async function () {
  await producer.connect();
  inquirer.prompt([{
    type: 'input',
    name: 'id-input',
    message: "ID: "
  }]).then(async answers => {
    const id = answers["id-input"]
    console.log(id)

    await producer.send({
      topic: 'ids',
      messages: [
        { value: id }
      ]
    });
    await producer.disconnect();
  })
})();
