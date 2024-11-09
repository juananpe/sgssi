# Fuzzing Web con ffuf

FFUF (Fuzz Faster U Fool) es una herramienta de fuzzing web escrita en Go que permite descubrir contenido y realizar pruebas de seguridad en aplicaciones web.

## Instalación y recursos
- Herramienta: https://github.com/ffuf/ffuf
- Listas de palabras: https://github.com/danielmiessler/SecLists/tree/master/Discovery/Web-Content

## Uso básico
El comando básico para realizar fuzzing de directorios es:
```bash
ffuf -w /tmp/big.txt -u http://localhost:8888/FUZZ
```

Donde:
- `-w /tmp/big.txt`: Especifica el archivo wordlist a utilizar
- `-u`: Define la URL objetivo
- `FUZZ`: Es el marcador que será reemplazado con cada palabra de la lista

## Opciones útiles
- `-mc 200,301,302`: Filtrar por códigos de respuesta específicos
- `-fc 404`: Excluir códigos de respuesta
- `-t 50`: Configurar número de hilos concurrentes
- `-o salida.json`: Guardar resultados en un archivo
- `-H "Header: valor"`: Agregar headers personalizados

# Ejemplo práctico: Fuzzing de directorios en Photoblog

Veamos un ejemplo real de fuzzing sobre una instalación local de Photoblog (corriendo en localhost:8888). Usaremos el siguiente comando básico:

```bash
ffuf -w /tmp/big.txt -u http://localhost:8888/FUZZ
```

La ejecución nos muestra información valiosa sobre la estructura del proyecto:

## Directorios principales detectados
- `/admin`, `/Admin`, `/ADMIN`: Panel de administración (con distintas variantes de mayúsculas/minúsculas)
- `/images` e `/Images`: Almacenamiento de imágenes
- `/css`: Hojas de estilo
- `/classes`: Probablemente contiene el código PHP del proyecto

## Archivos de configuración
Se detectaron algunos archivos sensibles (aunque protegidos con 403):
- `.htaccess`: Configuración de Apache
- `.htpasswd`: Archivo de contraseñas
- `server-status`: Estado del servidor Apache

## Aspectos de seguridad a considerar
1. El panel de administración es fácilmente descubrible
2. Existen archivos de configuración visibles (aunque protegidos)
3. La estructura de directorios revela el uso de PHP (directorio `/classes`)
4. El servidor responde de manera consistente con códigos 301 para directorios existentes

