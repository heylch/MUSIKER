/**
 * Created by Chuhan on 7/31/17.
 */
var app = require("../../express");
var pageModel = require("../model/page/page.model.server");

app.post("/api/website/:websiteId/page",createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get ("/api/page/:pageId", findPageById);
app.put ("/api/page/:pageId", updatePage);
app.delete ("/api/page/:pageId", deletePage);


function createPage(req,res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
        });
}

function findAllPagesForWebsite(req,res) {
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function findPageById(req,res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
        })
}

function updatePage(req,res) {
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId,page)
        .then(function (status) {
            res.send(status);
        })
}

function deletePage(req,res) {
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function (page) {
            var websiteId = page._website;
            pageModel
                .deletePage(websiteId,pageId)
                .then(function (status) {
                    res.send(status);
                });
        })

}