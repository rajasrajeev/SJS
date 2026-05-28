const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/index');

const prisma = new PrismaClient();

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ message: "Access Denied. No token provided." });
            }

            const decoded = jwt.verify(token, SECRET); 
            const userId = decoded.id;

            const userPermissions = await prisma.userPermission.findMany({
                where: { user_id: userId },
                include: {
                    permission: true
                }
            });

            const permissionList = userPermissions.map((p) => p.permission.function_name);

            if (!permissionList.includes(requiredPermission)) {
                return res.status(403).json({ message: "Access Denied. You do not have the required permission." });
            }

            next();
        } catch (err) {
            console.error("Permission Check Error:", err);
            res.status(403).json({ message: "Access Denied. Invalid or missing token." });
        }
    };
};

module.exports = { checkPermission };
