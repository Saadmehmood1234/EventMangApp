import { Schema, model, models } from "mongoose";

// Define the User Schema
const userSchema =  new Schema({
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Date,
    default: null,
  },
  image: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: "user",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  accounts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});

// Define the Account Schema
const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  providerAccountId: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    default: null,
  },
  access_token: {
    type: String,
    default: null,
  },
  expires_at: {
    type: Number,
    default: null,
  },
  token_type: {
    type: String,
    default: null,
  },
  scope: {
    type: String,
    default: null,
  },
  id_token: {
    type: String,
    default: null,
  },
  session_state: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

// Check if model already exists
// const MyEventUser = mongoose.models.MyEventUser || mongoose.model("MyEventUser", userSchema);
const MyEventUser = models?.MyEventUser || model("MyEventUser", userSchema);
const Account = models?.Account || model("Account", accountSchema);

export { MyEventUser, Account };
