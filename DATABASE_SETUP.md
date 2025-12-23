# 🗄️ Configuración de Base de Datos con DBeaver

Esta guía te ayudará a configurar la base de datos MySQL para el sistema de Recursos Humanos utilizando **DBeaver**, una herramienta de administración de bases de datos gratuita y multiplataforma.

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación de DBeaver](#instalación-de-dbeaver)
3. [Instalación de MySQL](#instalación-de-mysql)
4. [Conectar DBeaver a MySQL](#conectar-dbeaver-a-mysql)
5. [Crear la Base de Datos](#crear-la-base-de-datos)
6. [Crear la Tabla de Empleados](#crear-la-tabla-de-empleados)
7. [Insertar Datos de Prueba](#insertar-datos-de-prueba)
8. [Verificación](#verificación)
9. [Solución de Problemas](#solución-de-problemas)

---

## 📦 Requisitos Previos

- **MySQL Server 8.0+** instalado y corriendo
- **DBeaver Community Edition** (gratuito)
- Acceso a las credenciales de MySQL (usuario root por defecto)

---

## 🔽 Instalación de DBeaver

### macOS

**Opción 1: Homebrew**
```bash
brew install --cask dbeaver-community
```

**Opción 2: Descarga directa**
1. Visita: https://dbeaver.io/download/
2. Descarga la versión para macOS
3. Abre el archivo `.dmg` y arrastra DBeaver a Aplicaciones
4. Abre DBeaver desde el Launchpad

### Windows

1. Visita: https://dbeaver.io/download/
2. Descarga el instalador para Windows (`.exe`)
3. Ejecuta el instalador y sigue las instrucciones
4. Inicia DBeaver desde el menú de inicio

### Linux

**Ubuntu/Debian:**
```bash
wget -O - https://dbeaver.io/debs/dbeaver.gpg.key | sudo apt-key add -
echo "deb https://dbeaver.io/debs/dbeaver-ce /" | sudo tee /etc/apt/sources.list.d/dbeaver.list
sudo apt update
sudo apt install dbeaver-ce
```

**Fedora:**
```bash
sudo dnf install dbeaver-ce
```

---

## 🐬 Instalación de MySQL

### macOS

```bash
# Con Homebrew
brew install mysql

# Iniciar MySQL
brew services start mysql

# Ejecutar script de seguridad
mysql_secure_installation
```

### Windows

1. Descarga MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador
3. Selecciona "MySQL Server" y "MySQL Workbench"
4. Configura la contraseña para el usuario `root`
5. Completa la instalación

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install mysql-server

# Iniciar MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Configurar seguridad
sudo mysql_secure_installation
```

---

## 🔌 Conectar DBeaver a MySQL

### Paso 1: Abrir DBeaver

Inicia DBeaver desde tu menú de aplicaciones.

### Paso 2: Crear Nueva Conexión

1. Click en el icono de **"Nueva conexión"** (🔌) en la barra de herramientas
   - O usa el menú: `Database` → `New Database Connection`
   - O usa el atajo: `Ctrl/Cmd + N`

2. En la ventana "Conectar a una base de datos":
   - Busca y selecciona **"MySQL"**
   - Click en **"Siguiente"**

### Paso 3: Configurar la Conexión

En la pestaña **"Main"**, ingresa los siguientes datos:

| Campo              | Valor                          |
|--------------------|--------------------------------|
| **Server Host**    | `localhost`                    |
| **Port**           | `3306` (puerto por defecto)    |
| **Database**       | _Dejar vacío por ahora_        |
| **Username**       | `root`                         |
| **Password**       | _Tu contraseña de MySQL_       |

![Configuración de conexión](https://docs.dbeaver.io/images/database-connection-dialog.png)

### Paso 4: Descargar Driver (Primera vez)

Si es la primera vez que usas DBeaver con MySQL:

1. DBeaver te preguntará si deseas descargar el driver
2. Click en **"Download"**
3. Espera a que se complete la descarga

### Paso 5: Probar Conexión

1. Click en **"Test Connection"**
2. Deberías ver un mensaje: ✅ **"Connected"**
3. Si hay error, verifica:
   - Que MySQL esté corriendo
   - Usuario y contraseña correctos
   - Puerto 3306 disponible

### Paso 6: Finalizar

1. Click en **"Finish"**
2. La conexión aparecerá en el panel izquierdo **"Database Navigator"**

---

## 🎯 Crear la Base de Datos

### Método 1: SQL Editor (Recomendado)

1. **Expandir la conexión MySQL** en el panel izquierdo
2. **Click derecho** en la conexión → **"SQL Editor"** → **"New SQL Script"**
3. **Escribir el siguiente comando:**

```sql
-- Crear la base de datos
CREATE DATABASE human_recourses_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

4. **Ejecutar** el comando:
   - Selecciona el texto
   - Click en el botón ▶️ **"Execute SQL Statement"**
   - O usa el atajo: `Ctrl/Cmd + Enter`

5. **Verificar** que se creó correctamente:
   - Deberías ver el mensaje: `Query executed successfully`
   - En el panel izquierdo, click derecho en **"Databases"** → **"Refresh"**
   - Deberías ver `human_recourses_db` en la lista

### Método 2: Interfaz Gráfica

1. Click derecho en **"Databases"** (en el panel izquierdo)
2. Selecciona **"Create New Database"**
3. En el formulario:
   - **Database name:** `human_recourses_db`
   - **Charset:** `utf8mb4`
   - **Collation:** `utf8mb4_unicode_ci`
4. Click en **"OK"**

---

## 📋 Crear la Tabla de Empleados

### Paso 1: Seleccionar la Base de Datos

1. Expandir `human_recourses_db` en el panel izquierdo
2. Click derecho en la carpeta **"Tables"**
3. Selecciona **"Create New Table"**

### Paso 2: Opción A - Interfaz Gráfica

En la ventana de creación de tabla:

**Pestaña "General":**
- **Table name:** `employment`

**Pestaña "Columns":**

Agregar las siguientes columnas (botón **"Add Column"** para cada una):

| Column Name    | Data Type       | Not Null | Auto Increment | Default | Descripción          |
|----------------|-----------------|----------|----------------|---------|----------------------|
| employment_id  | INT             | ✅       | ✅             | -       | ID único (PK)        |
| name           | VARCHAR(100)    | ✅       | ❌             | -       | Nombre del empleado  |
| department     | VARCHAR(100)    | ✅       | ❌             | -       | Departamento         |
| salary         | DECIMAL(10,2)   | ✅       | ❌             | -       | Salario mensual      |

**Pestaña "Primary Key":**
1. Click en **"Add"**
2. Selecciona `employment_id`
3. Click en **"OK"**

**Finalizar:**
- Click en **"Save"** o **"Persist"**
- La tabla se creará automáticamente

### Paso 3: Opción B - SQL Script (Más rápido)

1. Click derecho en `human_recourses_db` → **"SQL Editor"** → **"New SQL Script"**
2. Pega el siguiente código:

```sql
-- Usar la base de datos
USE human_recourses_db;

-- Crear la tabla de empleados
CREATE TABLE employment (
    employment_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    INDEX idx_department (department)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

3. Ejecuta el script: `Ctrl/Cmd + Enter`
4. Refresca la carpeta "Tables": Click derecho → **"Refresh"**

---

## 📊 Insertar Datos de Prueba

Para probar el sistema, vamos a insertar algunos empleados de ejemplo.

### Paso 1: Abrir SQL Editor

1. Click derecho en la tabla `employment`
2. Selecciona **"View Table"** (para ver la estructura)
3. O abre un nuevo **SQL Editor**

### Paso 2: Insertar Datos

Ejecuta el siguiente script SQL:

```sql
-- Insertar empleados de ejemplo
INSERT INTO employment (name, department, salary) VALUES
('Juan Pérez García', 'Desarrollo', 55000.00),
('María González López', 'Recursos Humanos', 48000.00),
('Carlos Rodríguez Martínez', 'Ventas', 45000.00),
('Ana Fernández Sánchez', 'Marketing', 52000.00),
('Luis Martínez Díaz', 'Desarrollo', 58000.00),
('Laura Sánchez Ruiz', 'Finanzas', 60000.00),
('Pedro López Jiménez', 'Operaciones', 47000.00),
('Carmen Díaz Moreno', 'Desarrollo', 56000.00),
('José García Álvarez', 'Ventas', 43000.00),
('Isabel Jiménez Romero', 'Recursos Humanos', 49000.00);
```

### Paso 3: Verificar Inserción

Ejecuta este query para ver los datos:

```sql
SELECT * FROM employment ORDER BY employment_id;
```

Deberías ver una tabla con 10 empleados.

---

## ✅ Verificación

### 1. Ver Estructura de la Tabla

```sql
DESCRIBE employment;
```

**Resultado esperado:**
```
+---------------+---------------+------+-----+---------+----------------+
| Field         | Type          | Null | Key | Default | Extra          |
+---------------+---------------+------+-----+---------+----------------+
| employment_id | int           | NO   | PRI | NULL    | auto_increment |
| name          | varchar(100)  | NO   |     | NULL    |                |
| department    | varchar(100)  | NO   | MUL | NULL    |                |
| salary        | decimal(10,2) | NO   |     | NULL    |                |
+---------------+---------------+------+-----+---------+----------------+
```

### 2. Contar Registros

```sql
SELECT COUNT(*) as total_empleados FROM employment;
```

**Resultado esperado:** `total_empleados: 10`

### 3. Agrupar por Departamento

```sql
SELECT 
    department, 
    COUNT(*) as empleados,
    AVG(salary) as salario_promedio
FROM employment 
GROUP BY department 
ORDER BY empleados DESC;
```

### 4. Empleado con Mayor Salario

```sql
SELECT name, department, salary 
FROM employment 
ORDER BY salary DESC 
LIMIT 1;
```

---

## 🎨 Características Útiles de DBeaver

### Ver Datos de la Tabla (Interfaz Gráfica)

1. **Navegador de Base de Datos:**
   - Expandir `human_recourses_db` → `Tables`
   - Click derecho en `employment` → **"View Data"**

2. **Editar Datos Directamente:**
   - En la vista de datos, puedes editar celdas haciendo doble click
   - Los cambios se guardan con `Ctrl/Cmd + S`

### Exportar Datos

1. Click derecho en la tabla `employment`
2. Selecciona **"Export Data"**
3. Elige el formato: CSV, JSON, SQL, Excel, etc.
4. Configura las opciones y exporta

### Generar Diagrama ER

1. Click derecho en `human_recourses_db`
2. Selecciona **"View Diagram"** o **"ER Diagram"**
3. DBeaver generará un diagrama visual de la base de datos

### Ejecutar Scripts desde Archivo

1. Menú: `File` → `Open File`
2. Selecciona un archivo `.sql`
3. Ejecuta el script completo: Icono ▶️ o `Alt/Option + X`

---

## 🐛 Solución de Problemas

### ❌ Error: "Access denied for user 'root'@'localhost'"

**Solución 1: Verificar contraseña**
```bash
mysql -u root -p
# Ingresa tu contraseña
```

**Solución 2: Resetear contraseña de root**
```bash
# Detener MySQL
brew services stop mysql  # macOS
sudo systemctl stop mysql # Linux

# Iniciar en modo seguro
sudo mysqld_safe --skip-grant-tables &

# Conectar y cambiar contraseña
mysql -u root
```

```sql
USE mysql;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'tu_nueva_contraseña';
FLUSH PRIVILEGES;
EXIT;
```

### ❌ Error: "Can't connect to MySQL server on 'localhost'"

**Verificar que MySQL esté corriendo:**

**macOS:**
```bash
brew services list
brew services start mysql
```

**Linux:**
```bash
sudo systemctl status mysql
sudo systemctl start mysql
```

**Windows:**
- Abrir "Servicios" (services.msc)
- Buscar "MySQL80"
- Click derecho → "Iniciar"

### ❌ Error: "Communications link failure"

1. Verificar puerto 3306:
```bash
lsof -i :3306  # macOS/Linux
netstat -an | grep 3306  # Windows
```

2. En DBeaver, verificar:
   - Host: `localhost` o `127.0.0.1`
   - Port: `3306`

### ❌ DBeaver no encuentra el driver de MySQL

1. Menú: `Database` → `Driver Manager`
2. Buscar **MySQL**
3. Click en **"Download/Update"**
4. Reiniciar DBeaver

### ❌ Error: "Database 'human_recourses_db' doesn't exist"

Ejecutar nuevamente el script de creación:
```sql
CREATE DATABASE IF NOT EXISTS human_recourses_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
```

---

## 🔧 Configuración Avanzada

### Crear Usuario Específico para la App

Por seguridad, es recomendable crear un usuario específico en lugar de usar `root`:

```sql
-- Crear usuario
CREATE USER 'hrapp_user'@'localhost' IDENTIFIED BY 'contraseña_segura';

-- Dar permisos solo a la base de datos específica
GRANT ALL PRIVILEGES ON human_recourses_db.* TO 'hrapp_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;
```

Luego actualizar `app.py`:
```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://hrapp_user:contraseña_segura@localhost/human_recourses_db?charset=utf8mb4'
```

### Backup de la Base de Datos

**Desde DBeaver:**
1. Click derecho en `human_recourses_db`
2. **"Tools"** → **"Backup"** → **"MySQL Dump"**
3. Seleccionar ubicación del archivo
4. Click en **"Start"**

**Desde Terminal:**
```bash
mysqldump -u root -p human_recourses_db > backup.sql
```

**Restaurar backup:**
```bash
mysql -u root -p human_recourses_db < backup.sql
```

---

## 📚 Recursos Adicionales

- **Documentación DBeaver:** https://dbeaver.io/docs/
- **Documentación MySQL:** https://dev.mysql.com/doc/
- **Tutorial DBeaver (Video):** https://www.youtube.com/dbeaver
- **MySQL Cheat Sheet:** https://devhints.io/mysql

---

## 🎓 Próximos Pasos

Una vez completada la configuración:

1. ✅ Verificar que la base de datos esté creada
2. ✅ Verificar que la tabla `employment` exista
3. ✅ Verificar que haya datos de prueba
4. 🚀 Continuar con la configuración del Backend (Flask)
5. 🚀 Ejecutar las migraciones de Flask-Migrate
6. 🚀 Iniciar el servidor Flask
7. 🚀 Configurar el Frontend (Angular)

Regresa al [README.md principal](./README.md) para continuar con la instalación del proyecto.

---

## 💡 Consejos Finales

- 🔐 **Seguridad:** Usa contraseñas fuertes para MySQL
- 💾 **Backups:** Realiza backups regulares de tu base de datos
- 🧹 **Limpieza:** Usa `DELETE FROM employment` para limpiar datos de prueba
- 📊 **Monitoreo:** DBeaver permite ver estadísticas de rendimiento
- 🎨 **Temas:** DBeaver soporta temas oscuros: `Window` → `Preferences` → `Appearance`

---

**¡Listo! Tu base de datos está configurada y lista para usar con el sistema de Recursos Humanos. 🎉**
