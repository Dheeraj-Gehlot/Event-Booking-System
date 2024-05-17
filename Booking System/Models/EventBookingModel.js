import mongoose from "mongoose";

let documentSchema = mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
    },
    mobile : {
        type : Number,
     },
    address : {
        type : String,
    }, 
    event_id:{
        type : String,
    },
    tickits:{
        type : Number,
    }, 
    tickitNo:{
        type:Number
    },
    price:{
        type:Number
    },
    user_id:{
        type:String
    }
}) 
 
const EventBookingDB = mongoose.model('tbl_event_booking',documentSchema);

export default EventBookingDB;