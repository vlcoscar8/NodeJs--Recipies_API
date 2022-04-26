import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];

        let infoToken = jwt.verify(token, req.app.get("secretKey"));

        if (infoToken.admin == true) return next();
    }
    return res.status(403).send("Not authorized");
};

export { adminAuth };
