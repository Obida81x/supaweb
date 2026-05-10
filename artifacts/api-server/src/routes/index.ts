import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import servicesRouter from "./services";
import testimonialsRouter from "./testimonials";
import contactRouter from "./contact";
import authRouter from "./auth";
import statsRouter from "./stats";
import settingsRouter from "./settings";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(servicesRouter);
router.use(testimonialsRouter);
router.use(contactRouter);
router.use(authRouter);
router.use(statsRouter);
router.use(settingsRouter);

export default router;
