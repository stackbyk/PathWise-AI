const neo4jDriver = require("../config/neo4j");

const getSession = () => {
  return neo4jDriver.session();
};

const createNode = async (label, properties) => {
  const session = getSession();

  try {
    const query = `
      CREATE (n:${label} $properties)
      RETURN n
    `;

    const result = await session.run(query, {
      properties,
    });

    return result.records[0].get("n").properties;
  } finally {
    await session.close();
  }
};

const findNodes = async (label) => {
  const session = getSession();

  try {
    const query = `
      MATCH (n:${label})
      RETURN n
    `;

    const result = await session.run(query);

    return result.records.map((record) => record.get("n").properties);
  } finally {
    await session.close();
  }
};

module.exports = {
  createNode,
  findNodes,
};
