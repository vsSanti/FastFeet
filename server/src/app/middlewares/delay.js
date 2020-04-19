export default (req, res, next) => {
  setTimeout(() => {
    return next();
  }, Math.floor(Math.random() * 600) + 300);
};
