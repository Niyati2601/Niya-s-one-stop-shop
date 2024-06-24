async function userLogout(req, res) {
    try {
        res.clearCookie("token")

        res.json({
            message: "Logout successfully",
            data: [],
            success: true,
            error: false,
            data: []
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout