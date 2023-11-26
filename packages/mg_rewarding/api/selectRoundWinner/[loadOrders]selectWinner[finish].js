const {
    INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');

module.exports = async (request, response, delegate, next) => {
    const { order_round_mappings } = request;

    const randomRow = await getRandomOrderRound(order_round_mappings);
    if (!randomRow) {
        const errorRes = {}
        errorRes.status = INTERNAL_SERVER_ERROR;
        errorRes.message = 'Cannot select winner';
        response.status(INTERNAL_SERVER_ERROR);
        response.json({ error: errorRes })
        throw new Error(errorRes.message);
    }

    request.selectedOrderRound = randomRow;
    return next();
};

const getRandomOrderRound = (orderRounds) => {
    const totalQty = orderRounds.map(orderR => orderR.qty).reduce((a, b) => a + b, 0)
    const weights = orderRounds.map(orderR => orderR.qty / (totalQty))
    let cumulative_probability = 0;
    const rand = Math.random();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < weights.length; i++) {
        cumulative_probability += weights[i];
        if (rand <= cumulative_probability) {
            return orderRounds[i];
        }
    }
    const randIndex = Math.floor((rand * orderRounds.length) - 1);
    return orderRounds[randIndex >= 0 ? randIndex : 0];
}
