const resHelper = (res, statusCode, data, message) => {
  return res.status(statusCode).json({data, message});
}

module.exports = {resHelper};
