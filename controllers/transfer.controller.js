const Transfers = require('../models/tranfer.models');
const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.sendTranfer = catchAsync(async (req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;

  const userSender = await User.findOne({
    where: {
      id: senderUserId,
    },
  });

  const userReceiver = await User.findOne({
    where: {
      id: receiverUserId,
    },
  });

  await User.update(
    { amount: +userSender.amount - +amount },

    {
      where: {
        id: senderUserId,
      },
    }
  );

  await User.update(
    { amount: +userReceiver.amount + +amount },

    {
      where: {
        id: receiverUserId,
      },
    }
  );

  await Transfers.create({
    amount,
    senderUserId,
    receiverUserId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Transference is succefully',
  });
});
