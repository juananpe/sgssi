1. Ejercicio de DAC (Discretionary Access Control):
1.1   Crea un directorio llamado "proyectoSecreto" y un archivo dentro llamado "datos.txt". Configura los permisos de manera que:
   - Solo el propietario pueda leer y escribir en el archivo.
   - El grupo del propietario pueda leer el archivo, pero no modificarlo.
   - Otros usuarios no tengan ningún permiso sobre el archivo.
   Demuestra los permisos utilizando el comando ls -l.

1.2 Indica cómo crear un usuario de nombre alexa, cómo crear un grupo de nombre proyecto, y cómo  asignar alexa y azureuser al grupo proyecto. Indica los pasos que habría que dar para probar que Alexa no puede acceder en escritura al fichero datos.

   Necesitarás hacer uso de los comandos `adduser`, `groupadd`, `usermod`, `chgrp` (o `chown`), `chmod`, `su`. Si no recuerdas cómo se usan, ayúdate de un LLM para recordarlo. Ejecuta los comandos en tu máquina de Azure. Obtén una captura de pantalla donde se vea los comandos ejecutados y las pruebas que has hecho para comprobar que el usuario Alexa puede leer pero no escribir en datos.txt.

2. Ejercicio de Auditoría:
   Configura el sistema para que registre todos los intentos de inicio de sesión fallidos. Crea un script que analice el log de autenticación y genere un informe con:
   - Número total de intentos fallidos.
   - Direcciones IP desde las que se originaron los intentos.
   - Usuarios más frecuentemente atacados.

3. (Avanzado) Ejercicio de Autenticación Multifactor:
   Configura la autenticación de dos factores para el acceso SSH en tu sistema Linux. Utiliza Google Authenticator como segundo factor. Demuestra cómo funciona el proceso de inicio de sesión con 2FA.

4. (Avanzado) Ejercicio de Gestión de Contraseñas:
   Configura una política de contraseñas en el sistema que cumpla con los siguientes requisitos:
   - Longitud mínima de 12 caracteres.
   - Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.
   - No puede contener el nombre de usuario.
   - Debe expirar cada 90 días.
   Utiliza el módulo PAM (Pluggable Authentication Modules) para implementar esta política.
