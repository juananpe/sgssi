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

La primera columna pasa a ser la segunda. La segunda columna pasa a ser la cuarta.
La tercera pasa a ser la primera. La cuarta, pasa a ser la tercera.

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

--------

**Ejercicios**

**1. Cifrado por permutación (transposition)**

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

-------
**2. Sustitución monoalfabética. Cifrado César**

Con una sustitución César, donde cada letra se sustituye por la letra situada 3 posiciones más adelante en el alfabeto (desplazamiento de 3 unidades):

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
DEFGHIJKLMNOPQRSTUVWXYZABC
```

Supongamos que queremos cifrar el siguiente mensaje: 

    Send lawyers, guns and money

El resultado sería:

`Vhqg odzbhuv, jxqv dqg prqhb`

Crea un script en Python que implemente el cifrado César. Debe funcionar así:

```
$ python cesar.py "Send lawyers, guns and money" 
Vhqg odzbhuv, jxqv dqg prqhb
```

Modifica el script para que admita dos argumentos opcionales: modo (encrytp, decrypt) y shift (un entero, que indica desplazamiento). Por defecto, en el cifrado César shift=3.

P. ej.:

```
$ python cesar.py "Send lawyers, guns and money" -m e -s 4
Wirh peacivw, kyrw erh qsric
```


```
$ python cesar.py "Vhqg odzbhuv, jxqv dqg prqhb" -m d
Send lawyers, guns and money
```

```
$ python cesar.py "Wirh peacivw, kyrw erh qsric" -m d -s 4   
Send lawyers, guns and money
```

Debería de poder informar sobre el uso, así:

```
$ python cesar.py                                            
Uso: cesar.py [-h] [-m {e,d}] [-s SHIFT] text
cesar.py: error: el parámetro text es obligatorio
```
---
**3. Ataques de Fuerza bruta**
 
El cifrado César es vulnerable a un ataque de fuerza bruta. Para descifrar un criptograma cifrado con este algoritmo basta con probar todos los desplazamientos posibles hasta encontrar una frase con sentido.

Ejemplo:
```
$ python brute.py "Vhqg odzbhuv, jxqv dqg prqhb"

Desplazamiento 1: ugpf ncyagtu, iwpu cpf oqpga
Desplazamiento 2: tfoe mbxzfst, hvot boe npofz
Desplazamiento 3: send lawyers, guns and money <----
Desplazamiento 4: rdmc kzvxdqr, ftmr zmc lnmdx
Desplazamiento 5: qclb jyuwcpq, eslq ylb kmlcw
Desplazamiento 6: pbka ixtvbop, drkp xka jlkbv
Desplazamiento 7: oajz hwsuano, cqjo wjz ikjau
Desplazamiento 8: nziy gvrtzmn, bpin viy hjizt
Desplazamiento 9: myhx fuqsylm, aohm uhx gihys
Desplazamiento 10: lxgw etprxkl, zngl tgw fhgxr
Desplazamiento 11: kwfv dsoqwjk, ymfk sfv egfwq
Desplazamiento 12: jveu crnpvij, xlej reu dfevp
Desplazamiento 13: iudt bqmouhi, wkdi qdt ceduo
Desplazamiento 14: htcs aplntgh, vjch pcs bdctn
Desplazamiento 15: gsbr zokmsfg, uibg obr acbsm
Desplazamiento 16: fraq ynjlref, thaf naq zbarl
Desplazamiento 17: eqzp xmikqde, sgze mzp yazqk
Desplazamiento 18: dpyo wlhjpcd, rfyd lyo xzypj
Desplazamiento 19: coxn vkgiobc, qexc kxn wyxoi
Desplazamiento 20: bnwm ujfhnab, pdwb jwm vxwnh
Desplazamiento 21: amvl tiegmza, ocva ivl uwvmg
Desplazamiento 22: zluk shdflyz, nbuz huk tvulf
Desplazamiento 23: yktj rgcekxy, maty gtj sutke
Desplazamiento 24: xjsi qfbdjwx, lzsx fsi rtsjd
Desplazamiento 25: wirh peacivw, kyrw erh qsric
```

3.1 Implementa el script `brute.py`

3.2 ¿Cuál será el resultado de Desplazamiento 26?

3.3 ¿Cuál sería el resultado de **cifrar** con desplazamiento 13 **y volver a cifrar** el resultado anterior con desplazamiento 13? 

Es decir, ¿cuál es el resultado de esta secuencia?
```
$ python cesar.py "Envia abogados, armas y dinero" -m e -s 13
Raivn nobtnqbf, neznf l qvareb

$ python cesar.py "Raivn nobtnqbf, neznf l qvareb" -m e -s 13
```

3.4 El cifrado con desplazamiento 13 del ejercicio anterior tiene un nombre especial, ¿podrías investigar cuál es ese nombre?



