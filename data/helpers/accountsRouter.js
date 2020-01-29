const express = require('express');

const router = express.Router();

const accountsModel = require('./accountsModel.js');

const apiBase = '/api/accounts';

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ success: false, errorMessage: "Missing required name and/or budget field(s)!" });
  } else {
    accountsModel.insert(req.body)
      .then(account => {
        console.log(`POST ${apiBase} insert():\n`, account);
        res.status(201).json({ success: true, account: account });
      })
      .catch(err => {
        res.status(500).json({ success: false, errorMessage: "There was an error while saving the account to the database." });
      });
  }
});

router.get('/', (req, res) => {
  accountsModel.get()
    .then(accounts => {
      console.log(`GET ${apiBase}/ get():\n`, accounts);
      res.status(200).json({ success: true, accounts: accounts });
    })
    .catch(err => {
      res.status(500).json({ success: false, errorMessage: "The accounts information could not be retrieved" });
    });
});
router.get('/:id', (req, res) => {
  const accountId = req.params.id;

  accountsModel.get(accountId)
    .then(account => {
      console.log(`GET ${apiBase}/:accountId get(${accountId}):\n`, account);
      if (account) {
        res.status(200).json({ success: true, account: account });
      } else {
        res.status(404).json({ success: false, errorMessage: "The account with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, errorMessage: "The account information could not be retrieved." });
    });
});

router.put('/:id', (req, res) => {
  const accountId = req.params.id;

  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ success: false, errorMessage: "Please provide name and budget for the account." });
  } else {
    accountsModel.get(accountId)
      .then(account => {
        if (account) {
          accountsModel.update(accountId, req.body)
            .then(accountIdUpdated => {
              console.log(`PUT ${apiBase}/:accountId update(${accountId}):\n`, accountIdUpdated);
              if (accountIdUpdated) {
                res.status(200).json({ success: true, accountIdUpdated: parseInt(accountId, 10) });
              }
            })
            .catch(err => {
              res.status(500).json({ success: false, errorMessage: "The account information could not be modified." });
            });
        } else {
          res.status(404).json({ success: false, errorMessage: "The account with the specified ID does not exist." });
        }
      });
  }
});

router.delete('/:id', (req, res) => {
  const accountId = req.params.id;

  accountsModel.get(accountId)
    .then(account => {
      if (account) {
        accountsModel.remove(accountId)
          .then(accountIdRemoved => {
            console.log(`DELETE ${apiBase}/:accountId remove(${accountId}):`, accountIdRemoved);
            if (accountIdRemoved) {
              res.status(200).json({ success: true, accountIdRemoved: parseInt(accountId, 10) });
            }
          })
          .catch(err => {
            res.status(500).json({ success: false, errorMessage: "The account could not be removed." });
          });
      } else {
        res.status(404).json({ success: false, errorMessage: "The account with the specified ID does not exist." });
      }
    });
});

module.exports = router;