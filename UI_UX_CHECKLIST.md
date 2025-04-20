# HostsHub.ai — UI/UX Enhancements Checklist (Prioritized)

---

## 1. Responsive Layouts
- [ ] Refactor dashboard pages (`app/dashboard/`) for mobile/tablet/desktop
- [ ] Make sidebars collapsible on mobile (`components/ui/sidebar.tsx`)
- [ ] Test `/dashboard/guests`, `/dashboard/bookings`, `/dashboard/properties` on all devices
- [ ] Ensure auth pages (`/auth/login`, `/signup`) are mobile-friendly
- [ ] Implement hamburger menu toggle in `components/main-header.tsx`

---

## 2. Theming Consistency
- [ ] Verify dark/light mode toggle (`components/theme-switch.tsx`)
- [ ] Use CSS variables for colors in all components
- [ ] Apply Airbnb brand colors and accent colors
- [ ] Audit headers/footers (`components/white-label-header.tsx`, `components/white-label-footer.tsx`)
- [ ] Check color contrast ratios

---

## 3. Accessibility (a11y)
- [ ] Add ARIA labels to icon buttons and interactive elements
- [ ] Ensure full keyboard navigation (Tab, Enter, Space)
- [ ] Use semantic HTML elements
- [ ] Test with screen readers
- [ ] Add live regions for loading/error states

---

## 4. Loading States & Skeletons
- [ ] Add skeleton loaders to:
  - `components/properties/properties-grid.tsx`
  - `components/communications/MessageList.tsx`
  - `components/notifications/notification-center.tsx`
  - Booking and guest lists
- [ ] Add global spinner/progress bar during route changes

---

## 5. Error Handling UI
- [ ] Inline form errors (`components/auth/login-form.tsx`, property/booking forms)
- [ ] Toast notifications via Sonner (`lib/notification-service.ts`)
- [ ] Retry options where appropriate

---

## 6. UI Polish & Animations
- [ ] Standardize button styles and states
- [ ] Align form inputs, labels, and errors
- [ ] Use consistent icons (Lucide)
- [ ] Add smooth animations for transitions

---

# End of Checklist
