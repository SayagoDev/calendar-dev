# 📅 Calendar;dev - Clon de Calendly

Una aplicación moderna de agendamiento de citas con integración de Google Calendar, construida con las últimas tecnologías web.

## 🎯 Descripción

Calendar;dev es un sistema completo de gestión de citas que permite a los usuarios:

- Crear y gestionar eventos personalizados
- Configurar disponibilidad horaria semanal
- Compartir enlaces de reserva
- Sincronizar automáticamente con Google Calendar
- Gestionar múltiples zonas horarias

## 🚀 Demo en Vivo

[Enlace a la demo](https://calendar.sayago.dev/)

## ⚠️ Nota sobre Google OAuth

Esta aplicación **no ha sido verificada** por Google ya que es un proyecto de portafolio y demostración.

Al iniciar sesión por primera vez, verás una advertencia que dice: _"Esta app no está verificada"_. Esto es completamente normal y esperado para aplicaciones en desarrollo o prueba.

**Para continuar de forma segura:**

1. Haz clic en **"Avanzado"**
2. Luego en **"Ir a Calendar;dev (no seguro)"**
3. Autoriza los permisos necesarios

Para fines de demostración, la app funciona perfectamente en modo no verificado.

## 🛠️ Stack Tecnológico

### Frontend

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Biblioteca UI con Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles y sin estilos
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod](https://zod.dev/)** - Validación de schemas TypeScript-first
- **[date-fns](https://date-fns.org/)** - Manipulación de fechas
- **[Lucide React](https://lucide.dev/)** - Iconos

### Backend

- **[Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)** - Mutaciones server-side
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM TypeScript-first
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional
- **[Clerk](https://clerk.com/)** - Autenticación y gestión de usuarios
- **[Google Calendar API](https://developers.google.com/calendar)** - Integración con calendarios

## 🏗️ Arquitectura y Patrones

### Arquitectura de Carpetas

```
src/
├── app/                      # App Router de Next.js
│   ├── (auth)/              # Grupo de rutas - Autenticación
│   ├── (private)/           # Grupo de rutas - Área privada
│   ├── (public)/            # Grupo de rutas - Área pública
│   ├── schema/              # Schemas de validación Zod
│   └── server/              # Server Actions y lógica de servidor
│       ├── actions/         # Mutaciones (create, update, delete)
│       └── googleCalendar.ts # Integración Google Calendar API
├── components/              # Componentes React
│   ├── forms/              # Formularios reutilizables
│   └── ui/                 # Componentes UI base (Radix + Tailwind)
├── data/                   # Capa de acceso a datos
│   └── user/              # Queries relacionadas con usuarios
├── drizzle/               # ORM y migraciones
│   ├── schema.ts          # Definición de tablas
│   └── migrations/        # Migraciones SQL versionadas
└── lib/                   # Utilidades y helpers
```

## 🚀 Instalación Local

### Prerrequisitos

- Node.js 20+
- PostgreSQL 14+
- Cuenta de Clerk (gratuita)
- Google Cloud Console project con Calendar API habilitado

### Variables de Entorno

Crea un archivo `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/calendly_clone"

# Clerk (https://clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Google OAuth (https://console.cloud.google.com/)
GOOGLE_OAUTH_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_OAUTH_CLIENT_SECRET="your-client-secret"
GOOGLE_OAUTH_REDIRECT_URL="https://your-domain.com/oauth/callback"
```

### Comandos

```bash
# Instalar dependencias
pnpm install

# Configurar base de datos
pnpm db:generate  # Generar migraciones
pnpm db:migrate   # Ejecutar migraciones

# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start
```
