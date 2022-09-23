console.log("Client side jacascript file loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "Loading...";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = search.value;

	fetch(
		"http://localhost:3000/weather?address=" + location
	).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne = data.error;
			} else {
				messageOne = data.location;
				messageTwo = data.forecast;
			}
		});
	});
});