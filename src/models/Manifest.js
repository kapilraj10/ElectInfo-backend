import mongoose from "mongoose";

const manifestSchema = new mongoose.Schema(
    {
        candidateName:{
            type:String,
            required:true,
        },
        candidateParty:{
            type:String,
            required:true,
        },
        discraption:{
            type:String,
            required:true,
        },
        pdfUrl:{
            type:String,
            required:true,
        },
        electionDate:{
            type:Date,
            required:true,
        },
        cloudinaryId:{
            type:String,
            required:false,
        },
        province :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Province',
            required: true,
        },
        district:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'District',
            required: true,
        }

    },
    { timestamps: true

    }
)

export default mongoose.model("Manifest", manifestSchema);