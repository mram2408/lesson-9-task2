import { Router } from "express";
const router = Router();

import { checkSchema } from "express-validator";

// router.get("/", (req, res) => {
//   if (req.cookies.userName) res.redirect("/products");
//   else res.redirect("/login");
// });
// router.get("/login", (req, res) => {
//   res.render("loginPage", { title: "Увійти" });
// });
// router.post("/login", (req, res) => {
//   res.cookie("userName", req.body.userName);
//   res.cookie("password", req.body.password);
//   res.redirect("/products?price=ascending");
// });

// router.get("/logout", (req, res) => {
//   if (req.cookies.userName && req.cookies.userName) {
//     res.clearCookie("userName");
//     res.clearCookie("password");
//   }
//   res.redirect("/");
// });

export default router;
