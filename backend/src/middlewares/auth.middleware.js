const passport = require('passport');


const userAuth = passport.authenticate('jwt', {session: false});

const checkRole = roles => (req, res, next) => {
    let tRole = [];
    var value = 0;

    if(req.user.is_admin) tRole.push("ADMIN");
    if(req.user.is_staff) tRole.push("STAFF");
    if(req.user.is_firm_staff) tRole.push("FIRM");
    if(req.user.is_firm_staff) tRole.push("FIRMSTAFF");
    if(req.user.is_super_admin) tRole.push("SUPERADMIN");

    tRole.forEach(function(word){
      value = value + roles.includes(word);
    });
    
    (value !== 1 && value < 1) 
        ? res.status(401).json({
            message: "Unauthorized",
            success: false
        })
        : next();
}



module.exports = {
    userAuth,
    checkRole
};