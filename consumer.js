'use-strict';

require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'retrieve-tweets',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'local-dev' });

(async function () {
  await consumer.connect();
  await consumer.subscribe({ topic: 'ids', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString());
    }
  });
})();
