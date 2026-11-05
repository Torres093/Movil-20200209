// =============================================================================
// src/components/Input.jsx  →  CAMPO DE TEXTO REUTILIZABLE
// =============================================================================
// Envuelve un TextInput añadiendo: etiqueta (label) arriba y mensaje de
// error abajo. Se usa en StudentForm.
// Props:
//   label → texto que aparece encima del campo
//   error → mensaje de error (si existe, el borde se pone rojo)
//   style → estilos extra
//   ...props → TODAS las demás props (value, onChangeText, placeholder,
//              autoCapitalize...) se pasan directo al TextInput (rest operator)
// =============================================================================
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function Input({ label, error, style, ...props }) {
  return (
    <View style={styles.wrapper}>
      {/* Muestra la etiqueta solo si se envió; si no, no dibuja nada (null). */}
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        // Estilos: base + borde rojo si hay error + estilos externos.
        style={[styles.input, error && styles.inputError, style]}
        // Color gris del texto de ejemplo (placeholder).
        placeholderTextColor="#9CA3AF"
        // Esparce el resto de props (value, onChangeText, placeholder...).
        {...props}
      />
      {/* Mensaje de error en rojo debajo del campo (solo si hay error). */}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor: deja espacio debajo de cada campo.
  wrapper: { marginBottom: 14 },
  // Etiqueta pequeña en negrita.
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  // Caja del input: fondo blanco, borde gris, esquinas redondeadas.
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },
  // Borde rojo cuando hay error.
  inputError: { borderColor: "#EF4444" },
  // Texto del mensaje de error.
  error: { color: "#EF4444", fontSize: 12, marginTop: 4 },
});
