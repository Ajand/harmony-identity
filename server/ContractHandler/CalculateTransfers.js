const CalculateTransfers = (tes) => {
  let finalState = new Map();

  tes.forEach((ev) => {
    const currentToken = finalState.get(ev.humanizedArgs.tokenId);
    if (currentToken) {
      finalState.set(ev.humanizedArgs.tokenId, {
        ...currentToken,
        to: ev.humanizedArgs.to,
      });
    } else {
      finalState.set(ev.humanizedArgs.tokenId, ev.humanizedArgs);
    }
  });

  const finalTokens = [...finalState.values()];

  return finalTokens;
};

module.exports = CalculateTransfers;
