import mongoose from "mongoose";
import { Schema, Document, Types } from "mongoose";

export interface IResult extends Document {
    userId: Types.ObjectId;
    folderId: Types.ObjectId;
    testName: string;
    totalMarks: number;
    obtainedMarks: number;
    createdAt: Date;
    updatedAt: Date;
    }

    const ResultSchema: Schema<IResult> = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    folderId: {
        type: Schema.Types.ObjectId,
        ref: "Folder",
        required: true,
    },
    testName: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
    obtainedMarks: {
        type: Number,
        required: true,
    },
    }, { timestamps: true });

     const Result = mongoose.model<IResult>("Result", ResultSchema);
    export { Result };
    