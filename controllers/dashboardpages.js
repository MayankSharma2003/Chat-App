const path = require('node:path');
const con = require(path.join(__dirname, "..", "models/mysql.js"));
const mail = require(path.join(__dirname, "..", "utils/sendMail.js"));
const queries = require(path.join(__dirname, "..", "utils/queries.js"));

function gettopusers(request,response){
    let sd = request.query.sd;
    let ed = request.query.ed;
    // con.query(`select username as name, msgcountforuser as value from users where msgcountforuser != ${0} order by msgcountforuser desc `,function(error,data){
    //     if(error) throw error;
    //     response.status(200);
    //     response.json(data);
    // })
    const dt = new Date(sd);    
    const t = dt.getTime();

    const dt1 = new Date(ed);
    const t1 = dt1.getTime();

    // if(t==t1){
    //     con.query(`select u.username as name, count(m.message) as value from users as u join messages as m  on u.id=m.userid where ${new Date(m.timestamp).getMonth()+1}=${new Date(t).getMonth() + 1} && ${new Date(m.timestamp).getDate()}=${new Date(t).getDate() } group by u.id order by value desc`, function (error, data) {
    //         if (error) throw error;
    //         response.status(200);
    //         response.json(data);
    //     })
    // }
    // else{
        con.query(`select u.username as name, count(m.message) as value from users as u join messages as m  on u.id=m.userid where m.timestamp between ${t} and ${t1}  group by u.id order by value desc`, function (error, data) {
            if (error) throw error;
            response.status(200);
            response.json(data);
        })
    // }
}

function gettopgroups(request, response) {
    // con.query(`select groupname as name, msgcountforgroup as value from groups where msgcountforgroup != ${0} order by msgcountforgroup desc `, function (error, data) {
    //     if (error) throw error;
    //     response.status(200);
    //     response.json(data);
    // })
    let sd = request.query.sd;
    let ed = request.query.ed;

    const dt = new Date(sd);
    const t = dt.getTime();

    const dt1 = new Date(ed);
    const t1 = dt1.getTime();

    con.query(`select u.groupname as name, count(m.message) as value from groups as u join messages as m  on u.groupid=m.groupid where m.timestamp between ${t} and ${t1}  group by u.groupid order by value desc`, function (error, data) {
        if (error) throw error;
        response.status(200);
        response.json(data);
    })

}

function gettopregions(request, response) {
    let sd = request.query.sd;
    let ed = request.query.ed;

    const dt = new Date(sd);
    const t = dt.getTime();

    const dt1 = new Date(ed);
    const t1 = dt1.getTime();
    con.query(`select u.region as name, count(m.message) as value from users as u join messages as m  on u.id=m.userid where m.timestamp between ${t} and ${t1} group by u.region order by value desc`, function (error, data) {
        if (error) throw error;
        response.status(200);
        response.json(data);
    })
}

module.exports = {gettopusers, gettopgroups, gettopregions}