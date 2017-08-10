/**
 * Created by Chuhan on 7/31/17.
 */
var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgetModel = require("../model/widget/widget.model.server");


app.post("/api/page/:pageId/widget",createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get ("/api/widget/:widgetId", findWidgetById);
app.put ("/api/widget/:widgetId", updateWidget);
app.delete ("/api/widget/:widgetId", deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put("/page/:pageId/widget", sortWidget);

function createWidget(req,res) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function (widget) {
            res.json(widget);
        })

}

function findAllWidgetsForPage(req,res) {
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        })

}

function findWidgetById(req,res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        })

}

function updateWidget(req,res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            res.send(status);
        })

}

function deleteWidget(req,res) {
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            var pageId = widget._page;
            widgetModel
                .deleteWidget(pageId, widgetId)
                .then(function (status) {
                    res.send(status);
                });
        })

}

function sortWidget(req, res) {
    var pageId = req.params.pageId;
    var initial = req.query.initial;
    var final = req.query.final;
    widgetModel
        .reorderWidget(pageId, initial, final)
        .then(function (page) {
            return res.json(page);
        })

}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;
    console.log(widgetId);
    console.log(width);

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (response) {
            var widget = response;
            widget.url = '/uploads/'+filename;
            widgetModel
                .updateWidget(widgetId,widget)
                .then(function () {
                    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";
                    res.redirect(callbackUrl);
                    return;
                });
        });

}
