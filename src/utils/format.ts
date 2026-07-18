// Format utilities for the Fintech domain

// Convert cents to a formatted euro string (Spanish locale)
export function formatCents(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros);
}

// Convert cents to a plain number (euros)
export function centsToEuros(cents: number): number {
  return cents / 100;
}

// Convert euros to cents
export function eurosToCents(euros: number): number {
  return Math.round(euros * 100);
}

// Format a date string for display
// TODO: Should support different formats
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format a date with time
export function formatDateTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
