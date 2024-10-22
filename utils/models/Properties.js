import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
    },

    images:
     [{ 
        type: String 
    }],
   
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Review" 
    }],
    averageRating: { 
        type: Number,
          default: 0 
},
    numReviews: {
         type: Number, default: 0
     },
  
  },
  { timestamps: true }
);



const Property = mongoose.models.Properties || mongoose.model("Properties", propertySchema);

export default Property;


