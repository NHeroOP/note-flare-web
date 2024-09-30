import env from "@/env";
import { Resend } from "resend";

const resend = new Resend(env.resend.apiKey);
export default resend