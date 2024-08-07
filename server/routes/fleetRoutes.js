import express from "express";
import {addFleet}  from "../controllers/fleetController.js";
// import authMiddleware from "../middlewares/authMiddlewares";

const fleetRouter = express.Router();

fleetRouter.route("/addfleet").post(addFleet);

export default fleetRouter;