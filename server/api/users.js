const router = require('express').Router()
const {User} = require('../db/models')
const music = require('musicmatch')({
  apikey: '19c8312e5f65e34e70e7361977223254'
})
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/music', async (req, res, next) => {
  try {
    const data = await music.trackSearch({
      q_lyrics: 'karma police arrest this man',
      s_artist_rating: 'desc',
      s_track_rating: 'desc',
      page_size: 100
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})
