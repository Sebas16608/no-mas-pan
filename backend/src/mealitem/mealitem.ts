import sequelize from "../config/database";
import { DataTypes, Model } from "sequelize";
import Meal from "../meal/meal.model";
import Food from "../food/food.model";

class MealItem extends Model {
    declare id?: number;
    declare mealId: number;
    declare foodId: number;
    declare quantity: number;
    declare calories_calculated: number;
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
    calories_calculated: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
  sequelize,
  modelName: "MealItem",
  freezeTableName: true,
  hooks: {
    beforeCreate: async (item: MealItem, options) => {
        const food = await Food.findByPk(item.foodId);

        if (!food) throw new Error("Food not found");

        item.calories_calculated = Number(food.calories) * Number(item.quantity) / 100;
        item.calories_calculated = Number(food.protein) * Number(item.quantity) / 100;
        item.calories_calculated = Number(food.carbs) * Number(item.quantity) / 100;
        item.calories_calculated = Number(food.fats) * Number(item.quantity) / 100;
    },
    beforeUpdate: async (item: MealItem) => {
        if (item.changed("quantity") || item.changed("foodId")) {
            const food = await Food.findByPk(item.foodId);

            if (!food) throw new Error("Food not fuond");

            item.calories_calculated = Number(food.calories) * Number(item.quantity) / 100;
            item.calories_calculated = Number(food.protein) * Number(item.quantity) / 100;
            item.calories_calculated = Number(food.carbs) * Number(item.quantity) / 100;
            item.calories_calculated = Number(food.fats) * Number(item.quantity) / 100;
        }
    }
  }
});

export default MealItem;