const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const CatData = await Category.findAll({
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(CatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catById = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    });

    if(!catById) {
      res.status(404).json({message: 'No category with this ID was found'})
    }

    res.status(200).json(catById)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryUpdate) {
      res.status(404).json({message: 'No category found with the requested ID'})
      return
    }

    res.status(200).json({message: 'category successfully updated!'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryDelete) {
      res.status(404).json({message: 'No category was found with this ID'});
      return
    }
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
