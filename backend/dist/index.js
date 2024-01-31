import express from 'express';
const app = express();
app.post("/hello", (req, res) => {
    return res.send("Hello");
});
app.listen(5001, () => console.log("Server Open"));
//# sourceMappingURL=index.js.map