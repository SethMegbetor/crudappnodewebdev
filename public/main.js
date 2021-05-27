const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

update.addEventListener("click", (_) => {
  // Send PUT Request here
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spider Hussle",
      quote: "You've got no excuse not to kick ass!!!.",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "seth",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "No quote to delete") {
        messageDiv.textContent = "No more seth's quote to delete";
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});
