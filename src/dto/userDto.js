export default class userDto {
    constructor(user) {
        this.fullname = `${user.firstname} ${user.lastName}`;
        this.email = user.email
        this.age =user.age
    }
}