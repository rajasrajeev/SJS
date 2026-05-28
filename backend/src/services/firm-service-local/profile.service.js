const { prisma } = require("../../utils/prisma");

const getProfile = async (id) => { 
    const firm = await prisma.firm.findUnique(
        { 
            include: { country: true, state: true, district: true, user: { select: { email: true } } },
            where: { user_id: parseInt(id) } 
        }
    );
    return firm;
}

const updateProfile = async (id, body, files) => {
    var data = body
    // dont allow to change name of firm and return error
    if(body.name) {
        throw ({ status: 400, message: "Cannot update firm name!" });
    }
    
    if(files && files.logo) {
        data.logo = files.logo[0].path;
    }

    if(body.state_id) {
        data.state_id = parseInt(body.state_id);
    }
    if(body.district_id) {
        data.district_id = parseInt(body.district_id);
    }
    if(body.country_id) {
        data.country_id = parseInt(body.country_id);
    }
    if(body.start_date) {
        data.start_date = new Date(body.start_date);
    }

    const user = await prisma.firm.update({
        where: { id: parseInt(id) },
        data: data
    });
    return user;
}

module.exports =  {
    getProfile,
    updateProfile
}