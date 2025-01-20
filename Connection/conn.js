import mongoose from "mongoose";

 export const mongooseConnection = mongoose.connect("mongodb+srv://uday:udaykalyan@pasta.tr62i.mongodb.net/youtubeBackend?retryWrites=true&w=majority&appName=Pasta")
    .then(()=> console.log("DB connection successful"))
    .catch(err=>{console.log(err)});
