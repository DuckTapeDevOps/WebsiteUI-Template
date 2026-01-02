# Naval Nomad Community

**Turning Marinas into Villages**

A community-first platform designed to transform marinas from transient stops into vibrant maritime villages. By connecting boaters and creating digital infrastructure for real-world interactions, Naval Nomad enhances the marina experience while building lasting relationships among nautical enthusiasts.

## Core Vision

Naval Nomad focuses on community building first, with features that make boaters' lives easier added progressively based on user needs and feedback.

## MVP Features

### Community Building
- **Connect Network**: Follow and connect with fellow boaters (like LinkedIn for the maritime community)
- **Location Sharing**: See which marina your connections are currently docked at (with privacy controls)
- **Marina Chat**: Location-specific conversations and community discussions
- **User Profiles**: Vessel information, travel history, and personal maritime story

### Privacy-First Location Sharing
- **Public**: Region or town only
- **Marina-level**: Exact marina visible to connections and fleetmates
- **Precise berth**: Crew only, or explicit one-off sharing

### Community Structure
- **Crew**: People linked to a specific vessel with access to vessel dashboards
- **Fleet**: Groups of vessels that travel together (temporary or ongoing)
- **Connections**: Your broader maritime network

## Coming Soon Features
- **Event Management**: Marina events calendar and community meetups
- **Journey Blogs**: Document and share maritime adventures
- **Route Planning**: Advanced navigation and trip planning tools
- **Marina Integration**: Tools for marina staff to enhance customer service

## Project Structure

- `/landing` - React community platform built with Vite
- `/landing/infrastructure` - OpenTofu/Terraform IaC for AWS (frontend hosting, CI/CD)

## Development

1. Install dependencies:
```bash
cd landing
npm install
```

2. Start development server:
```bash
npm run dev
```

## Deployment

### Production (navalnomad.com)

The site is automatically deployed when changes are pushed to the main branch via GitHub Actions.

1. Build the application:
```bash
cd landing
npm run build
```

2. The GitHub Action automatically deploys to AWS S3 + CloudFront.

## Infrastructure

The project uses OpenTofu/Terraform to manage AWS:
- S3 bucket for static site (private) with CloudFront Origin Access
- CloudFront distribution and ACM certificate
- Route53 DNS for domain and aliases
- S3 backend state with DynamoDB table for state locking
- GitHub Actions (OIDC role) for CI/CD deployments

## Development Philosophy

**Community First**: Every feature decision prioritizes building and strengthening the maritime community.

**Progressive Enhancement**: Start with core social features, then add complexity based on user feedback.

**Privacy by Design**: Location and personal information sharing is always opt-in with granular controls.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Intellectual Property Notice

While the code is open source under the MIT License, the Naval Nomad brand, business concept, and related assets remain proprietary. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details on intellectual property rights and contribution guidelines.
