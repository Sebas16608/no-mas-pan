import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import User from "../user/user.model";

export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
  SNACK = "SNACK",
}

class Meal extends Model {
    declare id?: number;
    declare userId: number;
    declare type: MealType;
    declare date: string;
    declare total_calories: number;
}

Meal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    type: {
        type: DataTypes.ENUM(...Object.values(MealType)),
        allowNull: false,
        defaultValue: MealType.BREAKFAST,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    total_calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
},
{
    sequelize,
    modelName: "Meal",
    freezeTableName: true,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["userId", "date", "type"]
        }
    ]
});

export default Meal;