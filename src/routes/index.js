const {Router} = require("express");
const checkInController = require("../controllers/checkInController");


const router = Router();

router.get('/flights/:id/passengers', checkInController);

module.exports = router;
