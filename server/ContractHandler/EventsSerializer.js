const TransferEventModel = require("./Fetcher/TransferEventModel");

const EventSerializer = (address, startingBlock = 0) => {
  return new Promise((resolve, reject) => {
    console.log(address);
    TransferEventModel.find({
      address: address.toLowerCase(),
      blockNumber: { $gt: startingBlock },
    })
      .sort({ blockNumber: 1, logIndex: 1 })
      .select({
        blockNumber: 1,
        _id: 1,
        logIndex: 1,
        transactionIndex: 1,
        humanizedArgs: 1,
      })
      .exec((err, tes) => {
        if (err) return reject(err);
        return resolve(tes);
      });
  });
};

module.exports = EventSerializer;
