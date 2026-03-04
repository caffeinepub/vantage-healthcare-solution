# Vantage Healthcare Solutions

## Current State

The site currently presents "Vantage Healthcare Solution" as a healthcare claims & insurance management company with 3 services (GIC Renewal, Old Claims Recovery, Short Claim Approval Recovery), a Scope of Services section, and a contact/enquiry form. Backend stores enquiry submissions per user principal.

## Requested Changes (Diff)

### Add
- Hero section: new headline "Delivering Trusted Healthcare Staffing & Workforce Solutions", subheading, and CTA
- About Us section: company description, Vision & Mission statements
- Services section: 3 service categories — Healthcare Staffing Solutions (7 staff types), Hospital Workforce Management (4 sub-services), Home Healthcare Services (4 sub-services)
- Why Choose Us section: 6 differentiators with check marks
- Industries We Serve section: 6 industry types with icons
- Our Process section: 5-step process timeline
- Updated contact section: Pune, Maharashtra address; phone +91-9881783462; email vantagehealth2022@gmail.com; website www.vantagehealthcare.in
- Updated footer: "Vantage Healthcare Solutions © 2026", Privacy Policy & Terms & Conditions links
- Updated nav links: Home, About, Services, Why Us, Process, Contact

### Modify
- Hero content: replace claims-focused copy with staffing & workforce management copy
- Contact info: update phone number and email to the real contact details
- Footer brand tagline: change from "Expert Claims & Insurance Management" to staffing-focused tagline
- Company name: "Vantage Healthcare Solutions" (with 's' at the end)

### Remove
- GIC Renewal, Old Claims Recovery, Short Claim Approval Recovery service cards
- Scope of Services section (replaced by expanded services + why choose us + process sections)
- Stats row showing "15% Max Recovery Fee" and claims-specific numbers

## Implementation Plan

1. Update backend to keep enquiry submission (no backend changes needed — existing API is sufficient)
2. Replace App.tsx entirely with new multi-section layout:
   - Navbar (Home, About, Services, Why Us, Process, Contact)
   - HeroSection with staffing-focused copy and CTA
   - AboutSection with vision & mission cards
   - ServicesSection with 3 category cards + sub-service lists
   - WhyChooseUsSection with 6 feature badges/cards
   - IndustriesSection with 6 industry tiles
   - ProcessSection with 5-step vertical/horizontal timeline
   - ContactSection with updated real contact details and enquiry form
   - Footer with 2026 copyright, Privacy Policy & Terms links
3. Generate new hero image representing healthcare staffing/professionals
