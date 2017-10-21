const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');

let app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

var dateFormatingOptns = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

app.get('/:dateVal',(req,res)=>{
    let dateVal = req.params.dateVal;
    if(isNaN(dateVal)){
        let naturalDate = new Date(dateVal);
        if (naturalDate == 'Invalid Date'){
            res.send({"Message":'Input Param is invalid Date format. Please check..'});
        }else{
            res.send({
                unix: naturalDate.getTime()/1000,
                natural: naturalDate.toLocaleDateString('en-Us',dateFormatingOptns)
            });
        }
    }else{
        res.send({
            unix: dateVal,
            natural: moment(new Date(dateVal*1000)).format("MMMM DD, YYYY")
        });
    }
   
});
const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
    console.log(`App is running on ${PORT} port`);
});