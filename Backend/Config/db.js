const mongoose = require("mongoose");

const connectDB = async (tenantId) => {
    try {
        await mongoose.connect(`mongodb+srv://ranjithdevwemo2:ranjithdevwemo2@cluster0.3ckmctb.mongodb.net/${tenantId}`);
        console.log(`Connected to MongoDB tenent Id is ${tenantId}`);
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
    }
};

module.exports = connectDB;
