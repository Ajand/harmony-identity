const db = require("./mongoose");
const MineContractEvents = require("./ContractHandler/MineContractEvents");
const EventSerializer = require("./ContractHandler/EventsSerializer");
const CalculateTransfers = require("./ContractHandler/CalculateTransfers");
const TransferSeparation = require("./ContractHandler/TransferSeparation");
const AddMapping = require('./ContractHandler/AddMapping')
const MintTokens = require('./ContractHandler/MintTokens')



//MineContractEvents(100, 200)


EventSerializer("0x22c08c358f62f35b742d023bf2faf67e30e5376e", 0)
  .then((r) => {
    const ctr = CalculateTransfers(r);

    const sepratedTransfers = TransferSeparation(ctr)

    MintTokens("0xB8f73F1884Cd31825178C3970A95e465E2c93360", sepratedTransfers.mints)

  })
  .catch((err) => console.log(err));

console.log("mongoose is running");
