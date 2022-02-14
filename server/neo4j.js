const neo4j = require("neo4j-driver");


const URL = "neo4j://localhost:7687";

const driver = neo4j.driver(URL, neo4j.auth.basic("neo4j", "123456"));

const sessionCreator = () => {
  const session = driver.session();
  return session;
};

const queryRunner = (query, params) => {
  return new Promise((resolve, reject) => {
    const session = sessionCreator();
    session
      .run(query, params)
      .then((result) => {
        session.close();
        return resolve(result);
      })
      .catch((err) => {
        session.close();
        return reject(err);
      });
  });
};

module.exports = queryRunner;
