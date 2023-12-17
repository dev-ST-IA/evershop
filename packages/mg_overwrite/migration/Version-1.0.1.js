const { execute } = require('@evershop/postgres-query-builder');

const banner_cms = `
CREATE TABLE "cms_banner" (
  "cms_banner_id" INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
  "uuid" UUID DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "image" varchar NOT NULL,
  "active" boolean NULL DEFAULT('0'),
  "description" text DEFAULT NULL,
  "url_id" INT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "CMS_BANNER_ID_UNIQUE" UNIQUE ("cms_banner_id")
)`;

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  await execute(connection, banner_cms);
};
