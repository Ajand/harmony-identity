const ethers = require("ethers");
const config = require("../endpoints");

const MappingAbi = require("../../data/abi/ERC721Mapping.json");

const MintTokens = (contractAddress, tokens) => {
  const provider = new ethers.providers.JsonRpcProvider(config.harmony);

  const AssetContract = new ethers.Contract(
    contractAddress.toLowerCase(),
    MappingAbi,
    provider
  );

  const wallet = new ethers.Wallet(config.privateKey, provider);

  const signer = AssetContract.connect(wallet);

  console.log(contractAddress);

  console.log(tokens);

  const shapedTokens = tokens.map((tk) => [tk.to, tk.tokenId]);

  /*for (var i = 0; i < tokens.length / 2000; i++) {
    setTimeout(() => {
      signer
        .mintBunch(shapedTokens.slice(i * 2000, (i + 1) * 2000 - 1))
        .then((mappers) => console.log(mappers))
        .catch((err) => console.log(err, "WERRROR"));
    }, i * 5000);
  } */

  AssetContract.ownerOf(10020)
    .then((ts) => console.log(ts))
    .catch((err) => console.log(err, ""));
};

module.exports = MintTokens;
