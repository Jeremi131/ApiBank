const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');
const Transfer = require('../models/tranfer.models');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  await User.create({
    name,
    password,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  await User.findOne({
    accountNumber,
    password,
    status: 'active',
  });

  return res.status(201).json({
    status: 'success',
    message: 'The acount has been loggin',
  });
});

exports.findOneUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  const userTransfer = await Transfer.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  res.status(200).json({
    message: 'Successful request',
    userTransfer,
  });
});
