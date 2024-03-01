import instance from '@/api/axiosInstance';

const getGames = async (provider, name, page) => {
  return await instance.get(`/games/get-games?provider=${provider}&name=${name}&page=${page}`);
}

const createGameList = async (name, gameIds) => {
  return await instance.post('/games/create-game-list', {
    name,
    gameIds: [-1],
  });
}

const getGameLists = async () => {
  return await instance.get(`/games/get-game-lists`);
}

export default {
  getGames,
  createGameList,
  getGameLists
}