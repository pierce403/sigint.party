# Deployment Guide for sigint.party

This document explains how to set up automated deployment to [Orbiter](https://orbiter.host/) with ENS integration for `sigint.eth`.

## GitHub Secrets Setup

You'll need to add these secrets to your GitHub repository for auto-deployment with ENS integration:

### Required Secrets

1. **ORBITER_API_KEY**: Your Orbiter API key for authentication
2. **ORBITER_SITE_ID**: Your site identifier on Orbiter (should be `sigint.party`)
3. **ENS_MNEMONIC**: Mnemonic phrase for the Ethereum wallet that controls `sigint.eth`
4. **ETHEREUM_RPC_URL**: Ethereum RPC endpoint (e.g., Infura, Alchemy, or Ankr)

### How to Add Secrets

1. Go to your GitHub repository: [https://github.com/pierce403/sigint.party](https://github.com/pierce403/sigint.party)
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each secret:

#### ORBITER_API_KEY
- **Name**: `ORBITER_API_KEY`
- **Value**: `key_JkEmMjwQbgWcAABZJF8sJExKqFde2EpL`

#### ORBITER_SITE_ID
- **Name**: `ORBITER_SITE_ID`  
- **Value**: `sigint.party`

#### ENS_MNEMONIC
- **Name**: `ENS_MNEMONIC`
- **Value**: Your 12/24 word mnemonic phrase for the wallet that controls `sigint.eth`
- ⚠️ **CRITICAL**: This wallet must be the **owner** or **controller** of the `sigint.eth` domain

#### ETHEREUM_RPC_URL
- **Name**: `ETHEREUM_RPC_URL`
- **Value**: Your Ethereum RPC endpoint, for example:
  - Infura: `https://mainnet.infura.io/v3/YOUR_PROJECT_ID`
  - Alchemy: `https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY`
  - Ankr (free): `https://rpc.ankr.com/eth`

## How the Deployment Works

### 🚀 Automated Flow

1. **Build**: Compiles your React app with example tower data
2. **Deploy to Orbiter**: Uploads build to IPFS via Orbiter hosting
3. **Get IPFS CID**: Extracts the content identifier from Orbiter response
4. **Update ENS**: Automatically updates `sigint.eth` contenthash to point to new CID
5. **Notify**: Comments on PRs with preview links

### 🌐 Access Your Site

After deployment, `sigint.party` will be accessible via:

- **ENS Domain**: `https://sigint.eth` (in ENS-compatible browsers)
- **ENS Gateway**: `https://sigint.eth.limo` (works in any browser)
- **IPFS Gateways**: 
  - `https://{CID}.ipfs.dweb.link`
  - `https://{CID}.ipfs.inbrowser.link`
  - `https://{CID}.ipfs.w3s.link`

## ENS Configuration Details

### What Gets Updated

The deployment updates the **contenthash** record of `sigint.eth` to point to the new IPFS CID. This is done using the [ddns-action](https://github.com/aquiladev/ddns-action) which supports ENS.

### Required Permissions

Your wallet (ENS_MNEMONIC) must have permission to update `sigint.eth`. You can verify this by:

1. Going to [ENS App](https://app.ens.domains/sigint.eth)
2. Checking that your wallet address is listed as **Controller** or **Owner**

## Troubleshooting

### ❌ ENS Update Failed

**Possible causes:**
- Wrong mnemonic phrase in `ENS_MNEMONIC`
- Wallet doesn't control `sigint.eth`
- Insufficient ETH for gas fees
- Invalid Ethereum RPC URL

**Solutions:**
- Verify wallet controls the domain in ENS app
- Ensure wallet has ~0.01 ETH for gas
- Test RPC URL manually

### ❌ Orbiter Deployment Failed  

**Possible causes:**
- Invalid API key
- Incorrect site ID
- Build artifacts missing

**Solutions:**
- Verify `ORBITER_API_KEY` is correct
- Confirm `ORBITER_SITE_ID` matches your Orbiter account
- Check build step completed successfully

### ❌ Build Failed

**Common issues:**
- TypeScript compilation errors
- Missing dependencies
- Build timeout

**Solutions:**
- Run `bun run build` locally to test
- Check for TypeScript errors in PR
- Verify all dependencies are in package.json

## Deployment Environments

### Production (main branch)
- ✅ Deploys to Orbiter IPFS
- ✅ Updates `sigint.eth` ENS record
- ✅ Accessible at `https://sigint.eth.limo`

### Preview (pull requests)
- ✅ Deploys to Orbiter IPFS
- ❌ Does NOT update ENS (safety measure)
- ✅ Provides preview links in PR comments

## Manual Deployment

If you need to deploy manually:

```bash
# Build the project
bun run build

# Create deployment archive
cd client/dist && tar -czf ../../sigint-party-build.tar.gz . && cd ../..

# Upload to Orbiter (manual)
# Visit orbiter.host and drag/drop the tar.gz file

# Update ENS manually (requires ens-updater CLI)
npm install -g @triplespeeder/ens-updater
ens-updater setContenthash sigint.eth ipfs-ns YOUR_IPFS_CID \
  --web3 $ETHEREUM_RPC_URL --verbose
```

## Security Best Practices

1. **Never share your mnemonic phrase publicly**
2. **Use a dedicated wallet for ENS management** (separate from your main wallet)
3. **Regularly rotate API keys**
4. **Monitor deployment logs for any suspicious activity**

---

## Next Steps

Once deployment is working:

1. ✅ **Test the deployment** by pushing a small change
2. 🔗 **Verify ENS resolution** at [https://sigint.eth.limo](https://sigint.eth.limo)  
3. 📱 **Share the decentralized link** with the community!

Your sigint.party tower mapping platform will now be:
- 🌐 **Fully decentralized** (IPFS hosting + ENS domain)
- 🚀 **Auto-updating** on every commit
- 🔗 **Accessible forever** via IPFS content addressing 