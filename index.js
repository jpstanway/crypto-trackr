const app = require("./server/server");

const port = 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
