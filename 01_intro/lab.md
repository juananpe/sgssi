Ejercicios:

1. Clona el siguiente repositorio y sigue las instrucciones del [README.md](https://github.com/juananpe/zezenak) para instalar y ejecutar el sistema de información ("Aplicación de Gestión de Ganadería")
en local: https://github.com/juananpe/zezenak

2. Clona el repositorio en tu máquina remota (Azure, p.ej.) de tal forma que sea accesible vía http://TU_IP
   (sigue las instrucciones que encontrarás en este documento compartido sobre configuración de [máquinas virtuales en Azure](https://docs.google.com/document/d/14XDfS6OTW7XIK5vrgZgV7d_hKuZ0avUsj3lTeglX1cI/edit?usp=sharing))
   - Genera una clave SSH
   - Crea una máquina Ubuntu (asocia la clave ssh a esta máquina)
   - Abre los puertos 80, 443 y 22
   - Instala y configura nginx
   - Instala mysql
   - Usa rsync para clonar la aplicación de "Gestión de Ganadería" en tu máquina Azure
