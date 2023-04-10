const mongoose = require("mongoose");

const hotelbookSchema = mongoose.Schema({


  fullname: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address:{
    type:String,
  },
  zip:{
    type:String
  },
  city:{
    type:String,
  },
  state:{
    type:String,
  },
  content: {
    type: String,
  },
  bookingurl: {
    type: String,
  },
  availableroom: [
    {
      imgurl: {
        type: String,
      },
      title2: {
        type: String,
      },
      roomcapacity: {
        max: {
          type: String,
        },
        min: {
          type: String,
        },
      },

      perRoom: {
        type: String,
      },
      adults: {
        type: String,
      },
      chlidren: {
        type: String,
      },
      room: {
        type: String,
      },
      leftroom: {
        type: String,
      },
      perRoomPerWithBreakFast: {
        type: String,
      },
    },
  ],
});

const HotelBook = mongoose.model("HotelBook", hotelbookSchema);

module.exports = HotelBook;
