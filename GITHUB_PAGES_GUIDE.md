# GitHub Pages Deployment Guide

## 📦 Quick Start - Deploy to GitHub Pages

### Step 1: Configure Google Drive File IDs

Before deploying, you MUST configure your Google Drive file IDs in `index.html`:

1. Open `index.html` in a text editor
2. Find this section (around line 33):

```javascript
const DRIVE_CONFIG = {
    2022: 'YOUR_2022_FILE_ID',  // Replace with actual file ID
    2023: 'YOUR_2023_FILE_ID',  // Replace with actual file ID
    2024: 'YOUR_2024_FILE_ID',  // Replace with actual file ID
    2025: 'YOUR_2025_FILE_ID',  // Replace with actual file ID
};
```

3. Replace with your actual Google Drive file IDs:

```javascript
const DRIVE_CONFIG = {
    2022: '1a2b3c4d5e6f7g8h9i0j',  // Your 2022 CSV file ID
    2023: '9z8y7x6w5v4u3t2s1r0q',  // Your 2023 CSV file ID
    2024: 'k1l2m3n4o5p6q7r8s9t0',  // Your 2024 CSV file ID
    2025: 'u1v2w3x4y5z6a7b8c9d0',  // Your 2025 CSV file ID
};
```

**How to get File IDs:**
- Upload your CSV to Google Drive
- Right-click → Share → "Anyone with the link" → Viewer
- Copy the share link: `https://drive.google.com/file/d/FILE_ID_HERE/view?usp=sharing`
- Extract the `FILE_ID_HERE` part

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon (top right) → **New repository**
3. Repository settings:
   - **Name**: `student-rank-lookup` (or any name you want)
   - **Description**: "Student academic records lookup system"
   - **Visibility**: Public (required for free GitHub Pages)
   - **Initialize**: Check "Add a README file" ✓
4. Click **Create repository**

### Step 3: Upload Your Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop **ONLY** `index.html` (the configured one)
3. Add commit message: "Initial deployment"
4. Click **Commit changes**

**Option B: Using Git Command Line**

```bash
# Initialize local repository
git init
git add index.html
git commit -m "Initial deployment"

# Connect to GitHub (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. In your repository, go to **Settings** (top menu)
2. Scroll down to **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
4. Click **Save**

### Step 5: Wait for Deployment

- GitHub will build and deploy your site (takes 1-2 minutes)
- You'll see a message: "Your site is live at `https://username.github.io/repo-name/`"
- Click the link to view your site!

### Step 6: Share with Students

Your site is now live! Share the URL with students:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Example:
```
https://johnsmith.github.io/student-rank-lookup/
```

## 🔄 Updating the Site

### To Update Google Drive File IDs:

1. Edit `index.html` in GitHub (click the file → pencil icon)
2. Update the `DRIVE_CONFIG` section
3. Scroll down → "Commit changes"
4. Wait 1-2 minutes for redeployment

### To Update CSV Files:

Simply replace the files in Google Drive (same File ID). No code changes needed!

## ✅ Testing

After deployment, test with a known student ID:
1. Visit your GitHub Pages URL
2. Enter a student ID (e.g., `20250001`)
3. Click Search
4. Verify the rank and data appear correctly

## ⚠️ Troubleshooting

### "Your site is not yet live"
- Wait 2-3 minutes after enabling Pages
- Refresh the Settings → Pages page

### "404 - File not found"
- Make sure `index.html` is in the root directory (not in a folder)
- Check the file is named exactly `index.html` (lowercase)

### "Please configure Google Drive file IDs"
- You forgot to update the `DRIVE_CONFIG` in `index.html`
- Open the file and replace `YOUR_XXXX_FILE_ID` with real IDs

### "Failed to fetch data"
- CSV files must be shared as "Anyone with the link"
- Check Google Drive sharing settings
- Verify File IDs are correct

### "Student ID not found"
- The ID doesn't exist in the CSV for that year
- Check your CSV files have the correct data

## 🔒 Security Notes

**What's Protected:**
- ✅ Google Drive File IDs are in the HTML source (not in network requests)
- ✅ Only specific student data is returned (not entire CSV)
- ✅ CSV files are read-only

**What's NOT Protected:**
- ⚠️ Anyone can view the HTML source and see File IDs
- ⚠️ For higher security, use a backend server (not GitHub Pages)

**For most educational use cases, this security is adequate!**

## 📱 Custom Domain (Optional)

Want a custom domain like `students.yourschool.edu`?

1. Buy a domain from any registrar
2. In GitHub Settings → Pages → Custom domain
3. Enter your domain
4. Configure DNS (GitHub provides instructions)

## 🎨 Customization

To customize the appearance:

1. Edit `index.html` in GitHub
2. Modify text in the HTML:
   - Line ~37: Change "Student Rank Lookup" title
   - Line ~39: Change subtitle text
   - Line ~324: Change footer text
3. Commit changes
4. Wait for redeployment

## 📊 Files Structure

```
your-repository/
├── index.html          (Required - your main page)
└── README.md          (Optional - repository description)
```

That's it! Just one file needed for GitHub Pages.

## 🚀 Going Live Checklist

- [ ] Configure Google Drive file IDs in `index.html`
- [ ] Upload CSV files to Google Drive
- [ ] Set CSV files to "Anyone with the link" (Viewer)
- [ ] Create GitHub repository
- [ ] Upload `index.html`
- [ ] Enable GitHub Pages
- [ ] Wait for deployment
- [ ] Test with a student ID
- [ ] Share URL with students

## 📞 Need Help?

Common issues:
1. **Blank page** → Check browser console (F12) for errors
2. **Config error** → Update File IDs in `index.html`
3. **Not found error** → Check CSV has the student ID
4. **Network error** → Check Google Drive sharing settings

---

**You're all set! Your student rank lookup system is now live! 🎉**
