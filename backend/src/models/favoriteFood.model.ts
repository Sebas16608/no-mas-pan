import sequelize from "../config/database";
import User from "./user.model";
import Food from "./food.model";
import { DataTypes, Model } from "sequelize";

class FavoriteFood extends Model {
    declare id?: number;
    declare userId: number;
    declare foodId: number;
}

FavoriteFood.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }
},{
    sequelize,
    modelName: "FavoriteFood",
    freezeTableName: true,
    timestamps: true,
    indexes: [{
            unique: true,
            fields: ["userId", "foodId"]
        }
    ]
})