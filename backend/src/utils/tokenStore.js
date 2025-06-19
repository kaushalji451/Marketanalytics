let userTokens = null;

module.exports = {
  saveTokens: (tokens) => {
    userTokens = tokens;
  },
  getTokens: () => userTokens,
};