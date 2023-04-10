const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const HotelBook = require("../models/hotelbook");
const cartModel = require("../models/cart");
require("dotenv").config();

const secretKey = process.env.RAZOR_SECRET;
const keyId = process.env.RAZOR_KEYID;

const instance = new Razorpay({
  key_id: keyId,
  key_secret: secretKey,
});

router.post("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.create(req.body);
    res.status(200).json(hotelBook);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.get("/hotelbook", async (req, res) => {
  try {
    const hotelBook = await HotelBook.find({});
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(5009).json({ message: error.message });
  }
});

//to  get   hotel Book by id
router.get("/hotelBook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findById(id);
    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//to update hotelBook by id
router.put("/hotelbook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndUpdate(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }
    const updatedHotelBook = await HotelBook.findById(id);
    res.status(200).json(updatedHotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a hotel Book
router.delete("/hotelbook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const hotelBook = await HotelBook.findByIdAndDelete(id, req.body);
    //we cannot find any product in database
    if (!hotelBook) {
      return res
        .status(404)
        .json({ message: `cannot find any hotel Book with ${id}` });
    }

    res.status(200).json(hotelBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Booking summary
router.post("/add-cart", async (req, res) => {
  try {
    const cart = await cartModel.find({ userId: req.body.userId });
    if (cart) {
      throw new Error("Cart not found");
    }
    cart.items.push({
      hotelId: hotelId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfRooms: numberOfRooms,
    });

    cart.totalPrice = req.body.totalPrice;
    await cart.save();

    res.status(200).json({ status: true, message: "success" });
  } catch (er) {
    res.status(400).json({ status: false, message: er.message });
  }
});

router.post("/delete cartModel", async (req, res) => {
  try {
    const cart = await cartModel.find({ userId: req.body.userId });
    if (cart) {
      throw new Error("Cart not found");
    }
    const items = cartModel.items.filter(
      (item) => item.hotelId !== req.body.hotelId
    );
    cart.items = items;
    cart.totalPrice = req.body.totalPrice;
    await cart.save();
    req.status(200).json({ status: true, message: "success", data: cart });
  } catch (er) {
    req.status(400).json({ status: false, message: er.message });
  }
});

router.post(" /cartModel-increment", async (req, res) => {
  try {
    const cart = await cartModel.find({ _id: req.body.cartId });
    if (cart) {
      throw new Error("Cart not found");
    }
    cart.totalPrice += req.body.price;
    await cart.save();
    res
      .status(200)
      .json({ status: true, message: "success increment", data: cart });
  } catch (er) {
    req.status(400).json({ status: false, message: er.message });
  }
});

router.post(" /cartModel-decrement", async (req, res) => {
  try {
    const cart = await cartModel.find({ _id: req.body.userId });
    if (cart) {
      throw new Error("Cart not found");
    }
    cart.totalPrice -= price;
    await cart.save();
    res
      .status(200)
      .json({ status: true, message: "succefull decrement", data: cart });
  } catch (er) {
    req.status(400).json({ status: false, message: er.message });
  }
});

const createOrder = async () => {
  await instance.orders.create({
    amount: total,
    currency: "INR",
    payment_capture: 1,
    notes: {
      booking_id: "YOUR_BOOKING_ID",
    },
  });
};

router.post("/payment", async (req, res) => {
  const payment_request = req.body;
  try {
    const payment = await instance.payments.create(payment_request);
    res
      .status(200)
      .json({ status: true, payment: payment, message: "sucess payment" });
  } catch (er) {
    res.status(400).json({ message: er.message, status: false });
  }
});

module.exports = router;
