const Clarifai = require ('clarifai');

const app = new Clarifai.App({
 apiKey: 'd93453bdad794ab7959dac754afa70f0'
});

const handleAPICall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) =>{
 const {id} = req.body;
 db('users').where('id', '=', id)
 .increment('entries',1)
 .returning('entries')
 .then(entries => {
   res.json(entries[0]);
 })
 .catch(err => res.status(400).json('unable to get an entry'))
}

module.exports = {
  handleImage,
  handleAPICall
}
