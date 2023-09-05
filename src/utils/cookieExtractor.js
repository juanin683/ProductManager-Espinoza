const cookieExtrator = (req) => {
    const tokencookie = req.cookies.accessToken;
  
    return tokencookie ?? false;
  };
  export default cookieExtrator;