# Backend - No Más Pan

API REST para aplicación de seguimiento nutricional y control de peso.

## Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Sequelize
- **Base de datos**: SQLite
- **Autenticación**: bcrypt (hash de contraseñas)

## Estructura del Proyecto

```
backend/src/
├── app.ts              # Configuración principal de Express
├── index.ts            # Punto de entrada, inicia servidor y sincroniza BD
├── association.ts      # Definición de relaciones entre modelos
├── config/
│   └── database.ts     # Configuración de Sequelize (SQLite)
├── middleware/
│   └── validation.ts   # Middleware de validación (pendiente)
├── meal/
│   ├── meal.controller.ts  # Controlador de comidas
│   └── meal.model.ts      # Modelo de comida
├── mealitem/
│   └── mealitem.model.ts  # Modelo de ítems de comida
├── food/
│   ├── food.controller.ts # Controlador de alimentos
│   └── food.model.ts      # Modelo de alimentos
├── user/
│   └── user.model.ts      # Modelo de usuario
├── progress/
│   └── progress.model.ts  # Modelo de progreso corporal
├── favoriteFood/
│   └── favoriteFood.model.ts # Tabla pivote favoritos
└── types/                # Definiciones de tipos TypeScript
```

## Modelos

### User

Usuario de la aplicación con datos corporales y objetivos.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| username | STRING(100) | Nombre de usuario |
| email | STRING | Correo electrónico |
| password | STRING(100) | Contraseña hasheada |
| objective | ENUM | CUT, BULK, MAINTAIN |
| weight | DECIMAL | Peso actual (kg) |
| height | DECIMAL | Altura (m) |
| calories | INTEGER | Calorías diarias objetivo |

**Hooks**: Las contraseñas se hashean automáticamente antes de crear/actualizar.

---

### Meal

Registro de una comida del día.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| userId | INTEGER | FK hacia User |
| type | ENUM | BREAKFAST, LUNCH, DINNER, SNACK |
| date | DATEONLY | Fecha de la comida |
| total_calories | INTEGER | Calorías totales calculadas |

**Índice único**: (userId, date, type) - Un tipo de comida por día por usuario.

---

### Food

Alimento con información nutricional.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| name | STRING(255) | Nombre del alimento |
| calories | DECIMAL | Calorías por 100g |
| protein | DECIMAL | Proteínas por 100g |
| carbs | DECIMAL | Carbohidratos por 100g |
| fats | DECIMAL | Grasas por 100g |
| userId | INTEGER | FK hacia User (alimentos personalizados) |

---

### MealItem

Ítem individual dentro de una comida.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| mealId | INTEGER | FK hacia Meal |
| foodId | INTEGER | FK hacia Food |
| quantity | DECIMAL | Cantidad en gramos |
| calories_calculated | INTEGER | Calorías calculadas según cantidad |

**Hooks**: Calcula automáticamente valores nutricionales según cantidad.

---

### Progress

Registro de progreso corporal.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| userId | INTEGER | FK hacia User |
| date | DATEONLY | Fecha del registro |
| weight | DECIMAL | Peso registrado (nullable) |
| body_fat | DECIMAL | Porcentaje grasa corporal (0-100, nullable) |

**Índice único**: (userId, date) - Un registro por día por usuario.

---

### FavoriteFood

Tabla pivote para relación muchos a muchos User-Food.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | Identificador único (PK) |
| userId | INTEGER | FK hacia User |
| foodId | INTEGER | FK hacia Food |

**Índice único**: (userId, foodId) - Evita duplicados.

## Relaciones

```
User 1───< Meal (hasMany/belongsTo)
User 1───< Food (hasMany/belongsTo)
User 1───< Progress (hasMany/belongsTo)
User <──> Food (belongsToMany, a través de FavoriteFood)

Meal 1───< MealItem (hasMany/belongsTo)
Food 1───< MealItem (hasMany/belongsTo)
```

## Controladores

### MealController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| getByDate | GET /meal/:date | Obtiene comidas por fecha |
| post | POST /meal | Crea una nueva comida |
| delete | DELETE /meal/:id | Elimina una comida |

### FoodController

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| getAllFood | GET /food | Obtiene todos los alimentos |
| post | POST /food | Crea un nuevo alimento |
| put | PUT /food/:id | Actualiza un alimento |
| delete | DELETE /food/:id | Elimina un alimento |

## Middleware

### validation.ts
Middleware de validación (en desarrollo).

## Configuración

### Base de datos
- **Motor**: SQLite
- **Archivo**: `backend/src/config/db.sqlite3`
- **Sincronización**: `alter: true` (actualiza esquema automáticamente)

### Express
- **Puerto**: 3000
- **CORS**: Habilitado
- **JSON**: Habilitado
- **Logging**: Morgan (dev)

## Inicio del Servidor

```bash
cd backend
npm start
```

El servidor:
1. Autentica conexión a BD
2. Sincroniza modelos con BD
3. Escucha en `http://localhost:3000`

## Estados HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminación exitosa |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Próximos Pasos

- [ ] Implementar rutas (routes) para controladores
- [ ] Agregar autenticación JWT
- [ ] Completar middleware de validación
- [ ] Agregar endpoints para Progress y FavoriteFood
- [ ] Implementar control de errores centralizado
- [ ] Agregar tests unitarios
