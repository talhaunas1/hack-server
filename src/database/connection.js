import mongoose from 'mongoose';



export const connection = async (url) => {

    mongoose.set('strictQuery', true)


    mongoose.connect(process.env.MONGO_URL)
    .then(console.log('connected to database!'))
}