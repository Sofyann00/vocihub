import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  orders: [{
    items: [{
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }],
    total: Number,
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    shippingAddress: String,
    courier: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.User || mongoose.model('User', UserSchema) 