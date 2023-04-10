const mongoose = require("mongoose");

const hotelbookSchema = mongoose.Schema({
  imgurl: {
    type: String,
  },
  title: {
    type: String,
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
      nonCancel: {
        type: Boolean,
      },
      Guest_Reviews: {
        type: String,
      },
      mosquitonet: {
        type: Boolean,
      },
      Wifi: {
        type: Boolean,
      },
      coldshower_24hrs: {
        type: Boolean,
      },
      airconditioned: {
        type: Boolean,
      },

      Room_Amenities: {
        type: String,
      },
      Wardrobe: {
        type: Boolean,
      },
      Bedside_Table: {
        type: Boolean,
      },
      Fan: {
        type: Boolean,
      },
      Balcony: {
        type: Boolean,
      },
      House_Keeping: {
        type: Boolean,
      },
      Room_Rate: {
        type: Boolean,
      },
      pernightroom: {
        type: String,
      },
    },
  ],
});

const HotelBook = mongoose.model("HotelBook", hotelbookSchema);

module.exports = HotelBook;
