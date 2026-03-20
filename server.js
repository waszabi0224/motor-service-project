//backend futtatás a 8080-as potron

import app from "./app.js";

const port = 8080;

app.listen(port, () => {
    console.log("működik");
});
