// =============================================================================
// index.js  →  PUNTO DE ENTRADA (declarado en package.json: "main": "index.js")
// =============================================================================

// registerRootComponent es la función de Expo que "arranca" la app.
import { registerRootComponent } from 'expo';

// Importamos el componente raíz (App.js).
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

// Registra <App /> como componente raíz. Funciona igual en Expo Go y en un
// build nativo (APK/IPA). Es lo que hace que la app "arranque".
registerRootComponent(App);
