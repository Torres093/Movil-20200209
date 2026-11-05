// =============================================================================
// src/screens/Home.jsx  →  PANTALLA PRINCIPAL
// =============================================================================
// Alterna entre dos vistas usando UN solo estado ("student"):
//   student === null  → muestra el FORMULARIO (StudentForm)
//   student con datos → muestra el PERFIL (StudentProfile)
// Además tiene un botón para navegar a la pantalla "Datos" (la lista de la API).
// =============================================================================
import React, { useState } from "react";
// ScrollView: permite desplazar si el contenido no cabe.
// KeyboardAvoidingView: evita que el teclado tape los campos.
// Platform: detecta si es "ios" o "android".
import { ScrollView, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import StudentForm from "../components/StudentForm";
import StudentProfile from "../components/StudentProfile";
import Button from "../components/Button";

// "navigation" llega automáticamente por ser una pantalla del Stack Navigator.
export default function Home({ navigation }) {
  // Estudiante guardado. Empieza en null (aún no se ha registrado nadie).
  const [student, setStudent] = useState(null);

  return (
    // En iOS el teclado necesita "padding" para empujar el contenido; en
    // Android no hace falta (undefined).
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* keyboardShouldPersistTaps="handled": permite tocar botones sin cerrar
          primero el teclado. */}
      <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Título dinámico según haya o no estudiante. */}
        <Text style={styles.heading}>{student ? "Perfil del estudiante" : "Nuevo estudiante"}</Text>

        {/* RENDER CONDICIONAL con operador ternario:
            - Si hay estudiante → perfil. onEdit pone student en null → vuelve al formulario.
            - Si no hay → formulario. onSubmit={setStudent} guarda el formulario
              completo como estudiante cuando la validación pasa. */}
        {student ? (
          <StudentProfile student={student} onEdit={() => setStudent(null)} />
        ) : (
          <StudentForm onSubmit={setStudent} />
        )}

        {/* Navega a la pantalla "Datos". El nombre debe coincidir EXACTO con el
            name del Stack.Screen en Navigation.js. */}
        <View style={{ marginTop: 20 }}>
          <Button title="Ir a la lista de datos →" onPress={() => navigation.navigate("Datos")} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 26, fontWeight: "800", color: "#111827", marginBottom: 16 },
});
