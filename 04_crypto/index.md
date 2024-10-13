## Criptografía Aplicada: Técnicas Básicas

La criptografía es la disciplina que se enfoca en diseñar y analizar algoritmos para proteger la información y las comunicaciones. Su objetivo principal es garantizar la confidencialidad, integridad y autenticidad de los datos, especialmente cuando se transmiten o almacenan en entornos inseguros. La criptografía emplea algoritmos matemáticos y técnicas para convertir información legible en formatos aparentemente indescifrables, que solo pueden ser interpretados por aquellos que poseen la clave adecuada para descodificarlos.

### Objetivos de la Criptografía

Los principales objetivos de la criptografía son:

* **Confidencialidad:** Asegurar que solo las personas autorizadas puedan entender el mensaje.
* **Integridad:** Asegurar que el mensaje no ha sido alterado.
* **Autenticación:** Identificar a la persona que ha enviado el mensaje.

### Conceptos

* Emisor
* Mensaje en claro
* crypt (cifrar)
* criptograma
* decrypt (descifrar)
* Receptor

### Técnicas de Criptografía

Existen diversas técnicas en criptografía, pero las más básicas son:

* **Transposición (Permutation Cipher):** Se altera el orden de los caracteres del mensaje según una clave. Por ejemplo, organizar los caracteres del mensaje en columnas y luego cambiar el orden de las columnas.
    - padding

* **Sustitución (Substitution Cipher):** Se reemplazan los caracteres del mensaje por otros caracteres o símbolos. 
    - Ejemplos:
        - César
        - Vigénere



### Criptoanálisis

El criptoanálisis es el estudio y práctica de descifrar información cifrada sin tener acceso a la clave secreta o sistema de cifrado utilizado.

  - Ejemplo de técnica de criptoanálisis:
     - análisis de frecuencia

### Criptografía de Clave Secreta

En la criptografía de clave secreta, el emisor y el receptor utilizan la misma clave para cifrar y descifrar el mensaje. Este método es eficiente, pero transmitir la clave de forma segura puede ser un desafío.

### Funciones hash

En criptografía, las funciones hash se usan para generar un "resumen" o "digest" de un mensaje. Estos resúmenes se pueden utilizar para verificar la integridad del mensaje, almacenar contraseñas e implementar firmas digitales.

### Ejemplos de algoritmos usados en criptografía

* **DES (Data Encryption Standard):** Un algoritmo de cifrado de clave secreta que utiliza una clave de 56 bits. Es vulnerable a ataques de fuerza bruta.
* **AES (Advanced Encryption Standard):** El sucesor de DES, que utiliza claves más largas (128 bits o más).
* **MD5 y SHA:** Algoritmos que implementan funciones hash.

### Referencias

- [NKU, Permutation Ciphers](https://www.nku.edu/~christensen/1402%20permutation%20ciphers.pdf)
