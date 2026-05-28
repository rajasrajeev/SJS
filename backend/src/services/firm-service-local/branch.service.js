const { prisma } = require("../../utils/prisma");


const createBranch = async (req) => {
    try {
        const newBranch = await prisma.branch.create({
            data: {
                name: req.body.name,
                address: req.body.address,
                contact_no: req.body.contact_no,
                contact_no_2: req.body.contact_no_2,
                email_id: req.body.email_id,
                country_id: parseInt(req.body.country),
                state_id: parseInt(req.body.state),
                district_id: parseInt(req.body.district),
                reg_no: req.body.reg_no,
                web: req.body.web,
                fdb_no: req.body.fdb_no,
                incorporation_no: req.body.incorporation_no,
                gst_no: req.body.gst_no,
                other_license: req.body.other_license,
                trade_lic_no: req.body.trade_lic_no,
                branch_status: req.body.branch_status,
                start_date: new Date(req.body.start_date),
                pin: req.body.pin,
                land_phone: req.body.land_phone,
            } 
        });
        return newBranch;
        
    } catch(err) {
        console.log(err);
        throw ({status: 400, message: `Cannot create branch`});
    }
}


const branchList = async (query) => {
    try {
        const mod = query && query.mod;
        if (mod === "mini") {
            const data = await prisma.branch.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
            return data;
        } else {
            const data = await prisma.branch.findMany({
                include: {
                    country: true,
                    state: true,
                    district: true
                }
            });
            return data;
        }
        
    } catch (err) {
        console.log(err);
        throw ({ status: 400, message: `Cannot fetch branches` });
    } 
};


const updateBranch = async(id, body) => {
    try {
        const updatedBranch = await prisma.branch.update({
            where: { id: parseInt(id) },
            data: {
                name: body.name,
                address: body.address,
                contact_no: body.contact_no,
                contact_no_2: body.contact_no_2,
                email_id: body.email_id,
                country_id: parseInt(body.country),
                state_id: parseInt(body.state),
                district_id: parseInt(body.district),
                reg_no: body.reg_no,
                web: body.web,
                fdb_no: body.fdb_no,
                incorporation_no: body.incorporation_no,
                gst_no: body.gst_no,
                other_license: body.other_license,
                trade_lic_no: body.trade_lic_no,
                branch_status: body.branch_status,
                start_date: new Date(body.start_date),
                pin: body.pin,
                land_phone: body.land_phone,
            }
        });
        return updatedBranch;
    } catch (err) {
        console.log(err);
        throw ({status: 400, message: `Cannot update branch`});
    }
}


const deleteBranch = async(id) => {
    try {
        const user = await prisma.branch.delete({
            where: { id: parseInt(id) }
        });
        return user;
    } catch (err) {
        console.log(err);
        throw ({status: 400, message: `Cannot delete branch`});
    }
}


module.exports = {
    createBranch, 
    branchList, 
    updateBranch, 
    deleteBranch
}