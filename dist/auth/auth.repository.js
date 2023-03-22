"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
class AuthRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async signUp(createUserDTO) {
        const { username, password } = createUserDTO;
        const user = new user_entity_1.User();
        user.username = username;
        user.password = password;
        await user.save();
        return user;
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map