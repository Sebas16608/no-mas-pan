import sequelize from "../config/database";
import { DataTypes, Model, SMALLINT } from "sequelize";
import bcrypt from "bcrypt";

export enum Objective {
  CUT = "CUT",
  BULK = "BULK",
  MAINTAIN = "MAINTAIN",
}

class User extends Model {
    declare id?: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare objective: string;
    declare weight: number;
    declare height: number;
    declare calories: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [6,100]
        }
    },
    objective: {
        type: DataTypes.ENUM(...Object.values(Objective)),
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    height: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    sequelize,
    modelName: "User",
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user: User) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user: User) => {
            if (user.changed("password")) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

export default User;