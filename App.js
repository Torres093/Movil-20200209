// =============================================================================
// App.js  →  COMPONENTE RAÍZ DE LA APLICACIÓN
// =============================================================================
// Es lo primero que se renderiza (lo registra index.js).
// Aquí NO hay lógica: solo se muestra el sistema de navegación.
// Toda la app "cuelga" de <Navigation />.
// =============================================================================

// StatusBar de Expo (barra de arriba del celular: hora, batería...).
// Está importada pero NO se usa en este archivo (import sobrante, no afecta).
import { StatusBar } from 'expo-status-bar';

// Componentes básicos de React Native. Tampoco se usan aquí (imports sobrantes).
import { StyleSheet, Text, View } from 'react-native';

// Nuestro componente que define las pantallas y cómo se navega entre ellas.
import Navigation from './src/navigation/Navigation';

// Componente principal. Solo devuelve el navegador.
export default function App() {
  return <Navigation />
}
