# Generate and Verify CA Certificate Authority and Client Certificates with OpenSSL


## create CA key and cert simultaneously
```bash
openssl req -x509 -newkey RSA -nodes -keyout CA.key -days 10 -out CA.pem -reqexts \
	v3_ca -subj "/C=ES/ST=Eus/L=Donostia/O=EHU/OU=SGSSI"
```

- subj format:
	+ `C` - Country name
	+ `ST` - State or province name
	+ `L` - Locality name (city)
	+ `O` - Organization name
	+ `OU` - Organizational unit name

The command generates two files: `CA.key` and `CA.pem`.

- `CA.key` contains the private key of the certificate authority. This key should be kept secure, as it's used to sign certificates and can be used to spoof the CA.

- `CA.pem` contains the self-signed certificate of the certificate authority in PEM (Privacy Enhanced Mail) format. This certificate can be used to verify the authenticity of certificates signed by the CA.


The distinction between the private key and the certificate is crucial:

- The private key is used for signing and decryption operations and must be kept confidential.
- The certificate, on the other hand, is used for verification and authentication purposes and can be publicly distributed.


## Create a client certificate

To create a client certificate signed by the CA you've just created, you'll need to follow these steps:

1. Generate a private key for the client
2. Create a Certificate Signing Request (CSR) for the client
3. Use the CA to sign the client's CSR, generating the client certificate

Here's how you can do this using OpenSSL commands:

1. Generate the client's private key:
```bash
openssl genrsa -out client.key 2048
```

2. Create a Certificate Signing Request (CSR) for the client:
```bash
openssl req -new -key client.key -out client.csr -subj "/C=ES/ST=Eus/L=Donostia/O=ClienteOrg/OU=ClienteDept/CN=cliente.ejemplo.com"
```

3. Use the CA to sign the client's CSR and generate the client certificate:
```bash
openssl x509 -req -in client.csr -CA CA.pem -CAkey CA.key -CAcreateserial -out client.crt -days 365 -sha256
```


Let's break down the last command:
- `-req`: Indicates we're processing a certificate request (CSR)
- `-in client.csr`: Input file (the CSR we just created)
- `-CA CA.pem`: The CA certificate file
- `-CAkey CA.key`: The CA's private key file
- `-CAcreateserial`: Create a serial number file if it doesn't exist
- `-out client.crt`: Output file for the new certificate
- `-days 365`: Validity period of the certificate (1 year in this case)
- `-sha256`: Use SHA-256 for the signature

After running these commands, you'll have:
- `client.key`: The client's private key
- `client.csr`: The client's Certificate Signing Request (you can delete this after getting the certificate)
- `client.crt`: The client's certificate, signed by your CA


## Create a PKCS#12 file

If you needed to create a PKCS#12 file from your client certificate and key, you could use a command like this:

```bash
openssl pkcs12 -export -out client.p12 -inkey client.key -in client.crt -certfile CA.pem
```

This would create a PKCS#12 file (client.p12) containing the client's private key, certificate, and the CA certificate, all in one file.


Verifiy the PKCS#12 file:
```bash
 openssl pkcs12 -in client.p12 -nokeys -cacerts -passin pass:YOURPASSWORD
```


# FAQ

1. What's inside client.crt:

The client.crt file contains an X.509 certificate. This certificate includes:
- The public key of the client
- Information about the client (like the subject name)
- Information about the issuer (your CA in this case)
- The validity period
- A digital signature created by the CA

2. What's the difference between X.509 and PKCS#12 formats?

X.509 and PKCS#12 are different but related standards:

- X.509: This is a standard defining the format of public key certificates. Your client.crt is an X.509 certificate. It contains only the certificate (public information) and is typically stored in PEM or DER format.

- PKCS#12 (often seen with .p12 or .pfx extensions): This is a archive file format for storing multiple cryptographic objects together. It usually contains:
  - Private key
  - Certificate (X.509)
  - Chain certificates

The main differences:
- X.509 is just a certificate format, while PKCS#12 is a container format.
- X.509 certificates (like your client.crt) don't include private keys, while PKCS#12 files typically do.
- X.509 certificates are usually not password-protected, while PKCS#12 files often are.

In many applications, especially for client authentication, PKCS#12 is used because it conveniently bundles the private key with the certificate. However, in scenarios where you need to distribute only the public certificate (like for server authentication), the X.509 format (like your client.crt) is more commonly used.


