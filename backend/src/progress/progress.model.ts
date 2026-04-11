import sequelize from "../config/database";
import User from "../user/user.model";
import { DataTypes, Model } from "sequelize";

class Progress extends Model {
    declare id?: number;
    declare userId: number;
    declare date: Date;
    declare weight: number | null;
    declare body_fat: number | null;
}

Progress.init({
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
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    weight: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    body_fat: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
            min: 0,
            max: 100
        }
    },
},{
    sequelize,
    modelName: "Progress",
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ["userId", "date"]
        }
    ]
})

export default Progress;