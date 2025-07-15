/**
 * StyleService - Servicio para manejar estilos y configuraciones de layout
 * Sigue el principio de Responsabilidad Única (SRP) al centralizar la lógica de estilos
 * Sigue el principio Abierto/Cerrado (OCP) permitiendo extensión sin modificación
 */
export class StyleService {
  /**
   * Aplica estilos para layout de pantalla completa
   * @param {string} elementId - ID del elemento a modificar
   */
  static applyFullScreenLayout(elementId = 'root') {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.maxWidth = '100%';
      element.style.margin = '0';
      element.style.padding = '0';
      element.style.textAlign = 'left';
      element.style.height = '100vh';
      element.style.width = '100vw';
    }
  }

  /**
   * Aplica estilos para el body para layout de aplicación
   */
  static applyBodyStyles() {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.display = 'block';
    document.body.style.minHeight = '100vh';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  /**
   * Resetea estilos por defecto que interfieren con el layout
   */
  static resetDefaultStyles() {
    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }
      
      #root {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        max-width: none;
        text-align: left;
        display: flex;
        flex-direction: column;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Inicializa todos los estilos necesarios para la aplicación
   */
  static initializeAppStyles() {
    this.resetDefaultStyles();
    this.applyBodyStyles();
    this.applyFullScreenLayout();
  }
}