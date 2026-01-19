# Mwiza Services Website

A luxury event management website for Mwiza Services, a premium Ugandan company specializing in ushers, cocktails, fresh juices, and event décor.

![Mwiza Services](https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=400&fit=crop&q=80)

## 🌟 Overview

Mwiza Services provides premium event services across Uganda, including:
- **Professional Ushers** - Elegantly trained event personnel
- **Signature Cocktails** - Crafted by expert mixologists
- **Fresh Tropical Juices** - Locally sourced and freshly squeezed
- **Luxury Event Décor** - Custom floral and thematic decorations

## 📁 Project Structure

```
mwiza-website/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── input.css      # Tailwind input with custom components
│   │   │   └── output.css     # Generated CSS (created on build)
│   │   └── js/
│   │       └── main.js        # JavaScript modules & functionality
│   └── pages/
│       ├── public/            # Customer-facing pages
│       │   ├── index.html     # Homepage
│       │   ├── services.html  # Services showcase
│       │   ├── gallery.html   # Portfolio gallery
│       │   ├── booking.html   # Multi-step booking form
│       │   └── booking-success.html
│       └── admin/             # Admin dashboard
│           ├── login.html     # Admin authentication
│           ├── dashboard.html # Overview & stats
│           ├── bookings.html  # Booking management
│           ├── booking-details.html
│           ├── services.html  # Service CRUD
│           └── gallery.html   # Media management
├── package.json
├── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd mwiza-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   This runs Tailwind in watch mode and starts a live server on `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 🎨 Design System

### Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Primary (Gold) | `#f2df0d` | CTAs, highlights, brand accent |
| Background Dark | `#0a0a05` | Main background |
| Rich Brown | `#3d2b1f` | Cards, secondary surfaces |
| Muted Gold | `#cbc690` | Body text, subtitles |
| Accent Brown | `#5c4033` | Borders, dividers |

### Typography
- **Display Font:** Manrope (sans-serif) - Modern, clean headings
- **Serif Font:** Playfair Display - Elegant, luxury feel
- **Icons:** Material Symbols Outlined

### Components
Custom Tailwind components are defined in `input.css`:
- `.btn-primary`, `.btn-secondary`, `.btn-ghost` - Button variants
- `.card` - Luxury card with glass effect
- `.input` - Form inputs with gold focus state
- `.badge-*` - Status badges
- `.nav-glass` - Frosted glass navigation
- `.gallery-item` - Portfolio items with hover overlay
- `.sidebar-link` - Admin navigation links

## 📱 Pages Overview

### Public Pages

| Page | Description |
|------|-------------|
| **Home** | Hero section, services preview, testimonials, CTA |
| **Services** | Detailed breakdown of all 4 service categories |
| **Gallery** | Masonry grid with category filtering |
| **Booking** | Multi-step form (Personal → Event → Services) |
| **Booking Success** | Confirmation with booking ID |

### Admin Dashboard

| Page | Description |
|------|-------------|
| **Login** | Secure admin authentication |
| **Dashboard** | Stats overview, recent bookings, quick actions |
| **Bookings** | List, search, filter, approve/reject bookings |
| **Booking Details** | Full booking view with timeline |
| **Services** | Add/edit/delete service catalog |
| **Gallery** | Upload and manage portfolio images |

## ✨ JavaScript Features

The `main.js` file includes modular functionality:

- **MobileNav** - Hamburger menu with overlay
- **Toast** - Notification system (success/error/warning/info)
- **Modal** - Accessible modal dialogs with focus trap
- **Forms** - Real-time validation with Uganda phone format
- **Gallery** - Category filtering with smooth animations
- **BookingForm** - Multi-step form with progress tracking
- **ScrollAnimations** - Viewport-triggered animations

## 🔧 Improvements Made

Compared to the original design files, this consolidated version includes:

1. **Mobile Responsiveness** - Full mobile navigation and responsive layouts
2. **Form Validation** - Real-time validation with helpful error messages
3. **Accessibility** - ARIA labels, focus management, keyboard navigation
4. **Performance** - Lazy loading images, optimized animations
5. **Toast Notifications** - User feedback for actions
6. **Modal System** - Reusable modal component with backdrop
7. **Testimonials Section** - Added social proof to homepage
8. **Consistent Design** - Unified component library across all pages
9. **Admin Sidebar** - Collapsible navigation with active states
10. **Search & Filtering** - Enhanced booking and gallery management

## 🔜 Recommended Next Steps

### Backend Integration
- [ ] Set up Node.js/Express or Django backend
- [ ] Create REST API for bookings, services, gallery
- [ ] Implement authentication (JWT or sessions)
- [ ] Add database (PostgreSQL or MongoDB)
- [ ] Set up file upload for gallery images

### Additional Features
- [ ] Email notifications (booking confirmation, admin alerts)
- [ ] Payment integration (MTN Mobile Money, Airtel Money)
- [ ] Calendar view for bookings
- [ ] Client portal for booking status
- [ ] WhatsApp integration for quick inquiries
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Analytics integration (Google Analytics)

### Performance
- [ ] Image optimization with WebP format
- [ ] CDN for static assets
- [ ] Service worker for offline support
- [ ] Server-side rendering consideration

## 📞 Contact

**Mwiza Services**  
📍 Kampala, Uganda  
📧 info@mwizaservices.com  
📱 +256 700 123 456  

---

*Built with ❤️ using Tailwind CSS*
