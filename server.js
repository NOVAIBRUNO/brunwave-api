const express = require("express")
const ytdl = require("ytdl-core")
const cors = require("cors")

const app = express()
app.use(cors())

app.get("/stream", async (req, res) => {
    const url = req.query.url

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).send("URL inválida")
    }

    res.header("Content-Type", "audio/mp4")

    ytdl(url, {
        filter: "audioonly",
        quality: "highestaudio"
    }).pipe(res)
})

app.listen(3000, () => {
    console.log("Servidor rodando")
})