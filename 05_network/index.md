# Seguridad en Red

## 1. Introducción

La seguridad en red se ha vuelto cada vez más crucial debido a:
- La revolución de Internet en informática y comunicaciones
- Su creciente necesidad en el día a día
- Los problemas de seguridad informática que presenta

## Conceptos clave

### Identificación en Red

#### Direcciones IP
- Identifican máquinas en la red
- Formato de 32 bits (4 x 8)
- Ejemplo: 158.227.116.40
- Se apoyan en servicios DNS
- Utilizan tablas de enrutamiento

#### Direcciones MAC
- Identifican físicamente las tarjetas de red
- Formato: 00:CC:4F:FF:AA:AD
- **Importante**: Las direcciones MAC pueden ser falsificadas (MAC Spoofing)
- No son recomendables como único método de autenticación


## 2. Tipos de Ataques

Los ataques pueden dirigirse tanto a redes LAN como a computadores individuales. Los aspectos principales a proteger son:
- Confidencialidad
- Integridad
- Disponibilidad
- Autenticación remota

## 3. Elementos Vulnerables

### 3.1 Infraestructura física
- Cableado
- Armarios de conexión
- Concentradores
- Servidores

### 3.2 Protocolos y Servicios

#### 3.2.1 Estructura TCP/IP
- Protocolos estandarizados
- Diferentes capas de funcionamiento:
  - Aplicación
  - Transporte (TCP/UDP)
  - Internet (IP)
  - Red física

#### 3.2.2 Protocolos Comunes
- FTP (transferencia de archivos)
- SSH (sesiones remotas)
- SMTP (correo)
- HTTP (web)
- POP (correo)
- NTP (tiempo)

#### 3.2.3 Puertos
- Cada conexión utiliza puertos tanto en cliente como servidor
- Números de 16 bits
- Elementos necesarios:
  - IP del cliente
  - IP del servidor
  - Puerto del cliente
  - Puerto del servidor

## 4. Medidas de Seguridad

### 4.1 Gestión de Servicios
- La capa de aplicación es la más vulnerable
- Recomendaciones:
  - Desactivar puertos innecesarios
  - Implementar firewalls
  - Monitorizar puertos activos

### 4.2 Firewalls (Cortafuegos)

#### Tipos
1. Firewall a nivel de red (filtrado de paquetes)
2. Firewall a nivel de aplicación 

#### Políticas de Firewall
- **Política restrictiva**: Todo está prohibido excepto lo explícitamente permitido
- **Política permisiva**: Todo está permitido excepto lo explícitamente prohibido

#### DMZ (Zona Desmilitarizada)
- Zona específica para servidores accesibles desde el exterior
- Separación de redes mediante firewall

### 4.3 Gestión con iptables

Comandos básicos:
```bash
# Establecer política restrictiva
iptables -P INPUT DROP
iptables -P OUTPUT DROP
iptables -P FORWARD DROP

# Limpiar reglas
iptables -F

# Añadir reglas
iptables -A INPUT <regla>
iptables -I INPUT 2 <regla>
```

Acciones disponibles:
- ACCEPT: Acepta el paquete
- DROP: Descarta el paquete
- LOG: Registra el evento
- REJECT: Rechaza el paquete con mensaje de error

## 5. Herramientas de Seguridad

### 6.1 Análisis de Red
- Wireshark: Analizador de protocolos
- TCPdump: Herramienta de captura de paquetes
- Nmap: Escáner de puertos y análisis de red

### 6.2 Monitorización
- Es importante mantener un registro de actividades sospechosas
- Implementar sistemas de detección de intrusiones
- Realizar análisis regulares de seguridad