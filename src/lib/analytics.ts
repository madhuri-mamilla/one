// Placeholder analytics — decoupled from login, tracks anonymous page views.
// Swap the trackPageView body for a real GA4 / Firebase Analytics call when
// those are wired up; every call site in the app stays the same.
export function trackPageView(path: string) {
  console.info(`[analytics] page_view: ${path}`);
}
