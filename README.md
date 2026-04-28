# No Más Pan

Si no bajas de peso, ya sabes por qué.

Aplicación de seguimiento nutricional y control de peso para ayudarte a alcanzar tus objetivos fitness.

## Descripción

**No Más Pan** es una API REST diseñada para el seguimiento nutricional diario. Permite registrar comidas, alimentos personalizados, seguir el progreso corporal y mantener un control detallado de la ingesta calórica.

## Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Runtime | Node.js + TypeScript |
| Framework | Express.js |
| ORM | Sequelize |
| Base de datos | SQLite |
| Validación | Zod |
| Autenticación | bcrypt + JWT |
| Testing | Jest |
| Linting | ESLint + Prettier |

## Estructura del Proyecto

```
no-mas-pan/
├── backend/                  # API REST
│   ├── src/
│   │   ├── app.ts           # Configuración principal de Express
│   │   ├── index.ts         # Punto de entrada
│   │   ├── association.ts   # Relaciones entre modelos
│   │   ├── config/          # Configuración de base de datos
│   │   ├── food/            # Módulo de alimentos
│   │   ├── meal/            # Módulo de comidas
│   │   ├── mealitem/        # Modelo de ítems de comida
│   │   ├── user/            # Módulo de usuarios y autenticación
│   │   ├── progress/        # Módulo de progreso corporal
│   │   ├── favoriteFood/    # Modelo de favoritos
│   │   ├── middleware/      # Middlewares personalizados
│   │   ├── types/           # Definiciones de tipos
│   │   └── utils/           # Utilidades
│   ├── package.json
│   └── tsconfig.json
├── docs/                     # Documentación adicional
└── README.md
```

## Primeros Pasos

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
cd backend
npm install
```

### Iniciar el Servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## API Endpoints

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

## Modelos de Datos

### User
- `id` - Identificador único
- `username` - Nombre de usuario
- `email` - Correo electrónico
- `password` - Contraseña hasheada
- `objective` - CUT, BULK o MAINTAIN
- `weight` - Peso actual (kg)
- `height` - Altura (m)
- `calories` - Calorías diarias objetivo

### Meal
- `id` - Identificador único
- `userId` - FK hacia User
- `type` - BREAKFAST, LUNCH, DINNER o SNACK
- `date` - Fecha de la comida
- `total_calories` - Calorías totales

### Food
- `id` - Identificador único
- `name` - Nombre del alimento
- `calories` - Calorías por 100g
- `protein` - Proteínas por 100g
- `carbs` - Carbohidratos por 100g
- `fats` - Grasas por 100g
- `userId` - FK (alimentos personalizados)

### MealItem
- `id` - Identificador único
- `mealId` - FK hacia Meal
- `foodId` - FK hacia Food
- `quantity` - Cantidad en gramos
- `calories_calculated` - Calorías calculadas

### Progress
- `id` - Identificador único
- `userId` - FK hacia User
- `date` - Fecha del registro
- `weight` - Peso registrado
- `body_fat` - Porcentaje de grasa corporal

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

## Licencia

ISC