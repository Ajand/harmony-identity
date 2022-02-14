const TransferEventModel = require("./TransferEventModel");

const SingleEventSaver = (transferEvent) => {
  const eventString = JSON.stringify(transferEvent);
  const parsedEvent = JSON.parse(eventString);
  const uniqueId = `${parsedEvent.blockNumber}:${parsedEvent.transactionIndex}:${parsedEvent.logIndex}`;

  const humanizedEvent = {
    ...parsedEvent,
    humanizedArgs: {
      from: parsedEvent.args[0],
      to: parsedEvent.args[1],
      tokenId: parseInt(parsedEvent.args[2].hex, 16),
    },
  };

  return new Promise((resolve, reject) => {
    TransferEventModel.findOne({ uniqueId }, (err, tf) => {
      if (err) return reject(err);
      if (tf) return resolve(tf);
      const ntf = new TransferEventModel({ ...humanizedEvent, uniqueId });
      return resolve(ntf.save());
    });
  });
};

module.exports = SingleEventSaver;
