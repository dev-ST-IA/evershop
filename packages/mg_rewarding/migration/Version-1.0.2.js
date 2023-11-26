const { execute } = require('@evershop/postgres-query-builder');

const reward_round_history = `
CREATE TABLE reward_round_history (
  round_history_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  round_id INT REFERENCES reward_round(round_id) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_uuid_round_history UNIQUE (uuid)
);
`;

const remove_col_user_rewards_history = `
ALTER TABLE user_rewards_history
DROP COLUMN reward_received
`

const add_cols_user_rewards_history = `
ALTER TABLE user_rewards_history
ADD COLUMN reward_received BOOLEAN NULL DEFAULT('0'),
ADD COLUMN reminder_sent BOOLEAN NULL DEFAULT('0'),
ADD COLUMN reward_expiry TIMESTAMPTZ,
ADD COLUMN reminders_count INT NULL DEFAULT(3),
ADD COLUMN reward_details TEXT NULL,
ADD COLUMN reward_claim_method TEXT NULL,
ADD COLUMN order_id INT REFERENCES "order"(order_id),
ADD COLUMN order_item_id INT REFERENCES order_item(order_item_id);
`;

const add_col_reward_round = `
ALTER TABLE reward_round
ADD COLUMN reward_details TEXT NULL;
`

const update_reward_round = `
  UPDATE reward_round AS rr
  SET reward_details = rc.reward_details
  FROM reward_category AS rc
  WHERE rr.category_id=rc.category_id;
`

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, reward_round_history);
  await execute(connection, remove_col_user_rewards_history);
  await execute(connection, add_cols_user_rewards_history);
  await execute(connection, add_col_reward_round);
  await execute(connection, update_reward_round);
};
