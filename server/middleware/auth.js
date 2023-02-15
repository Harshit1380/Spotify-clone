import jwt from "jsonwebtoken";

export const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token,process.env.TOKEN_CODE);
        req.email = decodedData?.email;
        next();
    } catch (error) {
        console.log(error);
        res.json({message:"connection over"});
    }
}