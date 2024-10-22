import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Properties",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;