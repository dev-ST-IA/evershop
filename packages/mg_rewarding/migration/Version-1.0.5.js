const { execute } = require('@evershop/postgres-query-builder');


const add_cols_customer_reward_history = `
ALTER TABLE customer_reward_history
ADD COLUMN reward_sent BOOLEAN NULL DEFAULT('0');
`;



// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, add_cols_customer_reward_history);
};
