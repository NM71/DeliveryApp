# Delivery App

A React Native delivery app with modern UI components and clean architecture.

## Project Structure

```
src/
├── common/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button component
│   │   └── index.ts            # Component exports
│   ├── constants/
│   │   ├── colors.ts           # Color definitions
│   │   ├── units.ts            # Spacing, typography, borders
│   │   └── index.ts            # Constants exports
│   ├── index.ts                # Main common exports
│   └── styles/                 # Future stylesheets
├── navigation/
│   ├── StackNavigator.tsx      # Main navigation with custom tab bar
│   └── TabNavigator.tsx        # Legacy navigator (can be removed)
├── screens/
│   ├── CategoriesScreen.tsx
│   ├── HomeScreen.tsx          # Main screen with product listings
│   ├── OrdersScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ScanScreen.tsx
└── App.tsx                     # Root component
```

## Features

- **Custom Bottom Navigation**: Tab navigator with floating scan button
- **Reusable Components**: Modul component system with TypeScript
- **Consistent Design**: Centralized color and spacing constants
- **Modern UI**: Clean, professional interface with proper styling

## Technical Stack

- React Native with Expo
- TypeScript for type safety
- React Navigation for routing
- Ionicons for UI icons
- Modular component architecture
