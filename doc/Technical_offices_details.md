# Participium

Participium is a municipal service system that enables citizens to report local urban issues such as broken streetlights, waste management problems, road damage, or maintenance needs in public spaces.
Municipal staff can review, approve, assign, and resolve reports through a structured workflow that routes each issue to the appropriate technical office based on the problem category.

## System Features

- Citizen portal to submit detailed reports with title, description, category, photos (1-3 images), and precise location (latitude/longitude)
- Municipal public relation officer approves or rejects reports with rejection reasons
- Automatic category-based assignment to municipal users 
- Technical officer dashboard for reviewing reports and updating report status
- Interactive map for viewing reports and creating new ones
- User authentication with roles: Citizen, Municipality, Admin
- Image upload and storage with temporary and persistent handling

## Available Categories

The system supports the following report categories that citizens can select when submitting reports:

| Category ID | Category Name | Description |
| ----------- | ------------- | ----------- |
| WATER_SUPPLY_DRINKING_WATER | Water Supply & Drinking Water | Water leaks, hydrants, public fountains, water infrastructure issues |
| ARCHITECTURAL_BARRIERS | Architectural Barriers | Accessibility issues, ramps, physical barriers |
| SEWER_SYSTEM | Sewer System | Drainage problems, blocked or damaged sewers |
| PUBLIC_LIGHTING | Public Lighting | Broken streetlights, malfunctioning electrical poles |
| WASTE | Waste & Sanitation | Overflowing bins, street waste issues, waste management problems |
| ROAD_SIGNS_TRAFFIC_LIGHTS | Road Signs & Traffic Lights | Missing or damaged signs, malfunctioning traffic lights |
| ROADS_URBAN_FURNISHINGS | Roads & Urban Furnishings | Potholes, damaged pavements, issues with urban furniture |
| PUBLIC_GREEN_AREAS_PLAYGROUNDS | Public Green Areas & Playgrounds | Park maintenance, playground equipment issues, green space problems |
| OTHER | Other | General or unspecified municipal matters |

## Report Processing Workflow and Routing

The system follows a structured workflow to process reports from submission through resolution:

### Workflow Steps

1. **Citizen Submission**: Citizen submits report with category, location, photos, and description
2. **Public Relation Officer Review**: Municipal public relation officer approves or rejects the report
3. **Category-Based Routing**: If approved, the system automatically routes the report to:
   - The appropriate **Technical Officer** based on the report category
   - Optionally, an **External Maintainer** assigned to that category
4. **Assignment & Execution**: 
   - Technical officer or external maintainer receives the report
   - Updates report status and adds comments
5. **Resolution**: Report is marked as RESOLVED when work is complete

## Category-to-Technical Officer Mapping

This table shows how each category is routed to the appropriate technical office and external maintainer:

| Report Category | Assigned Technical Officer | External Maintainer Category |
| --------------- | -------------------------- | ---------------------------- |
| WATER_SUPPLY_DRINKING_WATER | Environmental protection officer | WATER_SUPPLY_DRINKING_WATER |
| ARCHITECTURAL_BARRIERS | Urban planning specialist | ARCHITECTURAL_BARRIERS |
| SEWER_SYSTEM | Public works project manager | SEWER_SYSTEM |
| PUBLIC_LIGHTING | Public works project manager | PUBLIC_LIGHTING |
| WASTE | Sanitation and waste management officer | WASTE |
| ROAD_SIGNS_TRAFFIC_LIGHTS | Traffic and mobility coordinator | ROAD_SIGNS_TRAFFIC_LIGHTS |
| ROADS_URBAN_FURNISHINGS | Public works project manager | ROADS_URBAN_FURNISHINGS |
| PUBLIC_GREEN_AREAS_PLAYGROUNDS | Parks and green spaces officer | PUBLIC_GREEN_AREAS_PLAYGROUNDS |
| OTHER | Municipal administrator | OTHER |

## Technical Offices and Responsibilities

The municipality includes several technical offices, each responsible for a specific area of public infrastructure.
When a report is approved, the system assigns it to the correct office based on the category.

### Offices Overview and Category Assignment

| Technical Office | Assigned Categories | Description |
| ---------------- | ------------------- | ----------- |
| Municipal public relation officer | All categories | Reviews and approves or rejects all reports before assignment |
| Environmental protection officer | WATER_SUPPLY_DRINKING_WATER | Manages water supply issues, leaks, hydrants, and public fountains |
| Urban planning specialist | ARCHITECTURAL_BARRIERS | Addresses accessibility issues, ramps, and physical barriers |
| Public works project manager | SEWER_SYSTEM, PUBLIC_LIGHTING, ROADS_URBAN_FURNISHINGS | Manages sewers, drainage, streetlights, electrical poles, potholes, and urban furniture |
| Sanitation and waste management officer | WASTE | Handles overflowing bins and street waste management |
| Traffic and mobility coordinator | ROAD_SIGNS_TRAFFIC_LIGHTS | Manages road signs and traffic light issues |
| Parks and green spaces officer | PUBLIC_GREEN_AREAS_PLAYGROUNDS | Oversees park maintenance and playground equipment |
| Municipal administrator | OTHER | Handles general or unspecified municipal matters |

## External Maintainers

External maintainers are contractors or specialized service providers hired by the municipality to handle specific categories of reports. 
Unlike municipality staff, external maintainers are assigned to reports for specific categories and can be managed independently.

## User Roles

- **Citizen**: Can submit reports with photos, location, and description; view and manage their own reports
- **Municipality**: Staff members who can review, approve/reject, assign, and manage reports for their office
- **Admin**: Administrative users who can manage users, create municipality accounts, manage external maintainers, and oversee the system
- **External Maintainer**: Specialized service providers assigned to specific categories; can manage and update reports in their assigned areas