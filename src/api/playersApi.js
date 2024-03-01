import instance from '@/api/axiosInstance';

const getPlayers = async (id, signupDate, signupPromoCode, lastBet, ggr, wager, lastDeposit, page) => {
  return await instance.get(`/players/get-players?id=${id}&signupDate=${signupDate}&signupPromoCode=${signupPromoCode}&lastBetDate=${lastBet}&lastDepositDate=${lastDeposit}&ggr=${ggr}&wager=${wager}&page=${page}`);
}

const getPlayer = async(id) => {
  return await instance.get('players/get-player?id=' + id);
}

export default {
  getPlayers,
  getPlayer,
}