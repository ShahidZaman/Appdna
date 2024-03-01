import instance from '@/api/axiosInstance';

const getBrandStats = async () => {
  return await instance.get(`/brands/get-brand-stats`);
}

export default {
  getBrandStats
}