const users = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');

const seedController = async (req,res,next)=>{
    try {
        await users.deleteMany({});

        const userData = [
            {
                id: uuidv4(),
                name: "Kamrul hasan",
                email: "kamrulhasan20656@gmail.com",
                phone: "01737780023",
                password: "123456"
            },
            {
                id: uuidv4(),
                name: "Nabila Tafreen",
                email: "nabila20656@gmail.com",
                phone: "01737780024",
                password: "123456"
            },
            {
                id: uuidv4(),
                name: " Rifat",
                email: "rifat20656@gmail.com",
                phone: "01737780025",
                password: "123456"
            },
            {
                id: uuidv4(),
                name: "Nafi",
                email: "nafi20656@gmail.com",
                phone: "01737780026",
                password: "123456"
            },
            {
                id: uuidv4(),
                name: "Rana",
                email: "rana20656@gmail.com",
                phone: "01737780027",
                password: "123456"
            },
            {
                id: uuidv4(),
                name: "Shariar",
                email: "shariar20656@gmail.com",
                phone: "01737780028",
                password: "123456"
            },

        ]

        const user = await users.insertMany(userData);

        res.status(201).json(user);
      

    } catch (error) {
        next(error);
    }
}

module.exports = seedController;