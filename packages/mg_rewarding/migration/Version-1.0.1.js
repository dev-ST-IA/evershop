const { execute } = require('@evershop/postgres-query-builder');

const add_reward_category_created_event =
    `CREATE OR REPLACE FUNCTION add_reward_category_created_event() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO event (name, data)
  VALUES ('reward_category_created', row_to_json(NEW));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const add_reward_category_created_event_trigger =
    `CREATE TRIGGER "ADD_REWARD_CATEGORY_CREATED_EVENT_TRIGGER"
AFTER INSERT ON "reward_category"
FOR EACH ROW
EXECUTE PROCEDURE add_reward_category_created_event();`;

const add_reward_round_created_event =
    `CREATE OR REPLACE FUNCTION add_reward_round_created_event() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO event (name, data)
    VALUES ('reward_round_created', row_to_json(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const add_reward_round_created_event_trigger =
    `CREATE TRIGGER "ADD_REWARD_ROUND_CREATED_EVENT_TRIGGER"
AFTER INSERT ON "reward_round"
FOR EACH ROW
    EXECUTE PROCEDURE add_reward_round_created_event();`;

const add_reward_winner_selected_event =
    `CREATE OR REPLACE FUNCTION add_reward_winner_selected_event() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO event (name, data)
    VALUES ('reward_winner_selected', row_to_json(NEW));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;`;

const add_reward_winner_selected_event_trigger =
    `CREATE TRIGGER "ADD_REWARD_WINNER_SELECTED_EVENT_TRIGGER"
AFTER INSERT ON "reward_round"
FOR EACH ROW
WHEN (NEW.winner_id IS NOT NULL)
EXECUTE PROCEDURE add_reward_winner_selected_event();`;

module.exports = exports = async (connection) => {
    // Create a function to add an event to the event table after a reward category is created
    await execute(connection, add_reward_category_created_event);

    // Create a trigger to add an event to the event table after a reward category is created
    await execute(connection, add_reward_category_created_event_trigger);

    // Create a function to add an event to the event table after a reward round is created
    await execute(connection, add_reward_round_created_event);

    // Create a trigger to add an event to the event table after a reward round is created
    await execute(connection, add_reward_round_created_event_trigger);

    // Create a function to add an event to the event table after a reward winner is selected
    await execute(connection, add_reward_winner_selected_event);

    // Create a trigger to add an event to the event table after a reward winner is selected
    await execute(connection, add_reward_winner_selected_event_trigger);
};
