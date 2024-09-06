**Control de Acceso**

* Definición y objetivos: Control de acceso como mecanismo para garantizar que solo usuarios autorizados tengan acceso a recursos y sistemas.

* Principio de Menor Privilegio: Asegurar que los usuarios tengan solo los derechos necesarios para realizar sus tareas.
   
* Separación de Funciones: Dividir las tareas críticas entre diferentes usuarios para minimizar riesgos.

Algunos ejemplos de la separación de funciones en la seguridad informática incluyen:

1. **Administración de cuentas**: Un usuario puede crear cuentas de usuario, pero otro usuario debe autorizar y activarlas.
2. **Gestión de accesos**: Un usuario puede configurar accesos a la red, pero otro usuario debe autorizar y aprobar los cambios.
3. **Actualizaciones de software**: Un usuario puede descargar actualizaciones de software, pero otro usuario debe autorizar y aplicarlas.

* Modelos de control de acceso: 
   - DAC (Discrecional). 
      - Los propietarios de los recursos controlan el acceso.
      - En Linux, el DAC es el modelo de control de acceso predeterminado. Los propietarios de archivos y directorios tienen control sobre los permisos de acceso.
      - [chmod](g:chmod), [chown](g:chmod)

        **Ejemplo Práctico:**

        * Comandos para crear un archivo y modificar sus permisos:

            ```bash
            # Crear un archivo
            touch ejemplo.txt

            # Otorgar permisos de lectura y escritura al propietario, y solo lectura al grupo y otros
            chmod 644 ejemplo.txt

            # Cambiar el propietario del archivo
            chown usuario:grupo ejemplo.txt
            ```

            En este ejemplo, el propietario del archivo `ejemplo.txt` tiene permisos de lectura y escritura, mientras que el grupo y otros usuarios tienen permisos de solo lectura.


   - RBAC (Role-Based Access Control).
      - Permisos asignados en función de roles.
      - Linux no implementa RBAC nativo como otros sistemas operativos, pero se puede emular usando `groups` para asignar roles específicos.
      - [usermod](g:usermod)

        **Ejemplo Práctico:**

        Configurar un archivo sudoers para un rol específico:

        1. Edita el archivo `/etc/sudoers` utilizando `visudo` para prevenir errores de sintaxis.

            ```bash
            visudo
            ```

        2. Añade una entrada para el grupo 'admin' con permisos necesarios:

            ```bash
            %admin ALL=(ALL) ALL
            ```

        3. Añade usuarios al grupo 'admin':

            ```bash
            usermod -aG admin usuario1
            ```

        En este ejemplo, los usuarios que forman parte del grupo 'admin' tendrán permisos de superusuario a través del comando `sudo`.


   - MAC (Mandatory).
      - Autorizaciones establecidas por una autoridad central.
   
        [SELinux][selinux] (Security-Enhanced Linux) es un ejemplo de implementación de MAC (Mandatory Access Control) en Linux que permite restringir el acceso a los recursos del sistema a los procesos y aplicaciones que lo requieren.

        **Ejemplo práctico:**

        Sin SELinux:

        * El proceso Apache tiene permisos de ejecución y lectura en todo el sistema.
        * Un atacante podría acceder a información confidencial o realizar acciones no autorizadas si explota una vulnerabilidad en Apache o en un script PHP.

        Con SELinux:

        * El proceso Apache tiene permisos de ejecución y lectura solo en los directorios y archivos necesarios para su funcionamiento.
        * SELinux crea un contexto de seguridad para el proceso Apache, que define los permisos y restricciones de acceso a los recursos del sistema.
        * Si un atacante explota una vulnerabilidad en Apache o en un script PHP, SELinux bloqueará cualquier intento de acceder a archivos o directorios que no estén permitidos en el contexto de seguridad.


   
**Autenticación**

1. **Definición y objetivos**: Autenticación como proceso para verificar la identidad de un usuario o sistema.
2. **Métodos de autenticación**: contraseñas, tokens, códigos de verificación ([OTP](g:otp), verificación por SMS ), tarjetas inteligentes, biometría (huella dactilar, reconocimiento facial, etc.) y certificados digitales.

   - Algunos ejemplos de métodos de autenticación basados en tokens son:

      - OAuth 2.0: un estándar de autenticación y autorización ampliamente utilizado en aplicaciones web y móviles.
      - JWT (JSON Web Tokens): un estándar de tokens de autenticación y autorización basados en JSON.

3. **Autenticación multifactor**: combinación de dos o más métodos de autenticación para aumentar la seguridad.

**Mejores prácticas**

Importancia de la seguridad en el control de acceso y autenticación.

1. **Uso de contraseñas seguras**: complejidad, longitud y expiración de contraseñas.
2. **Gestión de cuentas**: creación, modificación y eliminación de cuentas de usuario.
3. **Auditoría y monitorización**: registro y análisis de eventos de acceso y autenticación.


[selinux]: https://github.com/SELinuxProject/selinux


