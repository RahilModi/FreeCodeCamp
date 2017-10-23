const mongoose = require('mongoose');
const { Schema } = mongoose; // const Schema = mongoose.Schema

const searchQuerySchema = new Schema({
        searchQuery: String,
        searchDate: Date
    },
    {timestamps: true}
);

mongoose.model('searchQuerys', searchQuerySchema);