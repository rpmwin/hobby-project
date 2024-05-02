import jwt from "jsonwebtoken";

const decodeToken = async (token) => {
    try {

        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        return decoded

        
    } catch (error) {
        console.log("some error occured in decoding token", error);
    }
}

export default decodeToken