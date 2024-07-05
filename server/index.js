import express from "express"
import bodyParser from "body-parser"
import ytdl from "ytdl-core"
import cors from "cors"

const app = express()

app.use(cors({
	origin : "*",
	credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(bodyParser.json())


app.post('/download', async (req, res) => {
    try {
        const url = req.body.url
        const videoId = await ytdl.getURLVideoID(url)
        const metaInfo = await ytdl.getInfo(url)
        let data = {
            url: 'https://www.youtube.com/embed/'+videoId,
            info: metaInfo.formats
        }
        return res.send(data)
    } catch(error) {
        return res.status(500)
    }
})

app.listen(8000 , ()=>{
	console.log("server started at http://localhost:8000/")
})


