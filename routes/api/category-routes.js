const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {model: Product}
      ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    });

    if(!categoryById) {
      res.status(404).json({message: 'No category with this ID was found'})
    }

    res.status(200).json(categoryById)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

    res.status(200).json({message: 'category successfully updated'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryDelete) {
      res.status(404).json({message: 'No category found with the requested ID'});
      return
    }
    res.status(200).json({message: 'Category successfully deleted'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
