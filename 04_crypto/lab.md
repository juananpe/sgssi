# Cifrado por transposición (permutation cipher)

Ejemplo de cifrado por permutación de columnas

**Mensaje original:** 'EJEMPLO DE CIFRADO POR PERMUTACION'

**Clave:** 3142 

## Proceso de cifrado

### Paso 1: Eliminar espacios y dividir el mensaje en columnas

```
E J E M
P L O D
E C I F
R A D O
P O R P
E R M U
T A C I
O N X X
```

*El padding se utiliza para completar la última fila si es necesario, asegurando que todas las columnas tengan la misma longitud.*

### Paso 2: Reordenar las columnas según la clave (3142)

```
E	E	M	J
O	P	D	L
I	E	F	C
D	R	O	A
R	P	P	O
M	E	U	R
C	T	I	A
x	O	x	N
```

(la primera columna pasa a ser la segunda)
(la segunda columna pasa a ser la cuarta)
(la tercera a la primera)
(la cuarta a la tercera)

### Paso 3: Leer el mensaje cifrado

Mensaje cifrado final: `EEMJOPDLIEFCDROARPPOMEURCTIAxOxN`

## Proceso de descifrado

### Paso 1: Dividir el mensaje cifrado en columnas

```
E	E	M	J
O	P	D	L
I	E	F	C
D	R	O	A
R	P	P	O
M	E	U	R
C	T	I	A
x	O	x	N
```

### Paso 2: Reordenar las columnas según el orden original (3142)

```
E J E M
P L O D
E C I F
R A D O
P O R P
E R M U
T A C I
O N X X
```

### Paso 3: Leer el mensaje descifrado

Mensaje descifrado: `EJEMPLODECIFRADOPORPERMUTACION`

Mensaje original con espacios: `EJEMPLO DE CIFRADO POR PERMUTACION`

---

*Este método de cifrado es relativamente simple pero puede ser efectivo para mensajes cortos. Sin embargo, es vulnerable a análisis de frecuencia.*


**Ejercicio**

Implementa dos scripts en python que permitan aplicar cifrado y descifrado por permutación. Deben funcionar así (puedes ayudarte de un LLM, como GPT, Claude, LLama o Gemini):

__Cifrar__
```
$ python crypt.py "EJEMPLO DE CIFRADO POR PERMUTACION" 3142
EEMJOPDLIEFCDROARPPOMEURCTIAxOxN
```

__Descifrar__
```
$ python decrypt.py "EEMJOPDLIEFCDROARPPOMEURCTIAxOxN" 3142
EJEMPLODECIFRADOPORPERMUTACION
```