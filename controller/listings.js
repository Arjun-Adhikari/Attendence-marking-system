const User = require('../models/user.js');
const ExpressError = require('../utils/ExpressError'); // Import ExpressError

module.exports.newlistingupdate = async (req, res, next) => {
    try {
        const { attendances } = req.body; // attendances contains the id from the body
        if (attendances) {
            const attendancesArray = Array.isArray(attendances) ? attendances : [attendances];
            // Convert attendances to an array if it's not already
            for (let id of attendancesArray) {
                const user = await User.findById(id);
                if (user) {
                    user.attendence = (user.attendence || 0) + 1;
                    await user.save();
                }
            }
        }
        res.redirect('/home/listings');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports.getalldata = async (req, res, next) => {
    try {
        const listings = await User.find({});
        res.render('alldata.ejs', { listings });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports.postnewlisting = async (req, res, next) => {
    try {
        // Ensure the required fields are present in the request body
        const { name, rollno, attendence } = req.body;
        if (!name || !rollno || attendence === undefined) {
            throw new ExpressError(400, "Send valid data for listing");
        }
        const newUser = new User({ name, rollno, attendence });
        await newUser.save();
        res.redirect('/home/listings');
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports.getnewlisting = (req, res) => {
    res.render('newlisting.ejs');
};

module.exports.listings = async (req, res, next) => {
    try {
        const listings = await User.find({});
        res.render('listings.ejs', { listings });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports.deleteeachdata = async (req, res) => {
    const { id } = req.params; // Destructure id from req.params
    const deletedItem = await User.findByIdAndDelete(id);
    // Use await console.log(deletedItem);
    res.redirect('/home/alldata'); // Redirect after deletion 
}
