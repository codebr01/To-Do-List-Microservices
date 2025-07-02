import { Router } from "express"; 
import { authRegister } from "./routes/auth-register";
import { authLogin } from "./routes/auth-login";

const router = Router();

router.post("/auth/register", (request, response) => { authRegister(request, response) })
router.post("/auth/login", (request, response) => { authLogin(request, response) })

export { router };