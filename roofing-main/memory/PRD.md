# 22G Roofing Pty Ltd - Website PRD

## Original Problem Statement
Create a modern, professional website for an Australian roofing company (22G Roofing Pty Ltd) specializing in new roof installations and re-roofing for residential and commercial projects. Requirements include fullscreen video hero, separate pages for navigation items, fade transitions, quote form with database storage + email notifications, Google Maps embed, and displaying both company contacts.

## User Personas
1. **Homeowners** - Seeking roof replacements or new roofing for renovations
2. **Builders & Developers** - Looking for reliable roofing contractors for new construction projects
3. **Property Managers** - Commercial property maintenance and re-roofing needs

## Core Requirements (Static)
- [x] Professional landing page with fullscreen video hero background
- [x] Separate pages: Home, About, Services, Projects, Contact
- [x] Quote request form with database storage
- [x] Email notification on quote submission (requires Resend API key)
- [x] Google Maps embed showing Blacktown NSW location
- [x] Both contacts displayed (Pavandeep Singh, Bhupendra Singh)
- [x] Mobile-responsive design
- [x] SEO-optimized for "New Roofing Blacktown NSW" & "Metal Roofing Sydney"

## What's Been Implemented (January 2026)
### Backend (FastAPI + MongoDB)
- `/api/` - Health check endpoint
- `/api/contact-info` - Company contact information
- `/api/services` - List of all roofing services
- `/api/projects` - Gallery of completed projects
- `/api/quote` - POST quote requests (stored in MongoDB)
- `/api/quotes` - GET all submitted quotes

### Frontend (React + Framer Motion)
- **Home Page**: Fullscreen video hero, "Why Choose Us" section, Services preview, Projects preview, CTA
- **About Page**: Company story, values, team members (both contacts), certifications
- **Services Page**: 5 services (New Roof, Re-Roofing, Metal Roofing, Flashings, Skylights) with images
- **Projects Page**: Gallery with filtering (All, Residential, New Build, Commercial) + lightbox modal
- **Contact Page**: Quote form, contact info cards, Google Maps embed, service areas

### Design System
- Colors: Charcoal (#0F172A), Sky Blue (#0EA5E9), White, Light Grey (#F8FAFC)
- Typography: Manrope (headings), Inter (body)
- Animations: Framer Motion fade-in-up transitions on scroll

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Core pages and navigation
- [x] Quote form functionality
- [x] Project gallery with client photos
- [x] Mobile responsiveness

### P1 (High Priority) - Future
- [ ] Configure Resend API key for email notifications
- [ ] Add more project photos to gallery
- [ ] Implement admin dashboard for viewing quotes

### P2 (Nice to Have)
- [ ] Add customer testimonials section
- [ ] Live chat integration
- [ ] Blog/news section for SEO
- [ ] Online scheduling for consultations

## Next Tasks
1. Obtain and configure Resend API key for email notifications
2. Add more completed project photos to gallery
3. Consider adding Google Business reviews integration
4. Set up Google Analytics for tracking
