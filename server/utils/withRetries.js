const withRetries =
  (wf, maxRetries = 30, attempt = 0, maxTimer = 2000) =>
  async (...params) => {
    // if the
    try {
      return await wf(...params);
    } catch (err) {

      const dynaTimer = 300 * attempt

      const timer = maxTimer < dynaTimer ? maxTimer : dynaTimer

      await new Promise((resolve) => setTimeout(resolve, timer));
      if (attempt < maxRetries) {
        return withRetries(wf, maxRetries, attempt + 1)(...params);
      } else {
        throw new Error(err);
      }
    }
  };

// withRetries(maxRetries, blockProcessor, att)(150)

module.exports = withRetries
