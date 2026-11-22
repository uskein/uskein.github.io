/* ============================================================
   CATÁLOGO — Fuente única de contenido del brochure
   Script clásico (funciona también con file://, sin servidor).
   ============================================================ */
(function (root) {
  'use strict';

  const CATEGORIES = [
    { id: 'all', label: 'Todos' },
    { id: 'productividad', label: 'Productividad' },
    { id: 'bienestar', label: 'Bienestar' },
    { id: 'finanzas', label: 'Finanzas' },
    { id: 'conocimiento', label: 'Conocimiento' },
    { id: 'deporte', label: 'Deporte' },
    { id: 'campo', label: 'Campo' }
  ];

  const PRODUCTS = [
    {
      id: 'US-01', slug: 'habitos', name: 'Pulse Clay', category: 'bienestar',
      categoryLabel: 'Bienestar', platform: 'iOS · Android',
      stack: 'Expo · React Native · SQLite', status: 'available', statusLabel: 'Disponible',
      accent: '#8B78FF', image: 'habitos.svg',
      tagline: 'Rachas, metas y hitos que se sienten tuyos',
      description: 'App de hábitos local-first que convierte la constancia en un registro tangible. Sin cuentas, sin nube y sin perder un solo día de progreso. Racha con congelación, hitos con foto, medallas propias y respaldo cifrado.',
      features: [
        { title: 'Hoy, sin fricción', text: 'Marca hábitos con un toque, registra bienestar y guarda motivaciones con un gesto.' },
        { title: 'Hitos con memoria', text: 'Crea hitos con foto y detalle, y compártelos como imagen de 1080 × 1080.' },
        { title: 'Racha que aguanta', text: 'Congela tu racha dos veces al mes. Un viaje ya no rompe meses de constancia.' },
        { title: 'Respaldo cifrado', text: 'Exporta e importa con scrypt y AES-256-GCM. Tus datos viajan protegidos entre dispositivos.' },
        { title: 'PIN y biometría', text: 'Bloqueo con scrypt en SecureStore y backoff tras cinco intentos fallidos.' },
        { title: '100 % offline', text: 'SQLite es la fuente de verdad. Funciona en un avión, en el metro o sin cobertura.' }
      ],
      metrics: [{ value: '23', label: 'Flujos jugables' }, { value: '5', label: 'Pestañas' }, { value: '0', label: 'Servidores' }],
      bullets: ['APK instalable listo para probar', '23 flujos cubiertos con pruebas', 'Diseño Pulse Clay documentado'],
      demo: 'https://expo.dev/artifacts/eas/m0EBwM3O1ckRRzvggOcfwxRCAXGAgu2NMQc55QqkNmk.apk', demoLabel: 'Descargar APK',
      code: 'https://github.com/uskein/habitos',
      shots: ['Feed de hoy', 'Plan y metas', 'Top hitos', 'Vitrina de logros'],
      momentImages: ['habitos-hoy.svg', 'habitos-plan.svg', 'habitos-hitos.svg', 'habitos-logros.svg'],
      demoVideo: 'demo-habitos.mp4', services: ['movil']
    },
    {
      id: 'US-02', slug: 'inspector', name: 'INSPECTOR', category: 'campo',
      categoryLabel: 'Inspección de campo', platform: 'iOS · Android',
      stack: 'React Native · TOPO-HUD · SQLite', status: 'soon', statusLabel: 'En diseño',
      accent: '#C8FF3D', image: 'inspector.svg',
      tagline: 'Levantamiento geoespacial que no depende de la señal',
      description: 'Instrumento de inspección de instalaciones de gas bajo RITG y NTC 2505. Captura coordenadas, rutas y actas firmadas 100 % offline, y sincroniza cuando vuelve la cobertura. Diseñado para usarse con guantes, con una mano y con sol de frente.',
      features: [
        { title: 'Checklist normativo', text: 'RITG y NTC 2505 integrados. El inspector no depende de memorizar la norma.' },
        { title: 'Señal visible', text: 'Estado GPS, batería y cola de sincronización siempre a la vista. El brillo significa señal activa.' },
        { title: 'Acta firmada en sitio', text: 'Firma del titular e instalador con comprobante inmediato, sin imprimir dos veces.' },
        { title: 'Track defendible', text: 'Recorrido, marcas de tiempo y evidencia fotográfica reconstruibles en auditoría.' },
        { title: 'Store-and-forward', text: 'Todo se guarda localmente y se envía cuando hay red. Sin pérdida de datos en sótanos.' },
        { title: 'Alto contraste', text: 'Cuatro temas, incluido alto contraste, para campo con luz extrema.' }
      ],
      metrics: [{ value: '100', label: '% offline' }, { value: '22', label: 'Historias' }, { value: '4', label: 'Temas' }],
      bullets: ['Cumplimiento RITG · NTC 2505', 'Operación con guantes y una mano', 'Trazabilidad lista para auditoría'],
      demo: null, code: null,
      shots: ['Mapa con track', 'Checklist RITG', 'Firma del acta', 'Cola de sincronización'],
      momentImages: ['inspector-hoy.svg', 'inspector-plan.svg', 'inspector-hitos.svg', 'inspector-logros.svg'],
      demoVideo: 'demo-inspector.mp4', services: ['movil']
    },
    {
      id: 'US-03', slug: 'monedero', name: 'Monedero', category: 'finanzas',
      categoryLabel: 'Finanzas personales', platform: 'iOS · Android · PWA',
      stack: 'Turborepo · WebCrypto · SQLite', status: 'available', statusLabel: 'Disponible',
      accent: '#2F7D5B', image: 'monedero.svg',
      tagline: 'Tus cuentas, cifradas y en tu bolsillo',
      description: 'Gestor de gastos sin nube, sin cuentas y sin alarmas rojas. Bóveda cifrada, presupuestos mensuales y exportación `.monedero` para mover tus datos entre móvil y PWA sin que nadie más los vea.',
      features: [
        { title: 'Bóveda cifrada', text: 'Passphrase y custodia de clave en Keychain/Keystore. Bloqueo automático por inactividad.' },
        { title: '¿Cuánto queda?', text: 'Respuesta inmediata con presupuestos claros, sin rojos alarmistas.' },
        { title: 'Movimientos en segundos', text: 'Ingresos, gastos, categorías y etiquetas con mandos rápidos y silenciosos.' },
        { title: 'Exportación entre dispositivos', text: 'Formato `.monedero` con validación estricta para pasar de móvil a PWA y viceversa.' },
        { title: 'Reportes mensuales', text: 'Cierra el mes y exporta para tu asesoría sin depender de un servicio externo.' },
        { title: 'Cero telemetría', text: 'No hay analytics, ni perfiles, ni venta de datos. Tus finanzas no son un producto.' }
      ],
      metrics: [{ value: '20', label: 'Historias' }, { value: '3', label: 'Plataformas' }, { value: '0', label: 'Nube' }],
      bullets: ['Cifrado real en reposo', 'Móvil y PWA sincronizados por archivo', 'Diseño Clay Serenity'],
      demo: null, code: null,
      shots: ['Bóveda desbloqueada', 'Dashboard de balance', 'Presupuestos', 'Exportación cifrada'],
      momentImages: ['monedero-hoy.svg', 'monedero-plan.svg', 'monedero-hitos.svg', 'monedero-logros.svg'],
      demoVideo: 'demo-monedero.mp4', services: ['movil', 'web']
    },
    {
      id: 'US-04', slug: 'biblioteca', name: 'ATHENAEUM', category: 'conocimiento',
      categoryLabel: 'Conocimiento', platform: 'Escritorio local',
      stack: 'Electron · SQLite · Tiptap', status: 'available', statusLabel: 'Disponible',
      accent: '#E8A33D', image: 'biblioteca.svg',
      tagline: 'Una biblioteca que lee, anota y recuerda contigo',
      description: 'Gabinete de lectura para quien tiene cientos de libros y quiere hacerlos propios. Colecciones, anotaciones con página exacta, cuadernos Zettelkasten, grafo de conocimiento y bibliografías APA, MLA, Chicago e IEEE. Todo local y cifrado.',
      features: [
        { title: 'La cita exacta', text: 'Extrae citas con página y genera bibliografías sin salir de la biblioteca.' },
        { title: 'Zettelkasten vivo', text: 'Backlinks y grafo para que ninguna idea quede muerta ni desconectada.' },
        { title: 'Retoma donde dejaste', text: 'Progreso por libro, marcadores y modo estudio con repetición espaciada.' },
        { title: 'Lectura sin distracción', text: 'Modo sepia, grano de papel y luz ámbar de lámpara para sesiones largas.' },
        { title: 'Entrada por voz', text: 'Dicta notas y organiza tu biblioteca sin soltar el libro.' },
        { title: 'Núcleo local', text: 'Cifrado, auto-bloqueo, respaldo e i18n es → en. Ningún dato sale sin tu permiso.' }
      ],
      metrics: [{ value: '14', label: 'Épicas' }, { value: '~40', label: 'Entidades' }, { value: '3', label: 'Modos de lectura' }],
      bullets: ['Bibliografías APA/MLA/Chicago/IEEE', 'Grafo de conocimiento', 'Local-first y cifrado'],
      demo: null, code: null,
      shots: ['Estante', 'Lector sepia', 'Grafo de notas', 'Bibliografía'],
      momentImages: ['biblioteca-hoy.svg', 'biblioteca-plan.svg', 'biblioteca-hitos.svg', 'biblioteca-logros.svg'],
      demoVideo: 'demo-biblioteca.mp4', services: ['web']
    },
    {
      id: 'US-05', slug: 'classdesk', name: 'ClassDesk', category: 'deporte',
      categoryLabel: 'Deporte', platform: 'Web · iOS · Android',
      stack: 'NestJS · Prisma · React · Expo', status: 'available', statusLabel: 'Disponible',
      accent: '#3B82F6', image: 'classdesk.svg',
      tagline: 'La academia entera, de la pista a la caja',
      description: 'Gestión integral de academias deportivas: estudiantes, clases, asistencia en pista, membresías, pagos, reservas, caja/POS y reportes. Multi-tenant, con cinco roles y asistencia offline para que la instructora no pierda un dato cuando no hay señal.',
      features: [
        { title: 'Asistencia en 10 segundos', text: 'Desde la pista, con una mano y sin cobertura. La cola offline garantiza que nada se pierda.' },
        { title: 'Cobros y caja', text: 'Pagos, conciliación, POS e inventario en un solo lugar. Fin de la doble captura en Excel.' },
        { title: 'Reservas con cupo', text: 'Cupo transaccional, listas de espera y preconfirmación automática.' },
        { title: 'Cinco roles reales', text: 'Dueño, instructor, tutor, estudiante y recepción, cada uno con su vista y sus permisos.' },
        { title: 'Reportes que responden', text: 'Asistencia y financiero para saber quién pagó y quién falta, sin esperar fin de mes.' },
        { title: 'Multi-tenant', text: 'Una instancia, muchas academias, con aislamiento por academiaId y RBAC.' }
      ],
      metrics: [{ value: '13', label: 'Épicas' }, { value: '132', label: 'Criterios' }, { value: '5', label: 'Roles' }],
      bullets: ['Listo para multi-academia', 'Asistencia offline en pista', 'API documentada y probada'],
      demo: null, code: null,
      shots: ['Panel del dueño', 'Asistencia en pista', 'Agenda', 'Caja y POS'],
      momentImages: ['classdesk-hoy.svg', 'classdesk-plan.svg', 'classdesk-hitos.svg', 'classdesk-logros.svg'],
      demoVideo: 'demo-classdesk.mp4', services: ['movil', 'web', 'sistema']
    },
    {
      id: 'US-06', slug: 'diario', name: 'DiarioFit', category: 'bienestar',
      categoryLabel: 'Bienestar', platform: 'iOS · Android',
      stack: 'Expo · React Native · SQLite', status: 'available', statusLabel: 'Disponible',
      accent: '#3E6B60', image: 'diario.svg',
      tagline: 'El día y el entrenamiento, en la misma bitácora',
      description: 'Diario y gimnasio unificados. Conecta cómo dormiste y cómo te sentiste con lo que levantaste. Correlaciones reales, detección automática de récords, fotos, voz y dibujo a mano. 100 % local, sin cuenta y sin nube.',
      features: [
        { title: 'Correlaciones', text: '«Los días que dormiste más de 7 h, tu esfuerzo bajó X puntos». El diferencial de DiarioFit.' },
        { title: 'Diario en segundos', text: 'Ánimo, energía, gratitud, etiquetas automáticas y plantillas guiadas.' },
        { title: 'Gimnasio serio', text: '39 ejercicios, rutinas, series en un toque, RPE y temporizador de descanso.' },
        { title: 'Récords automáticos', text: 'La app detecta tus PR y lo celebra. Historial de «última vez» mientras entrenas.' },
        { title: 'Multimedia', text: 'Fotos comprimidas, notas de voz y sketch vectorial asociados a la entrada del día.' },
        { title: 'Mi año en color', text: 'Un mosaico con tu ánimo diario; tu vida vista de un vistazo.' }
      ],
      metrics: [{ value: '39', label: 'Ejercicios' }, { value: '100', label: '% local' }, { value: '4', label: 'Estados por pantalla' }],
      bullets: ['Diario + gimnasio en una app', 'Sin cuentas ni analytics', 'Exportación y borrado total'],
      demo: null, code: null,
      shots: ['Hoy', 'Entrada del diario', 'Sesión en vivo', 'Mi año'],
      momentImages: ['diario-hoy.svg', 'diario-plan.svg', 'diario-hitos.svg', 'diario-logros.svg'],
      demoVideo: 'demo-diario.mp4', services: ['movil']
    },
    {
      id: 'US-07', slug: 'galeria', name: 'Galería de Estudio', category: 'conocimiento',
      categoryLabel: 'Conocimiento', platform: 'iOS · Android · Tablet',
      stack: 'Expo · SQLite FTS5 · Zustand', status: 'available', statusLabel: 'Disponible',
      accent: '#7FA0FF', image: 'real-galeria.png',
      tagline: 'Tu archivo visual privado, anotado al segundo',
      description: 'Archivo visual local-first para estudiar imágenes y videos. Colecciones anotadas, notas ancladas al segundo y al píxel, bucle A–B, velocidad con preservación de tono, etiquetas jerárquicas y repetición espaciada. Como un depósito visitable, pero solo para ti.',
      features: [
        { title: 'Notas en el segundo', text: 'Crea una nota en el instante exacto y vuelve a él con un toque, sin animación.' },
        { title: 'Bucle A–B', text: 'Repite solo el fragmento que necesitas, con velocidad de 0,5× a 3× y tono preservado.' },
        { title: 'Anotación no destructiva', text: 'Flechas, círculos y texto sobre imágenes guardados como capas JSON. El original intacto.' },
        { title: 'Etiquetas jerárquicas', text: 'Pertenencia múltiple y búsqueda FTS5 sobre assets, notas y colecciones.' },
        { title: 'Repetición espaciada', text: 'Marca «por repasar» y la app te lo devuelve el día justo.' },
        { title: 'Pomodoro integrado', text: 'Ciclos de foco que pausan el video y registran tu tiempo de estudio.' }
      ],
      metrics: [{ value: '10', label: 'Épicas' }, { value: '1 px', label: 'Junta de mortero' }, { value: '0', label: 'Radios' }],
      bullets: ['Estudio visual con notas ancladas', 'Búsqueda full-text local', 'Exportación a PDF'],
      demo: null, code: null,
      shots: ['Muro de colección', 'Video anotado', 'Línea de tiempo', 'Reporte PDF'],
      momentImages: ['galeria-hoy.svg', 'galeria-plan.svg', 'galeria-hitos.svg', 'galeria-logros.svg'],
      demoVideo: 'demo-galeria.mp4', services: ['movil']
    },
    {
      id: 'US-08', slug: 'lector', name: 'Lumen', category: 'conocimiento',
      categoryLabel: 'Conocimiento', platform: 'iOS · Android',
      stack: 'Expo · React Native · SQLite', status: 'available', statusLabel: 'Disponible',
      accent: '#C44B22', image: 'real-lector.png',
      tagline: 'Tu biblioteca, en calma; un libro nuevo siempre a mano',
      description: 'Lector de EPUB3 y PDF con biblioteca personal offline. Importa archivos sueltos o carpetas completas, retoma siempre donde lo dejaste, ajusta tipografía y contraste, y descubre qué leer después sin salir de la app. Sin cuentas, sin DRM y sin sincronización forzada.',
      features: [
        { title: 'Importa tu biblioteca', text: 'Archivos sueltos o una carpeta local completa, con progreso y detección de duplicados.' },
        { title: 'No pierdes la página', text: 'Progreso y hábito visibles. Retomas exactamente donde lo dejaste.' },
        { title: 'Lee como necesitas', text: 'Tipografía, tamaño, contraste y temas sepia y tinta. VoiceOver y lector de pantalla.' },
        { title: 'Modo calma', text: 'Una superficie sin ruido para que el libro sea lo único que importa.' },
        { title: 'Centro de anotaciones', text: 'Todas tus notas y marcadores en un solo lugar, con búsqueda dentro del libro.' },
        { title: 'Colecciones propias', text: 'Organiza por estanterías hechas a tu medida, sin algoritmos que decidan por ti.' }
      ],
      metrics: [{ value: 'EPUB3', label: '+ PDF' }, { value: '21', label: 'Historias' }, { value: '0', label: 'Cuentas' }],
      bullets: ['Sin DRM ni compras', 'Accesibilidad de serie', 'Modo calma y colecciones'],
      demo: null, code: null,
      shots: ['Biblioteca', 'Lector sepia', 'Anotaciones', 'Descubrimiento'],
      momentImages: ['lector-hoy.svg', 'lector-plan.svg', 'lector-hitos.svg', 'lector-logros.svg'],
      demoVideo: 'demo-lector.mp4', services: ['movil']
    },
    {
      id: 'US-09', slug: 'voynich', name: 'Voynich Codex', category: 'conocimiento',
      categoryLabel: 'Conocimiento', platform: 'Web local',
      stack: 'React · SQLite · React Flow', status: 'beta', statusLabel: 'Beta',
      accent: '#D4A017', image: 'real-voynich.png',
      tagline: 'World-building y manuscritos, sin salir de tu equipo',
      description: 'Plataforma local de world-building y gestión de manuscritos. Personajes, lugares, líneas de tiempo y documentos conectados en un grafo editable, con SQLite como fuente de verdad y sin Docker. Para quien construye mundos y necesita que nada se pierda entre notas.',
      features: [
        { title: 'Grafo editable', text: 'Conecta personajes, lugares y eventos en un lienzo que puedes reorganizar a mano.' },
        { title: 'Manuscritos', text: 'Organiza borradores, versiones y notas con trazabilidad de cada decisión.' },
        { title: 'SQLite local', text: 'Toda la información vive en tu equipo. Sin contenedores ni servicios externos.' },
        { title: 'Líneas de tiempo', text: 'Visualiza la cronología de tu mundo y detecta inconsistencias de un vistazo.' },
        { title: 'Tipografía editorial', text: 'Cormorant Garamond y JetBrains Mono para leer y escribir con claridad.' },
        { title: 'Sin infraestructura', text: 'Arranca con un comando. No necesitas Docker, servidor ni cuenta.' }
      ],
      metrics: [{ value: '1', label: 'Comando' }, { value: '0', label: 'Docker' }, { value: '∞', label: 'Mundos' }],
      bullets: ['Grafo interactivo', 'Todo en SQLite local', 'Sin Docker ni servidores'],
      demo: null, code: null,
      shots: ['Grafo de mundo', 'Manuscrito', 'Línea de tiempo', 'Personajes'],
      momentImages: ['voynich-hoy.svg', 'voynich-plan.svg', 'voynich-hitos.svg', 'voynich-logros.svg'],
      demoVideo: 'demo-voynich.mp4', services: ['web']
    },
    {
      id: 'US-10', slug: 'estilos', name: 'Kit de Estilos Visuales', category: 'productividad',
      categoryLabel: 'Productividad', platform: 'Web · JSON DTCG',
      stack: 'HTML autocontenido · Tokens W3C', status: 'available', statusLabel: 'Disponible',
      accent: '#FF6A2B', image: 'estilos.svg',
      tagline: 'Cuatro sistemas de diseño listos para aplicar',
      description: 'Biblioteca de sistemas visuales reutilizables: TOPO-HUD, ISO-SOLAR, ATHENAEUM y AURORA CODEX. Cada estilo trae un prototipo vivo sin build, especificación técnica y tokens W3C DTCG importables. Contraste AA verificado en 28 de 28 pares.',
      features: [
        { title: 'Cuatro mundos', text: 'Cartografía eléctrica, facetas minerales, biblioteca editorial y vidrio nocturno.' },
        { title: 'Prototipos vivos', text: 'HTML autocontenido que se abre sin servidor, build ni conexión.' },
        { title: 'Tokens DTCG', text: 'JSON en formato W3C listo para importar en tu design system.' },
        { title: 'Contraste verificado', text: '28 de 28 pares conformes, AA y AAA, en ambos temas.' },
        { title: 'Simuladores reales', text: 'Señal GPS, track, mapa animado y verificador de contraste interactivo.' },
        { title: 'Accesibilidad de serie', text: 'Targets de 48 px, foco visible, reduced-motion y sin scroll horizontal.' }
      ],
      metrics: [{ value: '4', label: 'Sistemas' }, { value: '28/28', label: 'Pares AA' }, { value: '0', label: 'Dependencias' }],
      bullets: ['Tokens W3C DTCG importables', 'Prototipos sin build', 'Auditoría de contraste incluida'],
      demo: null, code: null,
      shots: ['TOPO-HUD', 'ISO-SOLAR', 'ATHENAEUM', 'AURORA CODEX'],
      momentImages: ['estilos-hoy.svg', 'estilos-plan.svg', 'estilos-hitos.svg', 'estilos-logros.svg'],
      demoVideo: 'demo-estilos.mp4', services: ['web']
    }
  ];

  function getProduct(slug) {
    return PRODUCTS.find(function (p) { return p.slug === slug; });
  }

  function getAdjacent(slug) {
    var i = PRODUCTS.findIndex(function (p) { return p.slug === slug; });
    return {
      prev: PRODUCTS[(i - 1 + PRODUCTS.length) % PRODUCTS.length],
      next: PRODUCTS[(i + 1) % PRODUCTS.length]
    };
  }

  root.USKEIN_DATA = { CATEGORIES: CATEGORIES, PRODUCTS: PRODUCTS, getProduct: getProduct, getAdjacent: getAdjacent };
})(typeof window !== 'undefined' ? window : globalThis);
