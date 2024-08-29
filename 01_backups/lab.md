# SGSSI Backups

## Ejercicios

**Objetivos**: aprender a realizar copias de seguridad completas e incrementales. Conocer el comando `rsync`. Aprender a realizar copias remotas. Aprender a realizar copias y restaurar una base de datos.

0) Crea la siguiente jerarquía de archivos y carpetas (dentro de la carpeta `/home/usuario/seguridad`)

*(Nota: si estás en Windows, ejecuta primero el comando wsl para abrir una terminal Linux en Windows)*

```bash
$ mkdir /home/usuario/seguridad
$ cd /home/usuario/seguridad
$ touch {a,b,c,d,e}
```

1) Utilizaremos la herramienta `rsync` para realizar copias de seguridad.

Empecemos realizando una copia de seguridad completa en `/opt/backups` (deberás crear la carpeta).

**¿Cómo realizar una copia completa?**

```bash
rsync -av /home/usuario/seguridad/ /opt/backups
```

- **a** = archive, mantener metadatos de los ficheros (propietario, permisos, fecha de creación, ...) 
- **v** = verbose, mostrar detalles de la operación 

**a)** Elimina la carpeta `/opt/backups`:

```bash
rm -rf /opt/backups 
```

**¿Es lo mismo ejecutar el comando anterior o el siguiente? ¿Por qué?**

```bash
rsync -av /home/usuario/seguridad /opt/backups
```

*(¡ojo! En lo sucesivo usaremos este último comando, pruébalo en tu terminal)*

2) Vamos a realizar algunos cambios sobre el contenido de los ficheros.

```bash
echo "Cambio1" >> /home/usuario/seguridad/a 
echo "Cambio2" >> /home/usuario/seguridad/b 
rm /home/usuario/seguridad/c 
touch /home/usuario/seguridad/f 
```

3) Ejecuta el siguiente comando:

```bash
ls -alt /home/usuario/seguridad/
```

**¿Para qué se usa la opción -t del comando ls?**

4) Supongamos que queremos recuperar el mismo estado de los ficheros que había en `/home/usuario/seguridad/` antes de ejecutar el ejercicio 2. ¿Cómo lo harías?

5) Crea dos subcarpetas en `/home/usuario/seguridad/`: `subcarpeta1` y `subcarpeta2`. Crea algunos ficheros dentro de ambas carpetas. Después crea la `subcarpeta1.1` dentro de la `subcarpeta1`. Crea un par de ficheros dentro.

Usa el comando `rsync` para realizar una copia de seguridad completa.

    5.1) ¿Se han copiado las subcarpetas?

    5.2) ¿Se han mantenido las fechas de creación? (es decir, si una carpeta se creó el 2024/09/09 a las 09:30:00, tras la copia, ¿se mantiene la fecha y hora o ha cambiado?)

6) La aplicación `rsync` acepta multitud de opciones. Por ejemplo, ¿qué hace la opción `--delete`?

```bash
rm /home/usuario/seguridad/a
rsync -av --delete /home/usuario/seguridad /opt/backups/
```

7) ¿Cuál es el propósito de la opción `-z`?

```bash
rsync -avz …
```

8) Al crear copias de seguridad, tendremos que establecer una política de retención. Es decir, no habrá solo una única copia de seguridad (que se reescriba cada día), sino que tendremos distintas opciones de copias (diarias, semanales, mensuales...) Para lograr esto haremos uso del comando `date`. Rellena la siguiente tabla, basándote en el primer ejemplo (puedes ejecutar cada comando en consola para asegurarte de que los resultados son los esperados):

| Comando               | Resultado            | Descripción                                                                       |
|-----------------------|----------------------|-----------------------------------------------------------------------------------|
| `date`                | Ost Ira 11 22:38:09  | CEST 2024 Muestra el año, día de la semana, mes (en letras), día y hora (hh:mm:ss) |
| `date +%u`            |                      |                                                                                   |
| `date +"%m-%d-%y"`    |                      |                                                                                   |
| `date +"%D"`          |                      |                                                                                   |
| `date +"%T"`          |                      |                                                                                   |
| `date +"%H-%M"`       |                      |                                                                                   |
| `NOW=$(date +"%m-%d-%Y")` | `echo $NOW`     |                                                                                   |
| `date +%u-%a`         |                      |                                                                                   |
| `date +%d`            |                      |                                                                                   |
| `date +%m-%b`         |                      |                                                                                   |

9) Para crear copias de seguridad, vamos a utilizar `rsync` y scripts de bash. En los scripts de bash, las variables `$1` y `$2` tienen un significado especial. Por ejemplo, supongamos que tenemos el siguiente script (`prueba.sh`):

```bash
#!/bin/bash

echo $2
echo $1
```

Le asignamos permisos de ejecución y ejecutamos el script:

```bash
$ chmod a+x prueba.sh
$ ./prueba.sh
```

**¿Qué obtenemos por pantalla?**

Ahora, ejecútalo con estos parámetros:

```bash
./prueba.sh kaixo mundua
```

**¿Qué obtenemos por pantalla? Por tanto, ¿qué significa `$1`? ¿y `$2`?**

10) Supongamos que tenemos el siguiente script (`backup.sh`):

```bash
#!/bin/bash
# Makes daily snapshots in folders like "daily-4-Thu", "daily-5-Fri"
if [[ "$1" == "daily" ]]
then
    path=daily-`date +%u-%a`
fi

# Makes weekly snapshots in folders like "weekly-1" where 1 is the day of the month
if [[ "$1" == "weekly" ]]
then
    path=weekly-`date +%d`
fi

# Makes monthly snapshots in folders like "monthly-04-Apr"
if [[ "$1" == "monthly" ]]
then
    path=monthly-`date +%m-%b`
fi

# Run with "go" as the second CLI parameter to actually run the rsync command, otherwise prints the command that would have been run (useful for testing)
if [[ "$2" == "go" ]]
then
    rsync -avz --delete /home/usuario/Dropbox /home/usuario/Dropbox-Backup/$path
else
    echo rsync -avz --delete /home/usuario/Dropbox /home/usuario/Dropbox-Backup/$path
fi
```

Con ese script queremos hacer copias de seguridad de la carpeta de Dropbox de un usuario llamado 'usuario'. Específicamente, ¿qué carpeta y dónde se creará la copia de seguridad si se ejecuta de esta manera?

```bash
/home/usuario/backup.sh daily go
```

**¿Y de esta forma?**

```bash
/home/usuario/backup.sh weekly go
```

**¿Y así?**

```bash
/home/usuario/backup.sh monthly go
```

**¿Y de esta otra forma?**

```bash
/home/usuario/backup.sh monthly prueba
```

11) Si tenemos las siguientes líneas en el fichero `crontab`:

```bash
0 1 * * * /home/usuario/backup.sh daily go
30 1 4,12,20,28 * * /home/usuario/backup.sh weekly go
0 2 1 * * /home/usuario/backup.sh monthly go
```

11.1) ¿Cuál sería la política de retención diaria? (¿Cuántas copias diarias tendríamos como máximo?)

11.2) ¿Cuál sería la política de retención semanal? (¿Cuántas copias semanales tendríamos como máximo?)

11.3) ¿Cuál sería la política de retención mensual?

11.4) ¿Cuántas copias en total tenemos dentro de la carpeta Dropbox del usuario?

12) El comando `rsync` ofrece la opción de realizar copias remotas, siguiendo la sintaxis de `scp`. Supongamos que estamos en la máquina física local (en tu portátil); ¿cuál sería el comando `rsync` para copiar la carpeta `public_html` de tu sitio web (en `seguridad.ikasten.io`) y todo lo que contiene (incluyendo subcarpetas) a la carpeta actual?

**Nota:** Ten en cuenta que la aplicación `rsync` es muy eficiente al realizar copias. Solo copiará los archivos que hayan cambiado desde la última copia realizada (es decir, no copiará todos los archivos de la carpeta).

13) Podemos utilizar el comando `mysqldump` para hacer una copia de seguridad de una base de datos MySQL. ¿Cómo se utiliza? Ver: [Documentación de mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)

Configura tu cuenta en `seguridad.ikasten.io/equipoX` para hacer copias de seguridad automáticas de MySQL