import auth from '@/api/authApi';
import tenants from '@/api/tenantsApi';
import players from '@/api/playersApi';
import games from '@/api/gamesApi';
import brands from '@/api/brandsApi';

const api = {
  auth,
  tenants,
  players,
  games,
  brands
};

export default api;
