const errorHandler = (err, req, res, next) => {
    console.error("ERROR", err);
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: message });
  };
  
  export default errorHandler;
  