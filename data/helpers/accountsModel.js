const db = require('../dbConfig.js');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  if (id) {
    return db("accounts")
      .where("id", id)
      .first();
  } else {
    return db("accounts");
  }
};

function insert(account) {
  return db("accounts")
    .insert(account)
    .then(([id]) => this.get(id));
};

function update(id, accountChanges) {
  return db("accounts")
    .where("id", id)
    .update(accountChanges)
    .then(count => (count > 0 ? this.get(id) : null));
};

function remove(id) {
  return db("accounts")
    .where("id", id)
    .del();
};
