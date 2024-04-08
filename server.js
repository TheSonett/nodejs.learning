import { app } from "./app.js";

app.listen(process.env.PORT, () => {
    console.log(`Server is working at port number: 5000`);
});