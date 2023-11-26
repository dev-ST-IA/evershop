const { execute } = require('@evershop/postgres-query-builder');

const reward_category_table = `
CREATE TABLE reward_category (
  category_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  category_name TEXT NOT NULL,
  category_limit INT NOT NULL,
  auto_restart BOOLEAN NOT NULL,
  reward_details TEXT,
  active BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_uuid_category UNIQUE (uuid)
);
`;

const reward_round_table = `
CREATE TABLE reward_round (
  round_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  category_id INT REFERENCES reward_category(category_id) NOT NULL,
  round_status TEXT NOT NULL,
  round_start_date_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  round_end_date_time TIMESTAMPTZ,
  current_completed_quantity INT DEFAULT 0,
  category_limit INT NOT NULL,
  winner_id INT REFERENCES customer(customer_id),
  winner_selection_date_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_uuid_round UNIQUE (uuid)
);
`;

const order_round_mapping_table = `
CREATE TABLE order_round_mapping (
  mapping_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  round_id INT REFERENCES reward_round(round_id) NOT NULL,
  order_item_id INT REFERENCES order_item(order_item_id) NOT NULL,
  active BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_uuid_mapping UNIQUE (uuid)
);
`;

const user_rewards_history_table = `
CREATE TABLE user_rewards_history (
  history_id INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid(),
  user_id INT REFERENCES customer(customer_id) NOT NULL,
  round_id INT REFERENCES reward_round(round_id) NOT NULL,
  reward_received BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_uuid_history UNIQUE (uuid)
);
`;

const add_fk_in_product_table = `
ALTER TABLE product
ADD COLUMN reward_category_id INT REFERENCES reward_category(category_id);
`;

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, reward_category_table);
  await execute(connection, reward_round_table);
  await execute(connection, order_round_mapping_table);
  await execute(connection, user_rewards_history_table);

  await execute(connection, add_fk_in_product_table);
};
