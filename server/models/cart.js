const mongoose = require("mongoose");

const cartSchema = {
  userId: {
    type: mongoose.Types.ObjectId,
  },
  items: [
    {
      hotelId: mongoose.Types.ObjectId,
      checkInDate: {
        type: Date,
      },
      checkOutDate: {
        type: Date,
      },
      numberOfRooms: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
};

module.exports = mongoose.model("cart", cartSchema);
