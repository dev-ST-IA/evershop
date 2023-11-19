const {
  commit,
  rollback
} = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const promises = [];
  Object.keys(delegate).forEach((id) => {
    // Check if middleware is async
    if (delegate[id] instanceof Promise) {
      promises.push(delegate[id]);
    }
  });
  const result = await delegate.createRewardRounds;
  const connection = await delegate.getConnection;
  const results = await Promise.allSettled(promises);
  const rejected = results.find((r) => r.status === 'rejected');
  if (!rejected) {
    await commit(connection);
    response.status(OK);

    response.json({
      data: {
        ...result,
        links: [
          {
            rel: 'rewardingOngoingRounds',
            href: buildUrl('rewardingOngoingRounds'),
            action: 'GET',
            types: ['text/xml']
          }
        ]
      }
    });
  } else {
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: rejected.reason.message
      }
    });
  }
};
