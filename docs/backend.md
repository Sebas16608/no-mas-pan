# Backend - No Más Pan

API REST para aplicación de seguimiento nutricional y control de peso.

## Stack Tecnológico

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **ORM**: Sequelize
- **Base de datos**: SQLite
- **Validación**: Zod
- **Autenticación**: bcrypt (hash) + JWT

## Estructura del Proyecto

```
backend/src/
├── app.ts                  # Configuración principal de Express
├── index.ts                # Punto de entrada, inicia servidor y sincroniza BD
├── association.ts          # Definición de relaciones entre modelos
├── config/
│   └── database.ts         # Configuración de Sequelize (SQLite)
├── food/
│   ├── food.controller.ts  # Controlador de alimentos
│   ├── food.model.ts       # Modelo de alimentos
│   ├── food.router.ts      # Rutas de alimentos
│   └── food.schema.ts      # Schema de validación Zod
├── meal/
│   ├── meal.controller.ts  # Controlador de comidas
│   ├── meal.model.ts       # Modelo de comida
│   ├── meal.router.ts      # Rutas de comidas
│   └── meal.schema.ts      # Schema de validación Zod
├── mealitem/
│   └── mealitem.model.ts   # Modelo de ítems de comida
├── user/
│   ├── controllers/
│   │   ├── login.controller.ts    # Controlador de login
│   │   └── register.controller.ts # Controlador de registro
│   ├── routers/
│   │   ├── login.router.ts        # Ruta de login
│   │   └── register.router.ts     # Ruta de registro
│   ├── user.controller.ts         # Controlador de usuario
│   ├── user.model.ts              # Modelo de usuario
│   ├── user.router.ts             # Rutas de usuario
│   └── user.schema.ts             # Schemas de validación Zod
├── progress/
│   └── progress.model.ts          # Modelo de progreso corporal
├── favoriteFood/
│   └── favoriteFood.model.ts      # Tabla pivote favoritos
├── middleware/
│   └── validation.ts              # Middleware de validación
├── types/                         # Definiciones de tipos TypeScript
└── utils/                         # Utilidades
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

## Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro de nuevo usuario |
| POST | `/auth/login` | Inicio de sesión |

### Alimentos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/food` | Listar todos los alimentos |
| GET | `/food/:id` | Obtener alimento por ID |
| POST | `/food` | Crear nuevo alimento |
| PATCH | `/food/:id` | Actualizar alimento |
| DELETE | `/food/:id` | Eliminar alimento |

### Comidas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/meal/:date` | Obtener comidas por fecha |
| POST | `/meal` | Crear nueva comida |
| DELETE | `/meal/:id` | Eliminar comida |

### Usuario

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/user` | Obtener perfil del usuario |
| PATCH | `/user` | Actualizar perfil |

## Validación con Zod

### RegisterSchema
```typescript
{
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(8),
    objective: z.enum(['CUT', 'BULK', 'MAINTAIN']),
    weight: z.number(),
    height: z.number()
}
```

### LoginSchema
```typescript
{
    email: z.email(),
    password: z.string().min(8)
}
```

### FoodSchema
```typescript
{
    name: z.string().min(5),
    calories: z.number().positive().min(3),
    protein: z.number().positive().min(3).optional(),
    carbs: z.number().positive().min(3).optional(),
    fats: z.number().positive().min(3).optional()
}
```

### MealSchema
```typescript
{
    type: z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']),
    date: z.date(),
    total_calories: z.number().min(3)
}
```

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

### Variables de Entorno
```
PORT=3000
DB_STORAGE=src/config/db.sqlite3
JWT_SECRET=your-secret-key
```

## Inicio del Servidor

```bash
cd backend
npm install
npm run dev
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
| 401 | Unauthorized - No autenticado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Scripts Disponibles

```bash
npm run dev      # Desarrollo con ts-node-dev
npm run build    # Compilar TypeScript
npm start        # Iniciar producción
npm run lint     # Verificar código con ESLint
npm run format   # Formatear código con Prettier
```

## Próximos Pasos

- [ ] Router/Controller para Progress
- [ ] Router/Controller para FavoriteFood
- [ ] Proteger rutas con middleware de autenticación
- [ ] Control de errores centralizado
- [ ] Tests unitarios