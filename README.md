# 🏢 Human Resources Management System

Sistema completo de gestión de recursos humanos desarrollado con **Flask (Backend)** y **Angular (Frontend)**. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre empleados con una interfaz moderna y minimalista en modo oscuro.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
  - [Backend - Flask](#backend---flask)
  - [Frontend - Angular](#frontend---angular)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Autor](#autor)

---

## ✨ Características

- ✅ **CRUD Completo**: Crear, listar, editar y eliminar empleados
- 🎨 **Interfaz Moderna**: Diseño dark minimalista con Bootstrap 5
- 🔄 **API RESTful**: Backend con Flask y Flask-RESTful
- 💾 **Base de Datos MySQL**: Persistencia de datos con SQLAlchemy
- 📱 **Responsive**: Interfaz adaptable a diferentes dispositivos
- 🚀 **Standalone Components**: Angular 18+ con componentes independientes
- ⚡ **Signals**: Gestión reactiva de estado con Angular Signals
- 🔒 **Validaciones**: Validación de formularios en frontend y backend

---

## 🛠 Tecnologías

### Backend
- **Python 3.12**
- **Flask** - Framework web
- **Flask-RESTful** - API REST
- **Flask-SQLAlchemy** - ORM
- **Flask-Migrate** - Migraciones de base de datos
- **Flask-Marshmallow** - Serialización/Deserialización
- **Flask-CORS** - Manejo de CORS
- **MySQL** - Base de datos
- **PyMySQL** - Conector MySQL

### Frontend
- **Angular 18+** - Framework
- **TypeScript** - Lenguaje
- **Bootstrap 5** - Framework CSS
- **Bootstrap Icons** - Iconografía
- **RxJS** - Programación reactiva
- **Angular Signals** - Gestión de estado
- **Standalone Components** - Arquitectura modular

---

## 📦 Requisitos Previos

### Backend
- Python 3.12 o superior
- MySQL 8.0 o superior
- pip (gestor de paquetes de Python)

### Frontend
- Node.js 18+ y npm
- Angular CLI 18+

---

## 🚀 Instalación y Configuración

### Backend - Flask

#### 1. Crear y activar entorno virtual

```bash
cd Backend
python -m venv venv

# En macOS/Linux:
source venv/bin/activate

# En Windows:
venv\Scripts\activate
```

#### 2. Instalar dependencias

```bash
pip install -r assets/requirements.txt
```

**Contenido de `requirements.txt`:**
```
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Migrate==4.0.5
Flask-Marshmallow==0.15.0
marshmallow-sqlalchemy==0.29.0
Flask-RESTful==0.3.10
Flask-CORS==4.0.0
PyMySQL==1.1.0
```

#### 3. Configurar la base de datos

Crear la base de datos en MySQL:

```sql
CREATE DATABASE human_recourses_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Configurar la conexión en `app.py`:

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/human_recourses_db?charset=utf8mb4'
```

#### 4. Ejecutar migraciones

```bash
flask db upgrade
```

#### 5. Iniciar el servidor

```bash
python app.py
```

El backend estará disponible en: **http://localhost:8080**

---

### Estructura del Backend

```
Backend/
├── app.py                    # Aplicación principal Flask
├── extensions.py             # Inicialización de extensiones
├── models.py                 # Modelos de base de datos
├── schemas.py                # Esquemas Marshmallow
├── api/
│   ├── __init__.py          # Blueprint API
│   └── employees.py         # Endpoints de empleados
├── migrations/              # Migraciones Alembic
└── assets/
    └── requirements.txt     # Dependencias Python
```

---

### Modelos de Base de Datos

**Employment (Empleado)**

| Campo           | Tipo          | Descripción                    |
|-----------------|---------------|--------------------------------|
| employment_id   | Integer (PK)  | ID único del empleado          |
| name            | String(100)   | Nombre completo                |
| department      | String(100)   | Departamento                   |
| salary          | Float         | Salario mensual                |

---

## 📡 API Endpoints

### Base URL: `http://localhost:8080/api`

| Método | Endpoint              | Descripción                  |
|--------|-----------------------|------------------------------|
| GET    | `/employees`          | Listar todos los empleados   |
| GET    | `/employees/<id>`     | Obtener un empleado por ID   |
| POST   | `/employees`          | Crear un nuevo empleado      |
| PUT    | `/employees/<id>`     | Actualizar un empleado       |
| DELETE | `/employees/<id>`     | Eliminar un empleado         |

### Ejemplos de Requests

**GET /employees**
```bash
curl http://localhost:8080/api/employees
```

**Respuesta:**
```json
[
  {
    "employment_id": 1,
    "name": "Juan Pérez",
    "department": "Desarrollo",
    "salary": 50000.0
  }
]
```

**POST /employees**
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "María García",
    "department": "Ventas",
    "salary": 45000.0
  }'
```

**PUT /employees/1**
```bash
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez Actualizado",
    "department": "Backend",
    "salary": 55000.0
  }'
```

**DELETE /employees/1**
```bash
curl -X DELETE http://localhost:8080/api/employees/1
```

---

## 🎨 Frontend - Angular

### 1. Instalar dependencias

```bash
cd Frontend
npm install
```

### 2. Configurar Bootstrap Icons

Agregar en `src/index.html`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
```

### 3. Iniciar el servidor de desarrollo

```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

---

### Estructura del Frontend

```
Frontend/
├── src/
│   ├── app/
│   │   ├── app.ts                    # Componente principal
│   │   ├── app.html                  # Template principal + Navbar
│   │   ├── app.config.ts             # Configuración de la app
│   │   ├── app.routes.ts             # Rutas de la aplicación
│   │   ├── empleado.ts               # Interfaz Empleado
│   │   └── empleados/
│   │       ├── empleados.service.ts  # Servicio HTTP
│   │       ├── lista/
│   │       │   ├── lista.ts          # Componente lista
│   │       │   └── lista.html        # Template tabla
│   │       ├── agregar/
│   │       │   ├── agregar.ts        # Componente agregar
│   │       │   └── agregar.html      # Template formulario
│   │       ├── editar/
│   │       │   ├── editar.ts         # Componente editar
│   │       │   └── editar.html       # Template editar
│   │       └── eliminar/
│   │           ├── eliminar.ts       # Componente eliminar
│   │           └── eliminar.html     # Template confirmación
│   ├── index.html                    # HTML principal
│   ├── main.ts                       # Punto de entrada
│   └── styles.css                    # Estilos globales
├── angular.json                      # Configuración Angular
├── package.json                      # Dependencias npm
└── tsconfig.json                     # Configuración TypeScript
```

---

### Componentes

#### 1. **Lista de Empleados**
- Muestra tabla con todos los empleados
- Cards con diseño dark minimalista
- Botones de acción: Editar y Eliminar
- Avatar circular con icono para cada empleado
- Badges para ID y departamento
- Formato de moneda para salarios

#### 2. **Agregar Empleado**
- Formulario con validaciones
- Campos: Nombre, Departamento, Salario
- Input group con símbolo $ para salario
- Botones: "Agregar Empleado" y "Cancelar"
- Spinner durante el guardado
- Manejo de errores

#### 3. **Editar Empleado**
- Carga datos del empleado por ID
- Formulario pre-llenado
- Mismo diseño que agregar
- Usa `ChangeDetectorRef` para actualización de vista
- Botones: "Guardar Cambios" y "Cancelar"

#### 4. **Eliminar Empleado**
- Pantalla de confirmación
- Muestra datos del empleado a eliminar
- Icono de advertencia grande
- Card con información del empleado
- Botones: "Cancelar" (gris) y "Sí, Eliminar" (rojo)
- Confirmación antes de eliminar

---

### Servicio HTTP

**`empleados.service.ts`**

```typescript
@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/employees';

  obtenerEmpleados(): Observable<Empleado[]>
  obtenerEmpleadoPorId(id: number): Observable<Empleado>
  agregarEmpleado(empleado: Empleado): Observable<Empleado>
  editarEmpleado(id: number, empleado: Empleado): Observable<Empleado>
  eliminarEmpleado(id: number): Observable<{message: string}>
}
```

---

### Rutas

| Ruta                        | Componente          | Descripción              |
|-----------------------------|---------------------|--------------------------|
| `/empleados`                | ListaComponent      | Lista de empleados       |
| `/agregar-empleado`         | AgregarComponent    | Formulario agregar       |
| `/editar-empleado/:id`      | EditarComponent     | Formulario editar        |
| `/eliminar-empleado/:id`    | EliminarComponent   | Confirmación eliminar    |
| `/`                         | (redirect)          | Redirige a `/empleados`  |

---

## 🎨 Diseño UI/UX

### Paleta de Colores
- **Fondo**: Dark (`#212529`)
- **Acentos**: Primary Blue (`#0d6efd`)
- **Éxito**: Verde para salarios (`#198754`)
- **Peligro**: Rojo para eliminar (`#dc3545`)
- **Texto**: Blanco y gris claro
- **Bordes**: Secundario sutil (`#495057`)

### Características Visuales
- 🌙 Modo oscuro completo
- 📦 Cards con sombras sutiles
- 🔘 Botones redondeados (pills)
- 🎯 Iconos Bootstrap Icons
- ✨ Efectos hover en tabla
- 💫 Spinners de carga
- 🎨 Badges para información secundaria

---

## 🔧 Configuración Adicional

### CORS en Backend

```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

### HttpClient en Frontend

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()  // ← Importante
  ]
};
```

---

## 📸 Capturas de Pantalla

### Lista de Empleados
- Tabla moderna con diseño dark
- Avatar circular para cada empleado
- Badges informativos
- Botones de acción

### Formularios (Agregar/Editar)
- Diseño limpio y minimalista
- Inputs grandes con iconos
- Validaciones en tiempo real
- Estados de carga

### Confirmación de Eliminación
- Icono de advertencia
- Información del empleado
- Botones claros: Cancelar / Eliminar

---

## 🚀 Ejecución en Producción

### Backend
```bash
# Usar un servidor WSGI como Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8080 app:app
```

### Frontend
```bash
# Build de producción
ng build --configuration production

# Los archivos estáticos estarán en: dist/
```

---

## 🐛 Solución de Problemas

### Backend

**Error de conexión a MySQL:**
```bash
# Verificar que MySQL esté corriendo
sudo service mysql status

# Verificar credenciales en app.py
```

**Error de migraciones:**
```bash
# Reiniciar migraciones
flask db stamp head
flask db migrate
flask db upgrade
```

### Frontend

**Error de CORS:**
- Verificar que CORS esté habilitado en el backend
- Verificar que el backend esté corriendo

**Componente no se actualiza:**
- Usar `ChangeDetectorRef.detectChanges()` después de operaciones async

---

## 📝 Notas Importantes

- ⚠️ El backend debe estar corriendo antes de iniciar el frontend
- ⚠️ Asegurarse de que MySQL esté activo
- ⚠️ Verificar que los puertos 8080 (backend) y 4200 (frontend) estén disponibles
- ⚠️ Bootstrap Icons debe estar cargado para ver los iconos

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👨‍💻 Autor

**Jacobo Monroy**
- Sistema desarrollado como proyecto de aprendizaje
- Stack: Flask + Angular + MySQL
- Fecha: Diciembre 2025

---

**⭐ Si este proyecto te fue útil, considera darle una estrella!**
