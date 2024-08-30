1. Ejercicio de DAC (Discrecional Access Control):
   Crea un directorio llamado "proyectoSecreto" y un archivo dentro llamado "datos.txt". Configura los permisos de manera que:
   - Solo el propietario pueda leer y escribir en el archivo.
   - El grupo del propietario pueda leer el archivo, pero no modificarlo.
   - Otros usuarios no tengan ningún permiso sobre el archivo.
   Demuestra los permisos utilizando el comando ls -l.

2. Ejercicio de Gestión de Contraseñas:
   Configura una política de contraseñas en el sistema que cumpla con los siguientes requisitos:
   - Longitud mínima de 12 caracteres.
   - Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.
   - No puede contener el nombre de usuario.
   - Debe expirar cada 90 días.
   Utiliza el módulo PAM (Pluggable Authentication Modules) para implementar esta política.

3. Ejercicio de Auditoría:
   Configura el sistema para que registre todos los intentos de inicio de sesión fallidos. Crea un script que analice el log de autenticación y genere un informe con:
   - Número total de intentos fallidos.
   - Direcciones IP desde las que se originaron los intentos.
   - Usuarios más frecuentemente atacados.

4. Ejercicio de Separación de Funciones:
   Crea un escenario donde haya tres roles: "finanzas", "recursos humanos" y "TI". Configura el sistema de manera que:
   - El rol "finanzas" solo pueda acceder a archivos en /home/finanzas.
   - El rol "recursos humanos" solo pueda acceder a archivos en /home/rrhh.
   - El rol "TI" pueda acceder a ambos directorios, pero no pueda modificar los archivos.
   Implementa esta configuración utilizando grupos y permisos de archivos.

5. (Avanzado) Ejercicio de Autenticación Multifactor:
   Configura la autenticación de dos factores para el acceso SSH en tu sistema Linux. Utiliza Google Authenticator como segundo factor. Demuestra cómo funciona el proceso de inicio de sesión con 2FA.