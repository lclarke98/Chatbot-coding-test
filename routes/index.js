const express = require('express');
const router = express.Router();
const bot = require('../api/bot')
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/* Starts messaging session. */
router.get('/', async function(req, res, next) {
  try {
    res.send(await bot.startChatSession())
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

/* User sends message. */
router.post('/message', async function(req, res, next) {
  try {
    res.send(await bot.handleChatSession(req.body.userID, req.body.message))
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }

});

/* User deleting a message. */
router.delete('/message', async function(req, res, next) {
  try {
    res.send(await bot.removeMessage(req.body.userID, req.body.message))
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
