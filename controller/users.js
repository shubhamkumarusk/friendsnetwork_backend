const model = require('../model/users');
const usersInfo = model.users;
exports.setupProfile = async (req, res) => {
    const query = {
        email: req.body.email
    };

    const existingUser = await usersInfo.findOne(query);

    if (existingUser) { // If user exists, update
        try {
            let updatedUser = await usersInfo.findOneAndUpdate(query, req.body, { new: true });
            updatedUser = await usersInfo.findOneAndUpdate(query,{profileSetup:true});
            res.status(200).json(updatedUser); // Return the updated user
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).send('Internal Server Error');
        }
    } else { // If user doesn't exist, create
        const newUser = new usersInfo(req.body);
        
        try {
            await newUser.save();
            res.status(200).json(newUser); // Return the newly created user
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    }
   
};

exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await usersInfo.findOne({ email: email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
