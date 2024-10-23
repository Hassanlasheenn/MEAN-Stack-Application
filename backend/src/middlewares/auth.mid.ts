import { verify } from "jsonwebtoken";
import { HttpStatusCodes } from "../enums/http_status_codes.enum";


export default (req: any, res: any, next: any) => {
    const token = req.headers.access_token as string;
    if(!token) return res.status(HttpStatusCodes.HTTP_NOT_AUTHORIZED).send();

    try {
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        req.user = decodedUser;
    } catch (error) {
        res.status(HttpStatusCodes.HTTP_NOT_AUTHORIZED).send();
    }

    return next();
}