/**
 * Created by Chuhan on 7/31/17.
 */
var app = require("../../express");
var websiteModel = require("../model/website/website.model.server");


app.post("/api/user/:userId/website",createWebsite);
app.get("/api/user/:userId/website", findAllWebsitesForUser);
app.get ("/api/website/:websiteId", findWebsiteById);
app.put ("/api/website/:websiteId", updateWebsite);
app.delete ("/api/website/:websiteId", deleteWebsite);

function createWebsite(req,res) {
    var userId = req.params.userId;
    var website = req.body;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        })

}

function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        })

}

function findWebsiteById(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);

        });
}

function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (website) {
            res.json(website);

        });

}

function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            var userId = website._user;
            websiteModel
                .deleteWebsite(userId, websiteId)
                .then(function () {
                    res.sendStatus(200);
                });
        });

}