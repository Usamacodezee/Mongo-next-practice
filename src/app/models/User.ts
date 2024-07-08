import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  designation: { type: String, required: true },
  jobType: { type: String, required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, required: true },
  JobLocation: { type: String, required: true },
  ExperienceLevel: { type: String, required: true },
  shiftTiming: { type: String, required: true },
  noticePeriod: { type: Boolean, required: true },
  probationPeriod: { type: Boolean, required: true },
  NoticePeriodDuration: { type: String || null },
  PrefferedLocations: [{ type: String, required: true }],
  PrefferedType: [{ type: String, required: true }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
