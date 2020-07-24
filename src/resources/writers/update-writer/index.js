const writerService = require('../writers.service');

async function handler(ctx) {
  const arr = ctx.url.split('/');
  const id = arr[arr.length-1];
  let newInfo = ctx.request.body;
  await writerService.update(id,(doc) => {for (let a in newInfo){
    doc.a = newInfo[doc.a];
  }});
  ctx.body = await writerService.find(id);
}

module.exports.register = (router) => {
  router.put('/updatewriter/:id', handler);
};
