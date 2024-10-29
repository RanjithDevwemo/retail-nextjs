// const mongoose=require('mongoose');

// const WorkerSchema=mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     targetQuantity: {
//         type: Number,
//         required: true,
//     },
//     complitedQuantity: {
//         type: Number,
//         required: true,
//     },
//     orderDate: { type: Date, default: Date.now }
// })

// const Worker=mongoose.model('worker',WorkerSchema);

// module.exports=Worker;



const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    targetQuantity: {
        type: Number,
        required: true,
    },
    completedQuantity: {
        type: Number,
        required: true,
    },
    orderDate: { 
        type: Date, 
        default: Date.now 
    }
});

const Worker = mongoose.model('Worker', WorkerSchema);

module.exports = Worker;
