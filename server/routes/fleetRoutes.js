import express from "express";
import {addFleet, deleteFleetById, getAllFleet, getFleetById, updateFleetById}  from "../controllers/fleetController.js";
// import authMiddleware from "../middlewares/authMiddlewares";

const fleetRouter = express.Router();

fleetRouter.route("/addfleet").post(addFleet);
fleetRouter.route("/getallfleet").get(getAllFleet);
fleetRouter.route("/getfleet/:id").get(getFleetById);
fleetRouter.route("/updatefleet/:id").put(updateFleetById);
fleetRouter.route("/deletefleet/:id").post(deleteFleetById);

export default fleetRouter;