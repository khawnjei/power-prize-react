export const BASE_URL = "https://wnexcpnapk.ap-southeast-2.awsapprunner.com/";

export default {
  logOut: BASE_URL + "api/v1/user/logout",
  logIn: BASE_URL + "api/v1/user/testLogin",
  getAllUsers: BASE_URL + "api/v1/user",
  deleteUser: BASE_URL + "api/v1/user",
  getCoins: BASE_URL + "api/v1/coin/?fields=coin,amount,icon&sort=coin",
  deleteCoins: BASE_URL + "api/v1/coin/",
  updateCoins: BASE_URL + "api/v1/coin/",
  createCoins: BASE_URL + "api/v1/coin/create",
  getRaffles: BASE_URL + "api/v1/raffle/",
  getPrize: BASE_URL + "api/v1/raffle/prizepage",
  updateRaffle: BASE_URL + "api/v1/raffle",
  deleteRaffle: BASE_URL + "api/v1/raffle/",
  createRaffle: BASE_URL + "api/v1/raffle/create",
  getallDispute: BASE_URL + "api/v1/dispute/getAll",
  deleteDispute: BASE_URL + "api/v1/dispute/delete/",
};
