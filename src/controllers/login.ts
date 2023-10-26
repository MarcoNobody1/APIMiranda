import {  Request, Response, Router } from "express";
import authService from "../services/login";

export const loginController = Router(); 

loginController.post("/", async(req: Request<{user: string, password: string}>, res: Response) => {
try {
    const username = req.body.user;
    const password = req.body.password;
    const result = await authService.login(username, password);
    res.send(result)
} catch (error) {
    res.status(400).json(`${error}`)
}

})