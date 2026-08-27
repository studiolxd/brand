'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children?: ReactNode;
  /** Lo que se pinta si un hijo lanza al renderizar. Por defecto nada (`null`). */
  fallback?: ReactNode;
  /** Se llama con el error y la pila de componentes cuando un hijo lanza. */
  onError?: (error: Error, info: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Límite de error sin cara ni tokens: si un hijo lanza al renderizar, pinta
 * `fallback` (nada, por defecto) en lugar de tumbar el árbol entero. Es la
 * pieza que hace seguras la cabecera y el pie dentro de una página de error:
 * si el chrome falla, la página sigue viva. Componente de clase porque React
 * solo expone `componentDidCatch` ahí.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  render() {
    const { failed } = this.state;
    const { children, fallback = null } = this.props;
    return failed ? fallback : children;
  }
}
