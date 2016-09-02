var now = Date.now();
db.user.find().snapshot().forEach(function(doc) {
  var validAt;
  if (doc.validAt) {
    validAt = new Date(+doc.validAt + 86400 * 1000 * 62);//增加62天
  } else {
    validAt = new Date(now + 86400 * 1000 * 93);//增加93天
  }
  db.user.update({_id: doc._id}, {$set: {validAt: validAt}});
  print(doc._id, doc.validAt, validAt);
});
