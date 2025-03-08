export const filterUsersResult = (data) => {
  let result = []
  result = data.map(user => {
    const userInfo = {email: user.email, role: user.role}  
    return userInfo
  })
  return result;
}