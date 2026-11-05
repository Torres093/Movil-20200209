// =============================================================================
// src/screens/Datos.jsx  →  PANTALLA QUE CONSUME LA API Y MUESTRA LA LISTA
// =============================================================================
// ★★★ ESTA ES LA PANTALLA QUE HAY QUE MODIFICAR PARA CONSUMIR OTRA API ★★★
//
// Flujo:
//   1) Se define la URL de la API (API_URL).
//   2) useApi(API_URL) hace el fetch y devuelve data / loading / error / reload.
//   3) Según el estado se muestra: spinner (cargando) | error + botón reintentar
//      | FlatList con una tarjeta por cada elemento.
//
// ┌──────────────────── CHECKLIST PARA CAMBIAR DE API ─────────────────────┐
// │ 1) Cambiar API_URL (justo debajo).                                     │
// │ 2) Si la lista NO viene como arreglo directo, revisar useApi.js        │
// │    (línea "const list = ...", cambiar "items" por results/data...).    │
// │ 3) En renderItem cambiar los campos (item.xxx) por los de la nueva API │
// │    (mirar el JSON de la API en el navegador para ver sus nombres).     │
// │ 4) Cuidar los campos que pueden venir null (imagen, rating...).        │
// │ 5) keyExtractor: usar el campo que sea único (normalmente "id").       │
// └─────────────────────────────────────────────────────────────────────────┘
// =============================================================================
import React from "react";
// FlatList: lista optimizada (solo dibuja lo visible).
// ActivityIndicator: spinner de carga.
// Image: muestra imágenes.
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import useApi from "../hooks/useApi";
import Button from "../components/Button";

// ★ PASO 1 — CAMBIAR AQUÍ LA URL PARA CONSUMIR OTRA API ★
// Actualmente: API de TVMaze, que devuelve un ARREGLO de series de TV.
// Ejemplos de otras APIs:
//   "https://rickandmortyapi.com/api/character"  (lista en json.results)
//   "https://pokeapi.co/api/v2/pokemon"          (lista en json.results)
//   "https://jsonplaceholder.typicode.com/posts" (arreglo directo)
const API_URL = "https://api.tvmaze.com/shows";

// "navigation" se usa al final para volver a Home.
export default function Datos({ navigation }) {
  // Se llama al hook con la URL. Desestructuramos lo que devuelve:
  //  data    → arreglo de elementos
  //  loading → true mientras carga
  //  error   → texto del error o null
  //  reload  → función para reintentar
  const { data, loading, error, reload } = useApi(API_URL);

  // Función que dibuja CADA tarjeta de la lista. FlatList la llama una vez por
  // elemento y le pasa { item } (el objeto actual).
  //
  // ★ PASO 3 — CAMBIAR AQUÍ LOS CAMPOS (item.xxx) SEGÚN LA NUEVA API ★
  // Con TVMaze, "item" es una serie con esta forma:
  //   { id, name, language, rating: { average }, url, premiered, image: { original } }
  // Equivalencias de lo que se muestra hoy:
  //   item.image.original → imagen de la serie
  //   item.name           → título
  //   item.language       → idioma (en el círculo verde)
  //   item.rating.average → calificación (en el círculo amarillo)
  //   item.url            → enlace (se muestra como "descripción")
  //   item.premiered      → fecha de estreno
  //
  // ⚠ CUIDADO: en TVMaze algunas series tienen image = null y rating.average = null.
  //   Con eso item.image.original puede romper la app (error "cannot read
  //   property of null"). Se evita con encadenamiento opcional: item.image?.original
  //   (no se cambió el código; solo se deja anotado para que lo sepas).
  const renderItem = ({ item }) => (
    // Tarjeta de cada elemento.
    <View style={styles.card}>
      {/* Imagen: la fuente remota se pasa como { uri: "..." }.
          resizeMode="cover" → llena el espacio recortando lo que sobre. */}
      <Image source={{ uri: item.image.original }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        {/* Fila del título: nombre a la izquierda; idioma y rating a la derecha. */}
        <View style={styles.titleRow}>
          {/* numberOfLines={1}: si el nombre es largo se corta con "..." */}
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          {/* Insignia verde con el idioma. (badgeAlive es un nombre heredado de
              otro proyecto; solo define el fondo verde.) */}
          <View style={[styles.badge, styles.badgeAlive]}>
            <Text style={[styles.badgeText, styles.badgeAlive]}>
              {item.language}
            </Text>
          </View>
          {/* Insignia amarilla con la calificación promedio. */}
          <View style={[styles.rating, styles.badge]}>
            <Text>{item.rating.average}</Text>
          </View>
        </View>
        {/* Máximo 4 líneas de texto. Hoy muestra la URL de la serie. */}
        <Text style={styles.description} numberOfLines={4}>{item.url}</Text>
        {/* Fecha de estreno. */}
        <Text>{item.premiered}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Datos</Text>

      {/* TRES ESTADOS POSIBLES (ternarios anidados):
          1. loading → spinner
          2. error   → mensaje en rojo + botón "Reintentar" (llama a reload)
          3. éxito   → FlatList con los datos */}
      {loading ? (
        <ActivityIndicator size="large" color="#469de5" style={{ marginTop: 40 }} />
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>Error: {error}</Text>
          <Button title="Reintentar" onPress={reload} style={{ marginTop: 12 }} />
        </View>
      ) : (
        // FlatList props:
        //  data               → arreglo a mostrar
        //  keyExtractor       → clave ÚNICA por elemento (React la necesita).
        //                       Usa item.id y, si no existe, el índice. ★ PASO 5
        //  renderItem         → cómo dibujar cada elemento (función de arriba)
        //  refreshing/onRefresh → "jalar para refrescar" (pull-to-refresh) que
        //                       vuelve a llamar a la API
        //  ListEmptyComponent → qué mostrar si el arreglo está vacío
        //  contentContainerStyle → espacio extra al final de la lista
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={reload}
          ListEmptyComponent={<Text style={styles.empty}>No hay datos todavía.</Text>}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      {/* Vuelve a la pantalla Home. */}
      <Button title="← Volver al formulario" variant="secondary" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

// Estilos de la pantalla. Algunos (badgeDestroyed, badgeTextDestroyed,
// badgeTextAlive) no se usan: son sobrantes de otro proyecto y no afectan.
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 20 },
  heading: { fontSize: 26, fontWeight: "800", color: "#111827", marginBottom: 16 },
  // Tarjeta blanca con sombra; overflow hidden para que la imagen respete las esquinas.
  card: { backgroundColor: "#fff", borderRadius: 16, marginBottom: 14, overflow: "hidden", elevation: 2, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 } },
  image: { width: "100%", height: 160, backgroundColor: "#E5E7EB" },
  info: { padding: 14 },
  // Fila horizontal (flexDirection row) con elementos separados en los extremos.
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  name: { flex: 1, fontSize: 18, fontWeight: "800", color: "#111827", marginRight: 8 },
  // Forma de "píldora": borderRadius muy grande.
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  badgeDestroyed: { backgroundColor: "#FEE2E2" },
  badgeAlive: { backgroundColor: "#DCFCE7" },
  badgeText: { fontSize: 12, fontWeight: "700" },
  badgeTextDestroyed: { color: "#B91C1C" },
  // Fondo amarillo para la calificación.
  rating: {backgroundColor: "#ffee00"},
  badgeTextAlive: { color: "#15803D" },
  description: { fontSize: 13, color: "#4B5563", lineHeight: 19 },
  center: { alignItems: "center", marginTop: 30 },
  error: { color: "#EF4444", textAlign: "center" },
  empty: { textAlign: "center", color: "#6B7280", marginTop: 40 },
});
