export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem('EXPIRATION');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export const getToken = () => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const tokenDuration = getTokenDuration();

  if (!token || tokenDuration <= 0) {
    return 'Expired';
  }

  return token;
}