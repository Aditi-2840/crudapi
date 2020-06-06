const express = require('express');
const bodyParser=require('body-parser');

const app = express();
app.listen(3000, function() {
    console.log('listening on 3000')
});


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))


let userCollection;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://system:manager@cluster0-uwiab.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  if(err){
    console.log(err);
  }
  console.log("DB Conneted!");
  const db=client.db('starWars');
  userCollection=db.collection('user');
});




app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})  

app.post('/user',(req,res)=>{
    userCollection.insertOne({name:req.body.name}).then((result)=>{
      res.send("Inserted");
    }).catch(()=>{
      res.send("Error");
    })
});


app.get('/fetch-user',(req,res)=>{
  userCollection.find().toArray().then((result)=>{
    res.json(result);
  }).catch(()=>{
    res.send("Error");
  })
});





    

//     app.get('/', (req, res) => {
//         db.collection('quotes').find().toArray()
//           .then(quotes => {
//             res.render('index.ejs', { quotes: quotes })
//           })
//           .catch(/* ... */)
//       })

//     app.post('/quotes', (req, res) => {
//         quotesCollection.insertOne(req.body)
//           .then(result => {
//             // res.redirect('/')
//             console.log(result)
//           })
//           .catch(error => console.error(error))
//       })
//   })


