import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { Request, Response } from 'express';
import mongoose from 'mongoose'; // object data modelling
import myUserRoute from './routes/MyUserRoute'
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"
import orderRoute from "./routes/OrderRoutes"

/*
	•	CORS lets websites request resources from a different domain.
	•	The server controls who can access its data by sending specific headers.
	•	Browsers enforce CORS to improve security by blocking unauthorized cross-origin requests.
*/
/*
	dotenv is a module that allows you to manage sensitive information like API keys, database credentials, and other environment-specific configurations in a .env file.
*/

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
	.then(() => console.log("Connected to database"))

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express()
app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
	res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(5001, () => {
	console.log("server lisitning on port 5001")
})
