import mongoose from "mongoose";

/* Schema do Usuário */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },

    // Data do registro
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

// Criando o Modelo
export default mongoose.model("User", userSchema)