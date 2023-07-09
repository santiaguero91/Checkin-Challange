# Simulación-check-in-deAeropuerto
Este es un ejercicio de API Rest para la aplicación de simulación de check-in de aerolíneas - realizado utilizando JavaScript, Express y prisma.

### Instalcion

```bash
npm install
```

### Inicio 

```bash
npm start
```

### Cómo funciona

Para que funcione se debe usar la url donde está desplegado el proyecto y agregar la siguiente ruta:

**/flights/:id/passengers**

siendo : id un numero del 1 al 4

## Formato de respuesta

La API devuelve respuestas en formato JSON. A continuación se presentan algunos ejemplos de respuestas:

### Respuesta exitosa:

```json
{
    "code": 200,
    "data": {
        "flightId": 1,
        "takeoffDateTime": 1688207580,
        "takeoffAirport": "Aeropuerto Internacional Arturo Merino Benitez, Chile",
        "landingDateTime": 1688221980,
        "landingAirport": "Aeropuerto Internacional Jorge Cháve, Perú",
        "airplaneId": 1,
        "passengers": [
            {
                "passengerId": 90,
                "dni": 983834822,
                "name": "Marisol",
                "age": 44,
                "country": "México",
                "boardingPassId": 24,
                "purchaseId": 47,
                "seatTypeId": 1,
                "seatId": 1
            },
            {...}
        ]
    }
}
```

### En caso de no encontrar un vuelvo con la id indicada:

```json
{
 "code": 404,
 "data": {}
}
```

### En caso de error:

```json
{
 "code": 400,
 "errors": "could not connect to db"
}
```

## Información técnica

- node.js: 16.17.0
- express.js: 4.18.2
- dotenv: 16.0.3
- mysql2: 2.3.3
