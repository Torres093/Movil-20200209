// =============================================================================
// src/components/Button.jsx  →  BOTÓN REUTILIZABLE
// =============================================================================
// Componente propio que se usa en Home, Datos, StudentForm y StudentProfile.
// Props que recibe:
//   title    → texto del botón
//   onPress  → función que se ejecuta al tocarlo
//   variant  → "primary" (azul, por defecto) o "secondary" (azul claro)
//   loading  → si es true muestra un spinner y se bloquea
//   disabled → si es true se bloquea y se ve opaco
//   style    → estilos extra que se le pasan desde afuera
// =============================================================================
import React from "react";
// TouchableOpacity: área tocable que baja su opacidad al presionar.
// ActivityIndicator: spinner de carga.
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function Button({ title, onPress, variant = "primary", loading, disabled, style }) {
  // true si el botón es de tipo secundario.
  const secondary = variant === "secondary";
  return (
    <TouchableOpacity
      onPress={onPress}
      // No se puede tocar si está disabled o cargando.
      disabled={disabled || loading}
      // Opacidad al presionar (0.8 = 80%).
      activeOpacity={0.8}
      // Se pasa un ARREGLO de estilos; los últimos tienen prioridad:
      //  1) base  2) primario o secundario  3) opaco si está bloqueado
      //  4) estilos externos (prop style)
      style={[styles.btn, secondary ? styles.secondary : styles.primary, (disabled || loading) && styles.disabled, style]}
    >
      {/* Si está cargando muestra spinner; si no, el texto del botón. */}
      {loading ? (
        <ActivityIndicator color={secondary ? "#4F46E5" : "#fff"} />
      ) : (
        <Text style={[styles.text, secondary && styles.textSecondary]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

// StyleSheet.create: define los estilos (equivalente a CSS en React Native).
const styles = StyleSheet.create({
  // Forma base: padding vertical, esquinas redondeadas, contenido centrado.
  btn: { paddingVertical: 14, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  // Botón principal: fondo azul.
  primary: { backgroundColor: "#469de5" },
  // Botón secundario: fondo azul muy claro.
  secondary: { backgroundColor: "#EEF2FF" },
  // Aspecto de bloqueado.
  disabled: { opacity: 0.6 },
  // Texto blanco para el botón principal.
  text: { color: "#fff", fontSize: 15, fontWeight: "700" },
  // Texto azul para el botón secundario.
  textSecondary: { color: "#469de5" },
});
