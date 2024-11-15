# XSS Cross Site Scripting

## Definición
Cross Site Scripting (XSS) es una vulnerabilidad que permite a un atacante inyectar código en una página web que se ejecutará en el navegador de un usuario. El atacante puede inyectar código JavaScript, HTML o cualquier otro lenguaje que se ejecute en el navegador.

## Tipos de XSS

### DOM-based XSS
El atacante modifica el DOM de la página web para ejecutar código malicioso en el navegador de la víctima.

### Stored XSS
El atacante envía el código malicioso a la página web y se almacena en la base de datos. Cuando un usuario visita la página web, el código se ejecuta en el navegador del usuario.

### Reflected XSS
El atacante envía un enlace a la víctima que contiene el código malicioso. Cuando la víctima hace clic en el enlace, el código se ejecuta en el navegador de la víctima.

# Tutorial práctico: VulnBank

Seguiremos el tutorial de [VulnBank](https://docs.google.com/document/d/1RnPtBNo49Kx02tUwCvHib3eC-Kk4q8ZZ5Jrv8vsjdnI/edit?usp=sharing) y estudiaremos un ejemplo práctico de DOM-based XSS y Stored XSS.
 
