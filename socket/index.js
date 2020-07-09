import counter from "./counter";
import counterWithRooms from "./counterWithRooms";

export default io => {
  counter(io.of("/counter"));
  counterWithRooms(io.of("/counter-with-rooms"));
};
