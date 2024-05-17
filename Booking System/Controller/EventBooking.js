import EventBookingDB from "../Models/EventBookingModel.js";
import EventDB from "../Models/EventModel.js";
import { create } from "../Validation/bookingSchema.js";
import { badRequest  } from "@hapi/boom";
import _ from 'underscore'

const tickitsBooking = async(req,res,next)=>{
    let request = req?.body;
    let {error}  =  create.validate(request);
    if(error){
        return next(badRequest(error.details[0].message.replace(/['"`]/g, '')));
    }
    try {
        let booking = false;
        let event  =  await EventDB.findOne({_id:request?.event_id,status:1,tickets_left:{$ne : 0}}).lean();
        console.log(event,"in if",event?.tickets_left > request?.tickits);
        if(event && event?.tickets_left > request?.tickits){ 
            request.tickitNo = Math.floor(100000 + Math.random() * 900000);
            request.user_id = USERID;
              booking = await EventBookingDB.create(request).then(async(result)=>{
                if(result){
                    let tickets_left = event.tickets_left -request?.tickits;
                    await EventDB.updateOne({_id:request?.event_id},{$set:{tickets_left:tickets_left}})
                }
                return true;
            });
            
        }
        if(booking){
            res.json({
                code : 200,
                message:"Booking Confirmed",
                tickitNo :  request.tickitNo
            }) 
        }else{
            res.json({
                code : 200,
                message:"unable To Book Tickets "
            })
        }
        
    } catch (error) {
        console.error(error); 
        res.json({
            code:400,
            error : error.message
        })
    }
}

const userBookings = async(req,res)=>{
    try { 
        const bookings = await EventBookingDB.find({user_id:USERID},{__v:0}).lean();
        if(bookings?.length){
            let event_ids = _.map(bookings,"event_id");
            const events = await EventDB.find({_id:{$in:event_ids}},{name:1,_id:{$toString:'$_id'}}).lean();
            _.each(bookings,async(element)=>{
                let eventDetails = _.findWhere(events,{_id:element?.event_id}); 
                element.event_name = eventDetails?.name;  
                delete element.event_id;
                return element;
            })
            res.json({
                code : 200,
                data : bookings
            })
        }else{
            res.json({code : 200,
                data : []
            })
        }
    } catch (error) {
        console.error(error)
        res.json({
            code : 200,
            data : []
        })
    }
}

export {
    tickitsBooking,
    userBookings
}