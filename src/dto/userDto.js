export default class userDto {
    constructor(user) {
        this.fullname = `${user.name} ${user.lastName}`;
        this.email = user.email
        }
}