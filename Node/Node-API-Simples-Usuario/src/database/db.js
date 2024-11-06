import mongoose from "mongoose";

async function connectDatabase(){
    await mongoose
    .connect("mongodb+srv://cururu995:1234@cluster0.vlxky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

export default connectDatabase  // Posso usar essa função em qualquer parte do código, só importar. O default é quando eu vou importar só uma coisa



