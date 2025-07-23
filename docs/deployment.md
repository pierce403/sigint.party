# Deployment Guide for sigint.party

This document explains how to set up automated deployment to [Orbiter](https://orbiter.host/) using GitHub Actions.

## GitHub Secrets Setup

You'll need to add these secrets to your GitHub repository for auto-deployment to work:

### Required Secrets

1. **ORBITER_API_KEY**: Your Orbiter API key for authentication
2. **ORBITER_SITE_ID**: Your site identifier on Orbiter

### How to Add Secrets

1. Go to your GitHub repository: [https://github.com/pierce403/sigint.party](https://github.com/pierce403/sigint.party)
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each secret:

#### ORBITER_API_KEY
- **Name**: `ORBITER_API_KEY`
- **Value**: Your Orbiter API key (get this from your Orbiter dashboard)

#### ORBITER_SITE_ID
- **Name**: `ORBITER_SITE_ID` 
- **Value**: Your site ID from Orbiter (e.g., `sigint-party` or whatever ID Orbiter assigns)

## How to Get Orbiter Credentials

1. **Create Orbiter Account**: Go to [orbiter.host](https://orbiter.host/) and sign up
2. **Create New Site**: 
   - Upload your `client/dist` folder manually first
   - Note the site ID that gets assigned
3. **Generate API Key**:
   - Look for API keys or developer settings in your Orbiter dashboard
   - Generate a new API key for deployments

## Deployment Workflows

### Main Deployment (`.github/workflows/deploy.yml`)
- **Triggers**: Every push to `main` branch
- **Action**: Builds and deploys to production Orbiter site
- **Result**: Updates your live sigint.party site

### Preview Deployment (`.github/workflows/preview.yml`)
- **Triggers**: Every pull request to `main`
- **Action**: Creates preview deployment
- **Result**: Comments on PR with preview URL

## Manual Deployment

If you need to deploy manually:

```bash
# Build the project
bun install
bun run build

# Create deployment archive
cd client/dist
tar -czf ../../sigint-party-build.tar.gz .
cd ../..

# Upload to Orbiter (replace with actual endpoints)
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @sigint-party-build.tar.gz \
  "https://api.orbiter.host/v1/sites/YOUR_SITE_ID/deploy"
```

## Troubleshooting

### Build Fails
- Check that all dependencies are properly listed in `package.json`
- Ensure the shared package builds successfully first

### Deployment Fails
- Verify your `ORBITER_API_KEY` is correct and active
- Check that `ORBITER_SITE_ID` matches your site on Orbiter
- Look at GitHub Actions logs for specific error messages

### API Endpoints
The deployment scripts include fallback options:
- First tries to use Orbiter CLI if available
- Falls back to direct API calls with curl

## Custom Domain Setup

Once deployed to Orbiter:
1. Point your `sigint.party` domain to Orbiter's servers
2. Configure SSL certificate (usually automatic with Orbiter)
3. Update any necessary DNS records

## Next Steps

1. Set up the GitHub secrets as described above
2. Make a test commit to trigger the deployment
3. Monitor the GitHub Actions tab to see the deployment progress
4. Visit your deployed site on Orbiter!

Your sigint.party will now automatically deploy every time you push to the main branch! 🎉 