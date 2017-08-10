/**
 * Created by Chuhan on 7/31/17.
 */
// http handlers
var app = require("../../express");
var userModel = require("../model/user/user.model.server");


app.post("/api/user", createUser);
app.get("/api/user", findUser);
app.get("/api/user/:userId", findUserById);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);

function createUser(req,res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}


function findUser(req,res) {
    var username = req.query.username;
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user === null)
                    return res.send("0");
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }
    else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user === null)
                    return res.send("0");
                else
                    return res.json(user);

            }, function (err) {
                return res.sendStatus(404).send(err);
            });
    }


}

function findUserById(req,res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function updateUser(req,res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId,user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });

}

function deleteUser(req,res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}