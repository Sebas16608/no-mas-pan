import User from "./user/user.model";
import Food from "./food/food.model";
import Meal from "./meal/meal.model";
import MealItem from "./mealitem/mealitem";
import Progress from "./progress/progress.model";
import FavoriteFood from "./favoriteFood/favoriteFood.model";

// 🔹 User ↔ Meal
User.hasMany(Meal, { foreignKey: "userId", as: "meals" });
Meal.belongsTo(User, { foreignKey: "userId", as: "user" });

// 🔹 User ↔ Food (custom foods)
User.hasMany(Food, { foreignKey: "userId", as: "foods" });
Food.belongsTo(User, { foreignKey: "userId", as: "user" });

// 🔹 Meal ↔ MealItem
Meal.hasMany(MealItem, { foreignKey: "mealId", as: "items" });
MealItem.belongsTo(Meal, { foreignKey: "mealId", as: "meal" });

// 🔹 Food ↔ MealItem
Food.hasMany(MealItem, { foreignKey: "foodId", as: "mealItems" });
MealItem.belongsTo(Food, { foreignKey: "foodId", as: "food" });

// 🔹 User ↔ Progress
User.hasMany(Progress, { foreignKey: "userId", as: "progress" });
Progress.belongsTo(User, { foreignKey: "userId", as: "user" });

// 🔹 User ↔ Food (favorites - many to many)
User.belongsToMany(Food, {
  through: FavoriteFood,
  foreignKey: "userId",
  as: "favoriteFoods"
});

Food.belongsToMany(User, {
  through: FavoriteFood,
  foreignKey: "foodId",
  as: "usersWhoFavorited"
});