import placeSchema from "@/utils/database/schemas/placeSchema"
import mongoose from "mongoose"
const PlaceModel = mongoose.models.Place || mongoose.model("Place", placeSchema)
export default PlaceModel