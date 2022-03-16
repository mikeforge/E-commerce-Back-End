const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // associated Products included
  Category.findAll({
    include: [Product],
  })
    .then((catData) => res.json(catData))
    .catch((err) => {
      console.err(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // associated Products included
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((catData) => res.json(catData))
    .catch((err) => {
      console.err(err);
      res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then((catData) => res.json(catData))
    .catch((err) => {
      console.err(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update({
    category_name: req.body.category_name
}, 
{
    where: {
        id: req.params.id
    }
})
    .then(catData => {
            if (!catData) {
                res.status(404).json({message: 'No matching category'});
                return;
            }
            res.json(catData);
        }
    )
    .catch((err) => {
            console.err(err);
            res.status(500).json(err);
        }
    )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
})
    .then(catData => {
            if (!catData) {
                res.status(404).json({message: 'No matching category'});
                return;
            }
            res.json(catData);
        }
    )
    .catch((err) => {
        console.err(err);
        res.status(500).json(err);
    })
});

module.exports = router;
