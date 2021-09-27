export const test = async (done, check) => {
  try {
    await check();

    done();
  } catch (error) {
    done(error);
  }
};

export const checkAutoUpdatedFields = (response, startTime, fields) => {
  fields.forEach((field) => {
    new Date(response.body[field]).getTime().should.be.above(startTime);
    new Date(response.body[field]).getTime().should.be.below(Date.now());
  });
};

export const datesToISOStrings = (object) => {
  return Object.keys(object).reduce((acc, key) => {
    return {
      ...acc,
      [key]: object[key] instanceof Date ? object[key].toISOString() : object[key],
    };
  }, {});
};
