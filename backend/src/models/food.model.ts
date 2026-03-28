import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import User from "./user.model";

class Food extends Model{
    declare id?: number;
    declare name: string;
    declare calories: number;
    declare protein: number;
    declare carbs: number;
    declare fats: number;
    declare userId: number;
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
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    protein: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    carbs: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    fats: {
        type: DataTypes.DECIMAL(5, 2),
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
    freezeTableName: true
});

export default Food;