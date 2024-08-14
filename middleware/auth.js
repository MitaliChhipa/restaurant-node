const {getUser}= require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
  
    if (!userUid) return res.redirect("/login");
    const user = await getUser(userUid);
  
    if (!user) return res.redirect("/login");
  
    req.user = user;
    next();
  }

function allowToUser(roles){
  return function (req,res,next){
    try{
      if(!req.user) return res.redirect("/login");
      if(!roles.includes(req.user?.role)) return res.end('unauthorized');
    next();
    }catch(err){console.log(err)}
    
  }
}

module.exports={restrictToLoggedinUserOnly, allowToUser}