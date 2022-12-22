import Cookies from 'universal-cookie';
export const getUser = () => {
  let cookies = new Cookies();
  let user = cookies.get('user');
  return (user);
};
