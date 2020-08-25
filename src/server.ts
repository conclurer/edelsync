import express from 'express';
const app = express()
const PORT : string|number = process.env.PORT || 5000;

app.use("/api/v1",(req, res) =>{
    res.send({
        "success" : true
    });
});

app.listen(PORT,() => console.log(`Starting server on http://localhost:${PORT}`));
