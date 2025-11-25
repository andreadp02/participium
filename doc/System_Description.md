# Participium

Participium is a municipal service system that enables citizens to report local urban issues such as broken streetlights, waste management problems, road damage, or maintenance needs in public spaces.
Municipal staff can review, approve, assign, and resolve reports through a structured workflow that routes each issue to the appropriate technical office based on the problem category.

## System Features

- Citizen portal to submit detailed reports with title, description, photos (1-3 images), and precise location (latitude/longitude)
- Automatic category-based assignment to municipal users 
- Technical officer dashboard for reviewing, approving, or rejecting reports with optional rejection reasons
- Interactive map for viewing reports and creating new ones
- User authentication with roles: Citizen, Municipality, Admin
- Image upload and storage with temporary and persistent handling

## Technical Offices and Responsibilities

The municipality includes several technical offices, each responsible for a specific area of public infrastructure.
When a report is approved, the system assigns it to the correct office based on the category.

### Offices Overview

| Technical Office | Category | Description |
| ---------------- | -------- | ----------- |
| Water Supply Office | WATER_SUPPLY_DRINKING_WATER | Water leaks, hydrants, public fountains |
| Architectural Barriers Office | ARCHITECTURAL_BARRIERS | Accessibility issues, ramps, physical barriers |
| Sewer System Office | SEWER_SYSTEM | Drainage problems, blocked or damaged sewers |
| Public Lighting Office | PUBLIC_LIGHTING | Broken streetlights, malfunctioning electrical poles |
| Waste Office | WASTE | Overflowing bins, street waste issues |
| Road Signs and Traffic Lights Office | ROAD_SIGNS_TRAFFIC_LIGHTS | Missing or damaged signs, malfunctioning traffic lights |
| Roads and Urban Furnishings Office | ROADS_URBAN_FURNISHINGS | Potholes, damaged pavements, issues with urban furniture |
| Public Green Areas and Playgrounds Office | PUBLIC_GREEN_AREAS_PLAYGROUNDS | Park maintenance, playground equipment issues |
| Other | OTHER | General or unspecified municipal matters |

## User Roles

- **Citizen**: Can submit reports and view their own reports
- **Municipality**: Staff members who can review, approve/reject, and manage reports for their office
- **Admin**: Administrative users who can manage users, create municipality accounts, and oversee the system