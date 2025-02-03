export const errorHandler = (err, req, res, next) => {
    console.error("Global Error Handler:", err);
  
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
      details: err.details || null,
    });
  };