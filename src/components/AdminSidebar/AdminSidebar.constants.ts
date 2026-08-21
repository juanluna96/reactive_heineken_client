// Shared with AdminDashboardScreen/AdminRestaurantsScreen.styles.ts so each
// screen's <Main> can offset by exactly this sidebar's rendered width.
export const ADMIN_SIDEBAR_WIDTH = '256px';
export const ADMIN_DESKTOP_BREAKPOINT = '900px';

// Shared by every admin screen's styles.ts for the "stack controls full
// width instead of cramming them in a row" breakpoint (filters, button
// groups, form actions, etc). Deliberately narrower than
// ADMIN_DESKTOP_BREAKPOINT — tablet widths (640-900px) still have room for
// a row of controls; only true phone widths need the stacked layout.
export const ADMIN_MOBILE_BREAKPOINT = '640px';
