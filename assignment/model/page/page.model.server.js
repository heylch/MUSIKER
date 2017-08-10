/**
 * Created by Chuhan on 8/8/17.
 */
var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var pageModel = mongoose.model("PageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.removeWidget = removeWidget;
pageModel.reorderWidget = reorderWidget;
module.exports = pageModel;

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        });

}

function updatePage(pageId, page) {
    return pageModel
        .update({_id: pageId}, {$set: page});
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .removePage(websiteId, pageId);
        });
}

function addWidget(pageId,widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        })
}

function removeWidget(pageId, widgetId){
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function reorderWidget(pageId, start, end) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var widget = page.widgets[start];
            page.widgets.splice(start,1);
            page.widgets.splice(end,0,widget);
            return page.save();
        });
}