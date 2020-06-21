const repository = require('../repositories/card-repository');

const _repo = new repository();
const ctrlBase = require('../bin/base/controller-base');
const validation = require('../bin/helpers/validation');

function cardController() {}

cardController.prototype.get = async (req, res) => {
  try {
    const cards = await _repo.getMyAll(req.usuarioLogado.user._id);
    res.status(200).send(cards);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error', error: e });
  }
};
cardController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res);
};

module.exports = cardController;
