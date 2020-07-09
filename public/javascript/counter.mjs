const socket = io("http://localhost:3002/counter");

const counterContainer = document.getElementById("counter-container");
const counterValue = document.getElementById("counter-value");

const onClickCounter = () => {
  socket.emit("INCREASE_COUNTER");
};

const updateCounterValue = newValue => {
  counterValue.innerText = newValue;
};

counterContainer.addEventListener("click", onClickCounter);

socket.on("UPDATE_COUNTER", updateCounterValue);
