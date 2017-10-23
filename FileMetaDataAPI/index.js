const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
let upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const PORT = process.env.PORT || 4569;

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.post('/upload',upload.single('file'),(req,res)=>{
    var fileSize = parseFloat(req.file.size / 1024).toFixed(2);
    res.send({
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: `${fileSize} kB`
    });
});
app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT} port`);
});

module.exports = app;