import mongoose from "mongoose";

let documentSchema = mongoose.Schema({
    name : {
        type : String,
    },
    type : {
        type : String,
    },
    description : {
        type : String,
        },
        price : {
            type : Number,
        }, 
      venue:{
     type : String,
    },
   date:{
  type : String,
 },
 total_tickets :{
    type : Number,
 }, 
 tickets_left :{
    type : Number,
    },
 status:{
    type:Number
}
}) 

const EventDB = mongoose.model('tbl_events',documentSchema);

export default EventDB;