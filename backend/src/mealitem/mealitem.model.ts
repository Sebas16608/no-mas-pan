import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import Meal from "../meal/meal.model";
import Food from "../food/food.model";

class MealItem extends Model {
    declare id?: number;
    declare mealId: number;
    declare foodId: number;
    declare quantity: number;
    declare calories: number;
    declare protein: number;
    declare carbs: number;
    declare fats: number;
}

MealItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Meal,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Food,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    quantity: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fats: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
  sequelize,
  modelName: "MealItem",
  freezeTableName: true,
  hooks: {
    beforeCreate: async (item: MealItem, options) => {
        const food = await Food.findByPk(item.foodId);

        if (!food) throw new Error("Food not found");

        const factor = Number(item.quantity) / 100;
        item.calories = Math.round(Number(food.calories) * factor);
        item.protein = Math.round(Number(food.protein) * factor);
        item.carbs = Math.round(Number(food.carbs) * factor);
        item.fats = Math.round(Number(food.fats) * factor);
    },
    beforeUpdate: async (item: MealItem) => {
        if (item.changed("quantity") || item.changed("foodId")) {
            const food = await Food.findByPk(item.foodId);

            if (!food) throw new Error("Food not found");

            const factor = Number(item.quantity) / 100;
            item.calories = Math.round(Number(food.calories) * factor);
            item.protein = Math.round(Number(food.protein) * factor);
            item.carbs = Math.round(Number(food.carbs) * factor);
            item.fats = Math.round(Number(food.fats) * factor);
        }
    }
  }
});

export default MealItem;