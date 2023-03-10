require("dotenv").config()
const e = require("express")
const express= require("express")
const app= express()

app.use(express.json())

const rooms=[
    {
        name:"Deluxe",
        seats:50,
        amenities:"wifi,Smart TV,Air-Conditioner",
        price:2000,
        roomId:"432",
        bookingDetails:[{
            customerName:"subu",
            date:new Date("2023-01-15"),
            start:"09:00",
            end:"12:00",
            status:"confirmed"
        }]
    },
    {
        name:"Platinum",
        seats:100,
        amenities:"wifi,Smart TV,Air-Conditioner",
        price:3000,
        roomId:"765",
        bookingDetails:[{
            customerName:"Rocky",
            date:new Date("2022-12-10"),
            start:"12:00",
            end:"5:00",
            status:"Confirmed"
        }]
    }
]


app.get('/', function(req, res, next) {
    res.send('Server running successfully🎉🎉');
  });

app.post("/createRoom",(req,res)=>{

    rooms.push({
        name:req.body.name,
        seats:req.body.seats,
        amenities:req.body.amenities,
        price:req.body.price,
        roomId:"ghi",
        bookingDetails:[{}]
    })
res.send("Room Created")
})



app.post("/bookRoom",(req,res,next)=>{
for(let i=0;i<rooms.length;i++)
{
    console.log("a")
    if(! (rooms[i].roomId === req.body.roomId)){
         return res.status(400).send({error:"Invalid"})
          
    }
    else
    {
        let booking={
            customerName:req.body.name,
            date:new Date(req.body.date),
            start:req.body.start,
            end:req.body.end,
            status:"confirmed"
        }
        let result=undefined;
        rooms[i].bookingDetails.forEach((book)=>{
            if(book.date.getTime() == booking.date.getTime()  && book.start === booking.start )
            {
                result=0
                console.log("in booking")
               
                  
            }
            else{
                result=1
                rooms[i].bookingDetails.push(booking)
             
            }
        })
        if(result)
        return res.status(200).send("Booking confirmed")
        else
        return res.status(400).send({error:"Please select different time slot"})

    }
    
}
})


app.get("/listCustomer",(req,res)=>{

    let customerArray=[]
    
    rooms.forEach((room)=>{
        let customerObj={roomName:room.name}
    
        room.bookingDetails.forEach((customer)=>{
            customerObj.customerName=customer.customerName
             customerObj.date=customer.date
            customerObj.start=customer.start
            customerObj.end=customer.end
    
            customerArray.push(customerObj)
        })
    })
    
    res.send(customerArray)
    
    })


app.get("/listRooms",(req,res)=>{
    res.send(rooms)
})



const port =process.env.PORT || 4000
app.listen(port,()=>{
    console.log("server running in port",port)
})
