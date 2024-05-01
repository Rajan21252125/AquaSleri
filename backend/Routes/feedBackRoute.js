import express from "express";
import { addFeedback, deleteFeedback, viewFeedback } from "../Controllers/feedBackController.js";



const route = express.Router();



// to add a feedback
route.post("/add", addFeedback);




// to view feedback and sort by date
route.get("/view", viewFeedback);



// to delete a specific feedback
route.delete("/delete/:id", deleteFeedback);



export default route;