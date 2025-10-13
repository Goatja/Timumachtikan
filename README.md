
# Timumachtikan Nawat (Versión Beta)

¡Yek Shiajsij! Bienvenido a Timumachtikan Nawat, una aplicación web de código abierto dedicada a la enseñanza y revitalización del idioma Náhuat Pipil de El Salvador. Este proyecto nace como un esfuerzo por ofrecer herramientas modernas, interactivas y accesibles para que cualquier persona pueda comenzar su viaje en el aprendizaje de esta valiosa lengua ancestral.

Esta aplicación es actualmente una **versión Beta**, lo que significa que está en desarrollo activo. ¡Tus sugerencias y contribuciones son bienvenidas!

## ✨ Características Principales

- **Lecciones por Niveles:** Aprende de forma progresiva con lecciones organizadas en niveles **Básico, Intermedio y Avanzado**.
- **Diccionario Interactivo:** Un diccionario con más de 200 palabras donde los resultados aparecen dinámicamente a medida que buscas.
- **Juegos Educativos:** Refuerza tu conocimiento con 4 juegos diferentes:
    - **Memorama:** El clásico juego de memoria para emparejar palabras en Náhuat y Español.
    - **Quiz Rápido:** Una prueba de opción múltiple para evaluar tu vocabulario.
    - **Palabra Revuelta:** Ordena las letras de una palabra en Náhuat con una pista en Español.
    - **Completar la Frase:** Un reto más avanzado para rellenar la palabra que falta en una oración.
- **Diseño Moderno y Responsivo:** Una interfaz limpia y adaptable a dispositivos móviles y de escritorio, construida con Flowbite.
- **Datos Externalizados:** El contenido de las lecciones y el diccionario se gestiona a través de archivos `JSON` para un mantenimiento más sencillo.

## 🛠️ Tecnologías Utilizadas

- **HTML5**
- **CSS3** con **Tailwind CSS** a través de la librería de componentes **[Flowbite](https://flowbite.com/)**.
- **JavaScript (ES6+)** para la interactividad, la carga de datos y la lógica de los juegos.
- **Google Fonts** para la tipografía (Lora y Roboto).

## 📂 Estructura del Proyecto

```
/
├── data/
│   ├── dictionary.json   # Contiene todas las palabras del diccionario
│   └── lessons.json      # Contiene todas las lecciones y su vocabulario
├── css/
│   └── style.css         # Estilos personalizados y ajustes
├── js/
│   └── app.js            # Lógica principal de la aplicación
├── index.html            # Página de inicio
├── lecciones.html        # Página de lecciones
├── juegos.html           # Página de juegos
├── diccionario.html      # Página del diccionario
├── contacto.html         # Página de contacto
└── README.md             # Este archivo
```

## 🚀 Cómo Usarlo Localmente

Este es un proyecto de sitio estático. No requiere un servidor complejo ni pasos de compilación.

1.  Clona o descarga este repositorio.
2.  Abre cualquiera de los archivos `.html` (se recomienda empezar con `index.html`) en tu navegador web preferido (como Chrome, Firefox, etc.).

¡Y eso es todo! La aplicación se ejecutará localmente.



## ❤️ Créditos y Agradecimientos

- **Desarrollador Principal:** [Jorge Galdamez (Goatja)](https://github.com/Goatja)
- **Inspiración y Fuente de Datos:** Este proyecto no sería posible sin el increíble trabajo de la iniciativa **[Timumachtikan Nawat](https://www.timumachtikan.com/)**. Se han utilizado muchos de sus recursos y vocabulario como base para el contenido de esta aplicación.

