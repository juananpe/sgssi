# SGSSI Backups

## Ejercicios

**Objetivos**: aprender a realizar copias de seguridad completas e incrementales. Conocer el comando `rsync`. Aprender a realizar copias remotas. Aprender a realizar copias y restaurar una base de datos.

0) Crea la siguiente jerarquía de archivos y carpetas (dentro de la carpeta `/home/usuario/seguridad`)

*(Nota: si estás en Windows, ejecuta primero el comando wsl para abrir una terminal Linux en Windows)*
(o directamente, ejecuta los comandos con el usuario azureuser en tu máquina Azure)
En el resto de comandos, sustituye "usuario" por tu nombre de usuario (si estás en Azure, será azureuser)


```bash
$ mkdir /home/usuario/seguridad
$ cd /home/usuario/seguridad
$ touch {a,b,c,d,e}
```

1) Utilizaremos la herramienta `rsync` para realizar copias de seguridad.

Empecemos realizando una copia de seguridad completa en `/opt/backups` (deberás crear la carpeta... créala como root y cambia el propietario a usuario).

Es decir, debes pasar de algo como esto:

```bash
azureuser@sgssi:/opt$ ls -al
total 16
drwxr-xr-x  4 root root 4096 Sep 12 16:07 .
drwxr-xr-x 19 root root 4096 Sep  7 07:40 ..
drwxr-xr-x  2 root root 4096 Sep 12 16:07 backups
drwx--x--x  4 root root 4096 Sep  7 10:45 containerd
```

a algo como esto:

```bash
azureuser@sgssi:/opt$ ls -al
total 16
drwxr-xr-x  4 root      root      4096 Sep 12 16:07 .
drwxr-xr-x 19 root      root      4096 Sep  7 07:40 ..
drwxr-xr-x  2 azureuser azureuser 4096 Sep 12 16:07 backups
drwx--x--x  4 root      root      4096 Sep  7 10:45 containerd
```


**¿Cómo realizar una copia completa?**

```bash
rsync -av /home/usuario/seguridad/ /opt/backups
```

- **a** = archive, mantener metadatos de los ficheros (propietario, permisos, fecha de creación, ...) 
- **v** = verbose, mostrar detalles de la operación 

**a)** Elimina el contenido de la carpeta `/opt/backups`:

```bash
rm -rf /opt/backups/*
```

Reflexiona: ¿qué ocurre si intentas eliminar la carpeta /opt/backups como un usuario no-root? ¿por qué?


**¿Es lo mismo ejecutar el comando anterior o el siguiente? ¿Por qué?**

```bash
rsync -av /home/usuario/seguridad /opt/backups
```

Ejecuta de nuevo el comando anterior. ¿Qué ocurre la segunda vez?

2) Vamos a realizar algunos cambios sobre el contenido de los ficheros.

```bash
echo "Cambio1" >> /home/$USER/seguridad/a 
echo "Cambio2" >> /home/$USER/seguridad/b 
rm /home/$USER/seguridad/c 
touch /home/$USER/seguridad/f 
```

Reflexiona: ¿qué función tiene el operador >> que acabamos de usar? 
¿es lo mismo > que >>? ¿cuál es el valor de la variable $USER? (puedes verlo con `echo $USER`)

3) Ejecuta el siguiente comando:

```bash
ls -alt /home/$USER/seguridad/
```

**¿Para qué se usa la opción -t del comando ls?**
(Compara la ejecución de `ls -al` con la ejecución de `ls -alt`)

4) Supongamos que queremos recuperar el mismo estado que había en `/home/$USER/seguridad/` antes de ejecutar el ejercicio 2. ¿Cómo lo harías? ¿qué ocurre con el fichero `f`?

5) Crea dos subcarpetas en `/home/$USER/seguridad/`: `subcarpeta1` y `subcarpeta2`. Crea algunos ficheros dentro de ambas carpetas. Después crea la `subcarpeta1.1` dentro de la `subcarpeta1`. Crea un par de ficheros dentro.

Usa el comando `rsync` para realizar una copia de seguridad completa.

Deberías de obtener algo como lo siguiente (con los nombres de ficheros que hayas creado, claro)

```bash
azureuser@sgssi:~/seguridad$ tree /opt/backups/
/opt/backups/
└── seguridad
    ├── a
    ├── b
    ├── d
    ├── e
    ├── f
    ├── subcarpeta1
    │   ├── fs1
    │   └── subcarpeta1.1
    │       ├── a
    │       └── b
    └── subcarpeta2
        └── fs2

4 directories, 9 files
```

(Puedes instalar el paquete tree con el comando `sudo apt install tree`)

    5.1) Verifica que se han copiado las subcarpetas y su contenido

    5.2) ¿Se han mantenido las fechas de creación? (es decir, si una carpeta se creó el 2024/09/09 a las 09:30:00, tras la copia, ¿se mantiene la fecha y hora o ha cambiado?)

    Reflexiona: ¿qué hora es en el servidor? 
    
    Pregúntale a un LLM (como GPT, Claude, Gemini...) lo siguiente: "how to change the time zone of your remote Ubuntu server to Madrid's time zone"

6) La aplicación `rsync` acepta multitud de opciones. Por ejemplo, ¿qué hace la opción `--delete`?

6.1 ¿Qué ocurre con el fichero `/opt/backups/seguridad/a`  tras ejecutar los siguientes comandos?

```bash
rm /home/$USER/seguridad/a
rsync -av --delete /home/$USER/seguridad /opt/backups/
```

7) ¿Cuál es el propósito de la opción `-z`?
(recuerda que pedes ejecutar el comando `man rsync` para obtener ayuda)

```bash
rsync -avz …
```

8) Al crear copias de seguridad, tendremos que establecer una política de retención. Es decir, no habrá solo una única copia de seguridad (que se reescriba cada día), sino que tendremos distintas opciones de copias (diarias, semanales, mensuales...) Para lograr esto haremos uso del comando `date`. Rellena la siguiente tabla, basándote en el primer ejemplo (puedes ejecutar cada comando en consola para asegurarte de que los resultados son los esperados):

| Comando               | Resultado            | Descripción                                                                       |
|-----------------------|----------------------|-----------------------------------------------------------------------------------|
| `date`                | Thu Sep 12 19:08:02 CEST 2024  |  Muestra el año, día de la semana, mes (en letras), día y hora (hh:mm:ss) |
| `date +%u`            |                      |                                                                                   |
| `date +"%m-%d-%y"`    |                      |                                                                                   |
| `date +"%D"`          |                      |                                                                                   |
| `date +"%T"`          |                      |                                                                                   |
| `date +"%H-%M"`       |                      |                                                                                   |
| `NOW=$(date +"%m-%d-%Y");echo $NOW` |      |                                                                                   |
| `date +%u-%a`         |                      |                                                                                   |
| `date +%d`            |                      |                                                                                   |
| `date +%m-%b`         |                      |                                                                                   |

9) Para crear copias de seguridad, vamos a utilizar `rsync` y scripts `Bash`. En los scripts `Bash`, las variables `$1` y `$2` tienen un significado especial. Por ejemplo, supongamos que tenemos el siguiente script (`prueba.sh`):

```bash
#!/bin/bash

echo $2
echo $1
```

Le asignamos permisos de ejecución y ejecutamos el script:

```bash
$ chmod a+x prueba.sh
$ ./prueba.sh kaixo mundua
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
    mkdir -p /home/$USER/backups/$path
    echo "Writing to: /home/$USER/backups/$path"
    rsync -avz --delete /home/$USER/seguridad /home/$USER/backups/$path
else
    echo rsync -avz --delete /home/$USER/seguridad /home/$USER/backups/$path
fi
```

Con ese script queremos hacer copias de seguridad de la carpeta `seguridad` del usuario actual. Específicamente, ¿qué carpeta y dónde se creará la copia de seguridad si se ejecuta de esta manera? 

(no te olvides de darle permisos de ejecución al script `backup.sh`)

```bash
./backup.sh daily go
```

**¿Y de esta forma?**

```bash
./backup.sh weekly go
```

**¿Y así?**

```bash
./backup.sh monthly go
```

**¿Y de esta otra forma? ¿se creará algo?**

```bash
./backup.sh monthly
```

11) Si tenemos las siguientes líneas en el fichero `crontab`:

```bash
0 1 * * * /home/$USER/backup.sh daily go
30 1 4,12,20,28 * * /home/$USER/backup.sh weekly go
0 2 1 * * /home/$USER/backup.sh monthly go
```

(Intenta resolver los siguientes ejercicios sin ayuda. Reflexiona un rato. Piensa que el día del examen no tendrás conexión a Internet. Pero si te atascas, recuerda que tienes LLMs -GPT, Claude, Gemini- a tu disposición)

11.1) ¿Cuál sería la política de retención diaria? (¿Cuántas copias diarias tendríamos como máximo?)

11.2) ¿Cuál sería la política de retención semanal? (¿Cuántas copias semanales tendríamos como máximo?)

11.3) ¿Cuál sería la política de retención mensual?

11.4) ¿Cuántas copias en total tenemos dentro de la carpeta backups del usuario?

12) El comando `rsync` ofrece la opción de realizar copias remotas, siguiendo la sintaxis de `scp`. 

12.1 Supongamos que estamos en la máquina física local (en tu portátil); ¿cuál sería el comando `rsync` para copiar la carpeta `sgssi` de tu servidor Azure (en la IP A.B.C.D) y todo lo que contiene (incluyendo subcarpetas) a la carpeta actual? Pruébalo.

  * LOCAL <-- REMOTO

12.2 Supongamos que estamos en la máquina física local (en tu portátil); ¿cuál sería el comando `rsync` para copiar todo el contenido de la carpeta actual de tu ordenador a la carpeta `sgssi` de tu servidor Azure (en la IP A.B.C.D)? Pruébalo.

  * LOCAL --> REMOTO

**Nota:** Ten en cuenta que la aplicación `rsync` es muy eficiente al realizar copias. Solo copiará los archivos que hayan cambiado desde la última copia realizada (es decir, no copiará todos los archivos de la carpeta).

13) Podemos utilizar el comando `mysqldump` para hacer una copia de seguridad de una base de datos MySQL/MariaDB. ¿Cómo se utiliza? Ver: [Documentación de mysqldump](https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html)

13.1 Configura tu cuenta en la máquina Azure para hacer copias de seguridad automáticas de MySQL todos los días a las 8:00am. Documenta los pasos que has dado.

Nota: probablemente necesites instalar esta dependencia

`sudo apt install mariadb-client-10.6`

Puedes comprobar que la conexión a la base de datos funciona ejecutando lo siguiente en el servidor remoto de Azure:

 `$ mysql -h 127.0.0.1 -u root -p`

 Te solicitará la contraseña del administrador de MariaDB.
Ejecuta el comando `show dbs` para ver las bases de datos disponibles.

Reflexiona:

* ¿Podemos saber cuál es el password del administrador de la base de datos leyendo el fichero `docker-compose.yml` de nuestro servicio Zezenak?

* Explica qué estamos haciendo exactamente con este comando:

  ```bash
  rsync -avz --progress -e "ssh -i ~/Dropbox/certificados_digitales/azure-key-2024.pem" . azureuser@40.118.98.125:~/sgssi
  ```


