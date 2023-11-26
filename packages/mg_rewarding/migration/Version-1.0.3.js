const { execute } = require('@evershop/postgres-query-builder');

const rename_customer_reward_history_table = `ALTER TABLE user_rewards_history RENAME TO customer_reward_history;`;

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, rename_customer_reward_history_table);
};
