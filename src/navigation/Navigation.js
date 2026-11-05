// =============================================================================
// src/navigation/Navigation.js  →  NAVEGACIÓN ENTRE PANTALLAS
// =============================================================================
// Usa React Navigation con un "Stack" (pila): cada pantalla nueva se apila
// encima de la anterior y el botón "atrás" regresa a la anterior.
// Pantallas de la app:  Home (formulario/perfil)  y  Datos (lista de la API).
// =============================================================================

// NavigationContainer: contenedor OBLIGATORIO que guarda el estado de navegación.
// Debe envolver a todos los navegadores.
import {NavigationContainer} from "@react-navigation/native"

// createNativeStackNavigator: crea el navegador tipo pila (usa transiciones nativas).
import {createNativeStackNavigator} from "@react-navigation/native-stack"

// Pantallas que se registran en el navegador.
import Home from "../screens/Home"
import Datos from "../screens/Datos"


// Stack contiene dos componentes: Stack.Navigator y Stack.Screen.
const Stack = createNativeStackNavigator()

export default function Navigation() {
    return (
        // Envoltorio global de la navegación.
        <NavigationContainer>
            {/*
              Stack.Navigator = el navegador.
              - initialRouteName="Home": la primera pantalla que se ve.
              - screenOptions: estilos que aplican a TODAS las pantallas:
                  headerStyle → color de fondo de la barra superior (azul #469de5)
                  headerTintColor → color del título y de la flecha de volver (blanco)
            */}
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerStyle: { backgroundColor: "#469de5" }, headerTintColor: "#fff" }}
            >
                {/*
                  Stack.Screen = una pantalla.
                  - name: el nombre con el que se navega: navigation.navigate("Datos")
                  - component: el componente que se dibuja
                  - options.title: texto que sale en la barra superior
                  Cada pantalla recibe automáticamente la prop "navigation".
                */}
                <Stack.Screen name="Home" component={Home} options={{ title: "Home"}}/>
                <Stack.Screen name="Datos" component={Datos} options={{ title: "Datos"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
