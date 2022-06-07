const nano = require('nano');
const url = "https://apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg:f56766c5716a7b37a531aaa7bdb53315@8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/";
const nanodb = nano(process.env.COUCHDB_URL || url);
const fresher = nanodb.use('first-db');
get = function(dbname) {
    return cloudant.use(dbname).list();
};
module.exports = { fresher, nano, get };