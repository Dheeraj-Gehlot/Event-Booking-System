import EventDB from "../Models/EventModel.js"
import evenSchema from "../Validation/evenSchema.js";
const viewEvents = async(req,res)=>{
    try {
        const events = await EventDB.find({status:1},{__v:0});
        if(events?.length){
            res.json({code : 200,
                events : events
            })
        }else{
            res.json({code : 200,
                events : []
            })
        }
    } catch (error) {
        console.error(error)
        res.json({
            code : 200,
            events : []
        })
    }
}


const create = async(req,res)=>{
    let request = req?.body;
    let {error} = evenSchema.create.validate(request);
    if(error){
        res.json({
            code : 400,
            error : error.details[0].message
        })
    }
    try {
        request.booked_tickets = request?.total_tickets;
        let event = await EventDB.create(request);
        res.json({
            code : 200,
            message:"Event Created"
        })
    } catch (error) {
        console.error(error); 
        res.json({
            code:400,
            error : error.message
        })
    }
}

const viewEventById = async(req,res)=>{
    let request = req?.body;
    let {error} = evenSchema.View.validate(request);
    if(error){
        res.json({
            code : 400,
            error : error.details[0].message
        })
    }
    try {
        let event = await EventDB.findOne({_id:request?.id},{__v:0});
        res.json({
            code : 200,
            data:event
        })
    } catch (error) {
        console.error(error);
        res.json({
            code:400,
            error : error.message
            })
        
    }
}
export {
    viewEvents,
    create,
    viewEventById
}