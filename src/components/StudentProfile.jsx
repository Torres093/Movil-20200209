// =============================================================================
// src/components/StudentProfile.jsx  →  TARJETA DE PERFIL DEL ESTUDIANTE
// =============================================================================
// Muestra los datos guardados del estudiante (se ve después de llenar el
// formulario). Recibe por props:
//   student → objeto { nombre, carnet, seccion }
//   onEdit  → función que, al ejecutarse, regresa al formulario (en Home hace
//             setStudent(null))
// =============================================================================
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";

// Mini-componente interno para no repetir código: una fila "ETIQUETA / valor".
// Se usa 3 veces abajo (Nombre, Carnet, Sección).
const Row = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

export default function StudentProfile({ student, onEdit }) {
  // Calcula las INICIALES para el círculo (avatar):
  //  "David Alejandro Guardado" → ["David","Alejandro","Guardado"]
  //  filter(Boolean) → elimina textos vacíos (por si hay dobles espacios)
  //  slice(0, 2)     → toma solo las 2 primeras palabras
  //  map(n => n[0].toUpperCase()) → primera letra de cada una en mayúscula
  //  join("")        → "DA"
  const initials = student.nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");

  return (
    <View style={styles.card}>
      {/* Encabezado azul con avatar, nombre y sección. */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{student.nombre}</Text>
        <Text style={styles.career}>Sección {student.seccion}</Text>
      </View>
      {/* Cuerpo: lista de datos usando el componente Row. */}
      <View style={styles.body}>
        <Row label="Nombre" value={student.nombre} />
        <Row label="Carnet" value={student.carnet} />
        <Row label="Sección" value={student.seccion} />
      </View>
      {/* Botón para volver al formulario (llama a onEdit del padre). */}
      <View style={{ paddingHorizontal: 20 }}>
        <Button title="Registrar otro estudiante" variant="secondary" onPress={onEdit} style={{ marginTop: 16 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Tarjeta blanca con sombra (elevation = Android; shadow* = iOS).
  card: { backgroundColor: "#fff", borderRadius: 20, overflow: "hidden", elevation: 3, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, paddingBottom: 20 },
  // Franja azul superior; centra el contenido.
  header: { backgroundColor: "#467ee5", alignItems: "center", paddingVertical: 28 },
  // Círculo blanco (ancho = alto = 88, radio 44 = la mitad → círculo perfecto).
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", marginBottom: 12 },
  avatarText: { fontSize: 32, fontWeight: "800", color: "#4F46E5" },
  name: { fontSize: 20, fontWeight: "800", color: "#fff" },
  career: { fontSize: 14, color: "#C7D2FE", marginTop: 4 },
  body: { paddingHorizontal: 20, paddingTop: 12 },
  // Cada fila con una línea gris inferior que la separa de la siguiente.
  row: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  rowLabel: { fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.5 },
  rowValue: { fontSize: 16, color: "#111827", fontWeight: "600", marginTop: 2 },
});
