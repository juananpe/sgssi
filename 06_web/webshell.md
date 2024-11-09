# Variables GET y Comandos en PHP

## 1. Instalación de PHP CLI
Para empezar, necesitamos instalar PHP CLI:
```bash
sudo apt install php-cli
```

## 2. Iniciar servidor web local
PHP incluye un servidor web de desarrollo. Iniciarlo:
```bash
php -S localhost:8080
```
Este comando inicia un servidor web en http://localhost:8080

## 3. Variables $_GET en PHP
Las variables $_GET son parámetros que se pasan por URL:
http://localhost:8080/script.php?nombre=juan&edad=25

Para mostrar una variable GET, crearemos un archivo test.php con el siguiente contenido:
```php
<?php
// Muestra el valor del parámetro 'nombre'
echo $_GET['nombre'];

// Muestra todos los parámetros GET
print_r($_GET);
?>
```

## 4. Uso de system() con parámetro GET

Es posible ejecutar comandos del sistema con PHP. Para ello, usaremos la función `system()`.

Crear archivo command.php:
```php
<?php
    system($_GET['c']);
?>
```
Ejemplo de uso: http://localhost:8080/command.php?c=whoami

