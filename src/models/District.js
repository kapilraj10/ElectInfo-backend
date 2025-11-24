import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
    district:{
        type:String,
        required:true,
        unique:true,
    },
    province :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Province',
        required: false,
    },
}, { timestamps: true });

districtSchema.index({ district: 1, province: 1 }, { unique: true });

export default mongoose.model("District", districtSchema);