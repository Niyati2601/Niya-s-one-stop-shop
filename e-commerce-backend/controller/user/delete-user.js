const userModel = require("../../models/user-model");

async function deleteUser(req, res) {
  try {
    const sessionUser = req.userId; // Get the ID of the logged-in user
    const { _id } = req.body; // Get the ID of the user to be deleted

    const user = await userModel.findById(sessionUser);
    if (!user) {
      return res.status(404).json({
        message: "Logged-in user not found",
        error: true,
        success: false,
      });
    }

    // Check if the logged-in user is an admin
    if (user.role === 'ADMIN') {
      // Check if the user to delete exists
      const userToDelete = await userModel.findById(_id);
      if (!userToDelete) {
        return res.status(404).json({
          message: "User to delete not found",
          error: true,
          success: false,
        });
      }

      const deletedUser = await userModel.findByIdAndDelete(_id);
      if (!deletedUser) {
        return res.status(500).json({
          message: "Failed to delete user",
          error: true,
          success: false,
        });
      }

      return res.status(200).json({
        message: "User Deleted Successfully",
        data: deletedUser,
        error: false,
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "You are not authorized to delete users",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = deleteUser;
