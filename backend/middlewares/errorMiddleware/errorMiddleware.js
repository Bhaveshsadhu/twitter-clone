// Global Error Handler Middleware

export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue);
        message = `${field} already exists`;
    }

    // Validation errors (Mongoose)
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};
