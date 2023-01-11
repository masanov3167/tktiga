const express = require('express')

const cors = require('cors')
const path = require('path')
require('dotenv').config()
const app = express()
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/tkti", {useNewUrlParser: true}).then(()=>{console.log("success ")}).catch((err)=>{console.log("error")})
const PORT = process.env.PORT  || 5000;

app.use(cors())
app.use(express.json())


app.use('/elon', require('./router/ElonRoutes'))
app.use('/news', require('./router/YangilikRoutes'))
app.use('/daraja', require('./router/darajaRoutes'))
app.use('/matbuot', require('./router/matbuotRoutes'))
app.use('/sertifikat', require('./router/SertificatRoutes'))
app.use('/sub_catagory', require('./router/sub_catagoryRoutes'))
app.use('/bm_data', require('./router/bolim/BM_dataRoutes'))
app.use('/bm_hodim', require('./router/bolim/BM_hodimRoutes'))
app.use('/markaz_data', require('./router/markaz/markaz'))
app.use('/markaz_hodim', require('./router/markaz/markaz_hodim'))
app.use('/Fak_data', require('./router/fakultet/Fak_dataRoutes'))
app.use('/Fak_hodim', require('./router/fakultet/Fak_hodimRoutes'))
app.use('/kafedra_data', require('./router/kafedra/Kafedra_dataRoutes'))
app.use('/kafedra_hodim', require('./router/kafedra/Kafedra_hodimRoutes'))
app.use('/kafedra_yonalish', require('./router/kafedra/Kafedra_yonalish'))
app.use('/faoliyat', require('./router/faoliyat/faoliyat'))
app.use('/faoliyat_data', require('./router/faoliyat/faoliyat_data'))
app.use('/auth', require('./router/users'))
app.use('/filter', require('./router/FilterRoutes'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.listen(PORT, console.log(`run server ${PORT} port`))