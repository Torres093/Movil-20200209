// =============================================================================
// src/components/StudentForm.jsx  →  FORMULARIO DE REGISTRO DE ESTUDIANTE
// =============================================================================
// Tiene 3 campos (nombre, carnet, sección), los valida y, si todo está bien,
// le entrega los datos a Home mediante la prop onSubmit.
// Concepto clave: "levantar el estado" (lifting state up). El formulario no
// guarda al estudiante; se lo manda a su padre (Home) con onSubmit(form).
// =============================================================================
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import Button from "./Button";

// onSubmit: función que viene de Home (en Home es setStudent).
export default function StudentForm({ onSubmit }) {
  // Estado con los valores de los 3 campos, todos iniciando vacíos.
  const [form, setForm] = useState({ nombre: "", carnet: "", seccion: "" });
  // Estado con los errores de validación, por campo. Ej: { nombre: "Ingresa el nombre" }
  const [errors, setErrors] = useState({});

  // Actualiza UN solo campo sin perder los demás:
  //  - key entre corchetes [key] = nombre dinámico de la propiedad
  //  - ...prev copia lo anterior y luego se sobreescribe el campo cambiado
  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // Revisa que ningún campo esté vacío. Devuelve true si todo es válido.
  const validate = () => {
    const e = {};
    // trim() quita espacios: así "   " cuenta como vacío.
    if (!form.nombre.trim()) e.nombre = "Ingresa el nombre";
    if (!form.carnet.trim()) e.carnet = "Ingresa el carnet";
    if (!form.seccion.trim()) e.seccion = "Ingresa la sección";
    // Guarda los errores para que se muestren en pantalla.
    setErrors(e);
    // Si el objeto e no tiene claves, no hubo errores → válido.
    return Object.keys(e).length === 0;
  };

  // Al presionar "Guardar": solo si es válido se envía el formulario al padre.
  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Registro de estudiante</Text>
      {/*
        Cada Input es un "componente controlado":
          value        → muestra lo que hay en el estado
          onChangeText → cada vez que se escribe, actualiza el estado
          error        → muestra el mensaje rojo si falló la validación
          autoCapitalize="characters" → teclado en MAYÚSCULAS (carnet y sección)
      */}
      <Input label="Nombre completo" value={form.nombre} onChangeText={(v) => setField("nombre", v)} placeholder="David Alejandro" error={errors.nombre} />
      <Input label="Carnet" value={form.carnet} onChangeText={(v) => setField("carnet", v)} placeholder="20220354" autoCapitalize="characters" error={errors.carnet} />
      <Input label="Sección" value={form.seccion} onChangeText={(v) => setField("seccion", v)} placeholder="A-3" autoCapitalize="characters" error={errors.seccion} />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Tarjeta gris claro que contiene el formulario.
  card: { backgroundColor: "#F9FAFB", borderRadius: 16, padding: 20 },
  title: { fontSize: 20, fontWeight: "800", color: "#111827", marginBottom: 18 },
});
