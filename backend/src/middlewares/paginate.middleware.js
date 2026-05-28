const { createPaginator } = require('prisma-pagination');

const pagination = (req, res, next) => {
  req.paginate = createPaginator({ page: req.query.page, perPage: req.query.perPage });
  next();
}

module.exports = { pagination }