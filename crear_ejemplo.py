import pandas as pd

# Crear datos de ejemplo
data = [
    {"Nombre": "Juan Pérez Rodríguez", "Cedula": "123456789", "Ruta": "6512"},
    {"Nombre": "María González López", "Cedula": "987654321", "Ruta": "6513"},
    {"Nombre": "Carlos Martínez Jiménez", "Cedula": "456789123", "Ruta": "6512"},
    {"Nombre": "Ana Fernández Castro", "Cedula": "789123456", "Ruta": "6541"},
    {"Nombre": "Luis Ramírez Morales", "Cedula": "321654987", "Ruta": "6542"},
    {"Nombre": "Sofia Herrera Vega", "Cedula": "654987321", "Ruta": "6513"},
    {"Nombre": "Diego Vargas Solano", "Cedula": "147258369", "Ruta": "6565"},
    {"Nombre": "Isabella Cruz Mendez", "Cedula": "258369147", "Ruta": "421601"},
    {"Nombre": "Andrés Mora Chinchilla", "Cedula": "369147258", "Ruta": "421602"},
    {"Nombre": "Camila Rojas Espinoza", "Cedula": "159753486", "Ruta": "421603"}
]

# Crear DataFrame
df = pd.DataFrame(data)

# Guardar como Excel con la hoja "Base de datos"
with pd.ExcelWriter("ejemplo_estudiantes.xlsx") as writer:
    df.to_excel(writer, sheet_name="Base de datos", index=False)

print("Archivo de ejemplo creado: ejemplo_estudiantes.xlsx")
