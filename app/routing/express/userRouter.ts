/**
 * I think we can call this part the "presentation" but I am not sur so
 * I use the word routing ?
 */
import express, { Request, Response } from "express";
import UserBusiness from "../../business/UserBusiness";

const UserRouter = (userBusiness: UserBusiness) => {
  const router = express.Router();
  /** Create */
  router.post("/", async (req: Request, res: Response) => {
    // I like what you said about the try/catch use: only when you know the business
    // might throw an error not use it every where in your code (try ... catch(e) throw(e))
    try {
      await userBusiness.create(req.body);
      res.status(204).send();
    } catch (err: any) {
      // here we could use a global error handler
      res.status(500).send(err?.message || "Unexpected error");
    }
  });
  /** List */
  router.get("/", async (req: Request, res: Response) => {
    try {
      const list = await userBusiness.getAll();
      res.status(200).send(list);
    } catch (err: any) {
      // here we could use a global error handler
      res.status(500).send(err?.message || "Unexpected error");
    }
  });

  return router;
};

export default UserRouter;
