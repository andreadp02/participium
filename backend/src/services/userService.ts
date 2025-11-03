import userRepository from '../repositories/userRepository';

const findAll = async () => {
  return userRepository.findAll();
};

const create = async (data: { name: string; email: string }) => {
  return userRepository.create(data);
};

export default { findAll, create };