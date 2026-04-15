import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "../user/user.model";
import { tr } from "zod/locales";

class Food extends Model{
    declare id?: number;
    declare name: string;
    declare calories: number;
    declare protein?: number;
    declare carbs?: number;
    declare fats?: number;
    declare userId?: number;
}

Food.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [1, 255]
        }
    },
    calories: {
        type: DataTypes.INTEGER(),
        allowNull: false,
    },
    protein: {
        type: DataTypes.INTEGER(),
        allowNull: true
    },
    carbs: {
        type: DataTypes.INTEGER(),
        allowNull: true
    },
    fats: {
        type: DataTypes.INTEGER(),
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
}, {
    sequelize,
    modelName: "Food",
    freezeTableName: true,
    timestamps: true,
});

export default Food;