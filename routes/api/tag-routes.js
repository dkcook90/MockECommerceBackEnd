const router = require('express').Router();
// const { where } = require('sequelize/types');
// const { json } = require('sequelize/types');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {model: Product, through: ProductTag, as: 'products_with_tag'}
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const reqTag = await Tag.findByPk(req.params.id, {
      include: [
        {model: Product, through: ProductTag, as: 'products_with_tag'}
      ]
    });

    if (!reqTag) {
      res.status(404).json({message: 'No tag found with the requested ID'})
      return
    }
    const renderedTag = reqTag.get({plain: true})
    res.status(200).json(renderedTag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagUpdate) {
      res.status(404).json({message: 'No tag found with the requested ID'})
      return
    }

    res.status(200).json({message: 'Tag successfully updated!'})
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagDelete) {
      res.status(404).json({message: 'No tag was found with this ID'});
      return
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
