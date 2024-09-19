1. Ejercicio de DAC (Discretionary Access Control):
   1. Crea un directorio llamado `proyectoSecreto` y un archivo dentro llamado `datos.txt`. Configura los permisos de manera que:
      - Solo el propietario pueda leer y escribir en el archivo.
      - El grupo del propietario pueda leer el archivo, pero no modificarlo.
      - Otros usuarios no tengan ningún permiso sobre el archivo.

   Muestra los permisos utilizando el comando ls -al.

   2. Indica cómo crear un usuario de nombre alexa, cómo crear un grupo de nombre proyecto, y cómo  asignar alexa y azureuser al grupo proyecto. Indica los pasos que habría que dar para probar que Alexa no puede acceder en escritura al fichero datos.

   Necesitarás hacer uso de los comandos `adduser`, `groupadd`, `usermod`, `chgrp` (o `chown`), `chmod`, `su`. Si no recuerdas cómo se usan, ayúdate de un LLM para recordarlo. Ejecuta los comandos en tu máquina de Azure. Obtén una captura de pantalla donde se vea los comandos ejecutados y las pruebas que has hecho para comprobar que el usuario Alexa puede leer pero no escribir en datos.txt.

2. Ejercicio de Auditoría:
   En la mayoría de los sistemas Linux, los intentos de inicio de sesión fallidos se registran por defecto en el archivo /var/log/auth.log
   Conéctate por ssh a tu máquina Azure. Como root, ejecuta este comando:

   `tail -f /var/log/auth.log`

   Abre otra terminal en tu ordenador local. Desde la nueva terminal abre otra sesión y conéctate de nuevo a tu máquina de Azure.
   1. ¿Qué hace el comando tail? ¿cuál es el efecto de la opción -f? (prueba a ejecutar tail sin y con la opción)

   2. Mantén el comando tail -f en ejecución. Pídele a tu compañero/a de clase que se intente conectar a tu máquina de Azure. La conexión debe ser denegada y en tu fichero auth.log debe aparecer una indicación de que el intento de conexión fue denegado. Copia y pega aquí el texto que se muestra en auth.log al denegar una conexión.

   3. Las máquinas públicas de Azure (y de cualquier otro proveedor de hosting) son atacadas sistemáticamente. A diario se suelen registrar intentos de conexión fallidos. 
      1. Sabiendo la respuesta de la pregunta 2.ii, ¿cuál sería el comando para conocer cuántos intentos de conexión fallidos ha habido contra tu máquina?
      2. ¿Cuál sería el comando para saber de qué direcciones IP se originaron los intentos?
      3. ¿Cuál es el usuario más frecuentemente atacado?

4. (Avanzado) Ejercicio de Autenticación Multifactor:
   Configura la autenticación de dos factores para el acceso SSH en tu sistema Linux. Utiliza Google Authenticator como segundo factor. Demuestra cómo funciona el proceso de inicio de sesión con 2FA:
   - usando docker
   - usando una máquina en Azure (NO uses la máquina de SGSSI, crea una nueva para este ejercicio)
   - Como evidencia de este ejercicio, indica cuál es la dirección IP de tu máquina en Azure con soporte 2FA
   - Indica cuál es el password a usar y el "emergency scratch code"

6. (Avanzado) Ejercicio de Gestión de Contraseñas:
   Configura una política de contraseñas en el sistema que cumpla con los siguientes requisitos:
   - Longitud mínima de 12 caracteres.
   - Debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial.
   - No puede contener el nombre de usuario.
   - Debe expirar cada 90 días.
   Utiliza el módulo PAM (Pluggable Authentication Modules) para implementar esta política.
