const { execute } = require('@evershop/postgres-query-builder');

const rewardCategoryScript = `
  ALTER TABLE reward_category
  ALTER COLUMN created_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_category
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE reward_category
  ALTER COLUMN updated_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_category
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

  UPDATE reward_category
  SET created_at = created_at AT TIME ZONE 'UTC',
      updated_at = updated_at AT TIME ZONE 'UTC';
`;

const rewardRoundScript = `
  ALTER TABLE reward_round
  ALTER COLUMN created_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_round
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE reward_round
  ALTER COLUMN updated_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_round
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

  UPDATE reward_round
  SET created_at = created_at AT TIME ZONE 'UTC',
      updated_at = updated_at AT TIME ZONE 'UTC';
`;

const orderRoundMappingScript = `
  ALTER TABLE order_round_mapping
  ALTER COLUMN created_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE order_round_mapping
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE order_round_mapping
  ALTER COLUMN updated_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE order_round_mapping
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

  UPDATE order_round_mapping
  SET created_at = created_at AT TIME ZONE 'UTC',
      updated_at = updated_at AT TIME ZONE 'UTC';
`;

const customerRewardHistoryScript = `
  ALTER TABLE customer_reward_history
  ALTER COLUMN created_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE customer_reward_history
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE customer_reward_history
  ALTER COLUMN updated_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE customer_reward_history
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

  UPDATE customer_reward_history
  SET created_at = created_at AT TIME ZONE 'UTC',
      updated_at = updated_at AT TIME ZONE 'UTC';
`;

const rewardRoundHistoryScript = `
  ALTER TABLE reward_round_history
  ALTER COLUMN created_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_round_history
  ALTER COLUMN created_at SET DEFAULT CURRENT_TIMESTAMP;

  ALTER TABLE reward_round_history
  ALTER COLUMN updated_at SET DATA TYPE TIMESTAMP WITH TIME ZONE;

  ALTER TABLE reward_round_history
  ALTER COLUMN updated_at SET DEFAULT CURRENT_TIMESTAMP;

  UPDATE reward_round_history
  SET created_at = created_at AT TIME ZONE 'UTC',
      updated_at = updated_at AT TIME ZONE 'UTC';
`;


// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, rewardCategoryScript);
  await execute(connection, rewardRoundScript);
  await execute(connection, orderRoundMappingScript);
  await execute(connection, customerRewardHistoryScript);
  await execute(connection, rewardRoundHistoryScript);
};
