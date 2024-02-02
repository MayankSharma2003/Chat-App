const { ifError } = require('node:assert');
const path = require('node:path');
const con = require(path.join(__dirname, "..", "models/mysql.js"));
const mail = require(path.join(__dirname, "..", "utils/sendMail.js"));
const queries = require(path.join(__dirname, "..", "utils/queries.js"));

function getgroups(request,response){
    con.query(`select * from track join groups on track.groupid=groups.groupid where userid='${request.session.userid}' and isAccepted=1`,function(error,data){
        if (error) throw error;
        response.status(200);
        response.json(data);
    })
}

function savemessage(msg){
    con.query(`insert into messages values('${msg.message}', ${msg.userid}, ${msg.groupid}, ${msg.timestamp}, ${msg.messageid})`,function(error,data){
        if(error) console.log(error);
    })
}

// var lim=0;
function getmessagesforgroup(request,response){
    let gid = request.query.gid;
    let lim = request.query.lim;

    con.query(`SELECT m.*, u.username from users u join messages m on m.userid= u.id WHERE m.groupid = ${gid} order by timestamp DESC `, function (error, data) {
        if (error) throw error;
        // LIMIT 10 offset ${ lim }
        data.reverse();
        const filteredMessages = data.filter(function (Item) {
            if (Number(Item.userid) !== Number(request.session.userid)) {
                Item.type = "incoming";
            }
            else {
                Item.type = "user";
            }
            return true;
        });

        response.status(200);
        response.json(filteredMessages);
    });
    // lim+=10;
}

function getnewuser(request,response){
    const val = request.query.val;
    const gid = request.query.gid;

    con.query(`SELECT * FROM users WHERE email LIKE '%${val}%.com' AND id NOT IN(SELECT userid FROM track WHERE groupid=${gid});`,function(error,data){
        if(error) throw error;
        response.status(200);
        response.json(data);
    })
}

function sendnewrequest(request,response){
    const uid = request.query.uid;
    const gid = request.query.gid;

    con.query(`insert into track values(${uid}, ${gid}, 0)`,function(error,data){
        if(error)throw error;
        // console.log("Request sent");
        response.sendStatus(200);
    })
}

function showallmembers(request,response){
    const gid = request.query.gid;
    con.query(`select u.username from track as t join users as u on u.id=t.userid and t.groupid=${gid}`,function(error,data){
        if(error) throw error;
        response.status(200);
        response.json(data);
    })
}

module.exports = {getgroups, savemessage, getmessagesforgroup, getnewuser, sendnewrequest,showallmembers}