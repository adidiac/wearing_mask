const { raw } = require("express");
var express = require("express");
var router = express.Router();
var elem;
router.post("/", function(req, res, next) {
    elem=req.body;
    console.log(req.body)
    res.send("API is working properly");
});
router.get("/", function(req, res, next) {
    res.send("API is working properly");
});
module.exports = router;