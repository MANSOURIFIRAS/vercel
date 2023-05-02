class User {
  constructor({ firstName,lastName, email,password,isBlocked,role,pic }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isBlocked = isBlocked;
    this.role = role;
    this.pic = pic;
  }
}

module.exports = User;
