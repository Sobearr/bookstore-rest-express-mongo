import BadRequestError from "../errors/BadRequestError.js";

async function pagination (req, res, next) {
  try {
    let { limit = 5, page = 1, sortBy = "_id:-1" } = req.query;

    let [sortField = "_id", order = -1] = sortBy.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    const result = req.result;

    if (limit > 0 && page > 0) {
      const paginatedResult = await result.find()
        .sort({ [sortField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(paginatedResult);
    } else {
      next(new BadRequestError());
    }
  } catch (error) {
    next(error);
  }   
}

export default pagination;