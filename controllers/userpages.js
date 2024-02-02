const path = require('node:path');
const con = require(path.join(__dirname, "..", "models/mysql.js"));
const mail = require(path.join(__dirname, "..", "utils/sendMail.js"));
const queries = require(path.join(__dirname, "..", "utils/queries.js"));

function allusers(request,response){
    con.query(`select * from users where isActive=true and id != ${request.session.userid}`, function(err,data){
        if(!err) {
            response.status(200);
            response.json(data);    
        } else{
                console.log("Error while performing query.");
                console.log(err);
                }
    })
}

function creategroup(request,response){
    const info = request.body;
    const gid = Date.now();

    con.query(`insert into groups values('${info.groupname}', '${gid}', 0)`,function(error,data){
        if(error) throw error;
        response.status(200);
        response.send();
    });

    con.query(`insert into track values('${request.session.userid}','${gid}',1)`, function (error, data) {
        if (error) throw error;
        response.status(200);
        response.send();
    });

    for(let i=0;i<info.Array.length;i++){
        con.query(`insert into track values('${info.Array[i].id}','${gid}',0)`, function (error, data) {
            if (error) throw error;
            response.status(200);
            response.send();
        });
    }
}

function invitationrequests(request,response){

    con.query(`select * from track join groups on track.groupid=groups.groupid where track.userid='${request.session.userid}' and isAccepted=0`, function (error, data) {
        if (error) throw error;
        response.status(200);
        response.json(data);
        // console.log(data);
    });
}

function acceptinvitation(request,response){
    let gid = request.body.groupid;
    con.query(`update track set isAccepted=1 where userid='${request.session.userid}' and groupid='${gid}'`,function(err,data){
        if(err)throw err;
        response.status(200);
        response.send();
    })
}

function deleteinvitation(request,response){
    let gid = request.body.groupid;
    con.query(`update track set isAccepted=-1 where userid='${request.session.userid}' and groupid='${gid}'`, function (err, data) {
        if (err) throw err;
        response.status(200);
        response.send();
    })    
}

function getuser(request,response){
    con.query(`select username, id from users where id=${request.session.userid}`,function(error,data){
        if(error) throw error;
        response.status(200);
        response.json(data);
    })
}

module.exports = {allusers, creategroup, invitationrequests, acceptinvitation, deleteinvitation ,getuser}