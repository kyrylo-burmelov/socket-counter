import homeRoutes from "./homeRoutes";
import counterRoutes from "./counterRoutes";
import counterWithRoomsRoutes from "./counterWithRoomsRoutes";

export default app => {
  app.use("/", homeRoutes);
  app.use("/counter-with-rooms", counterWithRoomsRoutes);
  app.use("/counter", counterRoutes);
};
