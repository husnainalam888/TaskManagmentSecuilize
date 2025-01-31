import * as userService from '../services/user.service.js';


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getProfile(userId);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message }); 
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUser = await userService.updateProfile(userId, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export {getProfile,updateProfile}