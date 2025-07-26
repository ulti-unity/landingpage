# GitHub Pages Setup Guide for UltiUnity Landing Page

## 🚀 GitHub Pages Configuration

### Repository Settings Required:
1. **Go to Repository Settings** → `https://github.com/ulti-unity/landingpage/settings`
2. **Navigate to Pages section** → Settings > Pages
3. **Configure the following:**

#### Source Configuration:
- **Source**: Deploy from a branch
- **Branch**: `main` 
- **Folder**: `/ (root)`

#### Custom Domain Configuration:
- **Custom domain**: `ultiunity.com`
- **Enforce HTTPS**: ✅ Enable

### DNS Configuration Required:
Configure these DNS records with your domain provider:

#### For Apex Domain (ultiunity.com):
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A  
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

#### For www subdomain:
```
Type: CNAME
Name: www
Value: ulti-unity.github.io
```

### Verification Steps:
1. **Push changes** to main branch
2. **Check GitHub Actions** tab for deployment status
3. **Wait for DNS propagation** (up to 24 hours)
4. **Verify SSL certificate** is automatically provisioned
5. **Test all pages**:
   - https://ultiunity.com/
   - https://ultiunity.com/privacy.html
   - https://ultiunity.com/terms.html
   - https://ultiunity.com/cookies.html
   - https://ultiunity.com/compliance.html

### Files Configuration Summary:
✅ **CNAME** - Created with custom domain
✅ **_config.yml** - Updated with correct URL and baseurl
✅ **sitemap.xml** - All URLs point to ultiunity.com
✅ **robots.txt** - Sitemap URL points to custom domain
✅ **HTML canonical URLs** - All point to custom domain
✅ **GitHub Actions workflow** - Configured for automatic deployment

### Alternative: GitHub.io Domain
If you prefer to use the GitHub.io domain instead:
1. Delete the CNAME file
2. Update _config.yml:
   - url: "https://ulti-unity.github.io"
   - baseurl: "/landingpage"
3. Update all canonical URLs in HTML files
4. Update sitemap.xml URLs
5. Update robots.txt sitemap URL

## 🔧 Troubleshooting:
- **404 errors**: Check DNS configuration
- **SSL issues**: Wait 24 hours for automatic certificate
- **Deploy failures**: Check GitHub Actions logs
- **Content not updating**: Clear browser cache, check Actions completion

## 📋 Deployment Checklist:
- [ ] Repository Settings → Pages configured
- [ ] DNS records added to domain provider
- [ ] CNAME file committed to repository
- [ ] All URLs in sitemap.xml are consistent
- [ ] Canonical URLs in HTML match domain
- [ ] GitHub Actions workflow completed successfully
- [ ] SSL certificate active (https accessible)
- [ ] All pages load correctly on custom domain
