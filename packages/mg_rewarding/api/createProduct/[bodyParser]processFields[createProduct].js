
module.exports = (request, response, delegate, next) => {
  if(!request.body.reward_category_id){
    request.body.reward_category_id = null;
  }
  next();
};
