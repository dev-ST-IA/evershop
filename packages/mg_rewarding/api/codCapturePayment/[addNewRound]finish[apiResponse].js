const {
  commit,
  rollback
} = require('@evershop/postgres-query-builder');
const {
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const { get } = require('@evershop/evershop/src/lib/util/get');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const promises = [];
  Object.keys(delegate).forEach((id) => {
    // Check if middleware is async
    if (delegate[id] instanceof Promise) {
      promises.push(delegate[id]);
    }
  });

  const connection = await delegate.getConnection;
  try {
    const results = await Promise.allSettled(promises);
    const rejected = results.find((r) => r.status === 'rejected');
    if (rejected) {
      await rollback(connection);
      response.status(INTERNAL_SERVER_ERROR);
      response.json({
        error: {
          status: INTERNAL_SERVER_ERROR,
          message: rejected.reason.message
        }
      });
    } else {
      await commit(connection);
    }
  } catch (error) {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: get(error,'error.message',"Something went wrong. Process not completed")
      }
    });
  }

  return next();
};
