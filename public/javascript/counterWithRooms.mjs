import { createElement, addClass, removeClass } from "./helper.mjs";

const socket = io("http://localhost:3002/counter-with-rooms");

const counterContainer = document.getElementById("counter-container");
const counterValue = document.getElementById("counter-value");
const roomsContainer = document.getElementById("rooms-container");

let activeRoomId = null;

const setActiveRoomId = roomId => {
  activeRoomId = roomId;
};

const onClickCounter = () => {
  if (!activeRoomId) {
    return;
  }
  socket.emit("INCREASE_COUNTER");
};

counterContainer.addEventListener("click", onClickCounter);

const createRoomButton = roomId => {
  const roomButton = createElement({
    tagName: "button",
    className: "room-item flex-centered no-select",
    attributes: { id: roomId }
  });

  const onJoinRoom = () => {
    if (activeRoomId === roomId) {
      return;
    }
    socket.emit("JOIN_ROOM", roomId);
  };

  roomButton.addEventListener("click", onJoinRoom);

  roomButton.innerText = roomId;

  return roomButton;
};

const updateCounterValue = newValue => {
  counterValue.innerText = newValue;
};

const updateRooms = rooms => {
  const allRooms = rooms.map(createRoomButton);
  roomsContainer.innerHTML = "";
  roomsContainer.append(...allRooms);
};

const joinRoomDone = ({ counterValue, roomId }) => {
  const newRoomElement = document.getElementById(roomId);
  addClass(newRoomElement, "active");

  if (activeRoomId) {
    const previousRoomElement = document.getElementById(activeRoomId);
    removeClass(previousRoomElement, "active");
  }

  removeClass(counterContainer, "disabled");
  updateCounterValue(counterValue);
  setActiveRoomId(roomId);
};

socket.on("UPDATE_ROOMS", updateRooms);
socket.on("UPDATE_COUNTER", updateCounterValue);
socket.on("JOIN_ROOM_DONE", joinRoomDone);
