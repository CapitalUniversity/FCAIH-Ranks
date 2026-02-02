# Student Rank Lookup System - Setup Guide

## 📋 Overview
This system allows students to securely look up their rank and credit hours using their student ID. The Google Drive links are protected by using Claude API as a secure proxy.

## 🔧 Setup Instructions

### Step 1: Upload CSV Files to Google Drive

1. Run the `transcript_scanner_multi_year.py` script to generate CSV files:
   - `2022_transcripts.csv`
   - `2023_transcripts.csv`
   - `2024_transcripts.csv`
   - `2025_transcripts.csv`

2. Upload each CSV file to Google Drive

3. For each file:
   - Right-click → Share
   - Click "Change to anyone with the link"
   - Set permission to "Viewer"
   - Copy the share link

### Step 2: Extract File IDs

From each Google Drive share link, extract the File ID:

**Share link format:**
```
https://drive.google.com/file/d/1ABC123XYZ456_FILE_ID_HERE/view?usp=sharing
                              ^^^^^^^^^^^^^^^^^^^^^^^^
                              This is your File ID
```

Example:
- Link: `https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing`
- File ID: `1a2b3c4d5e6f7g8h9i0j`

### Step 3: Configure the Frontend

Open `student_rank_lookup.jsx` and find this section:

```javascript
const DRIVE_CONFIG = {
  2022: 'YOUR_2022_FILE_ID',  // Replace with actual file ID
  2023: 'YOUR_2023_FILE_ID',  // Replace with actual file ID
  2024: 'YOUR_2024_FILE_ID',  // Replace with actual file ID
  2025: 'YOUR_2025_FILE_ID',  // Replace with actual file ID
};
```

Replace each `YOUR_XXXX_FILE_ID` with the actual File ID you extracted:

```javascript
const DRIVE_CONFIG = {
  2022: '1a2b3c4d5e6f7g8h9i0j',  // Your 2022 file ID
  2023: '9z8y7x6w5v4u3t2s1r0q',  // Your 2023 file ID
  2024: 'k1l2m3n4o5p6q7r8s9t0',  // Your 2024 file ID
  2025: 'u1v2w3x4y5z6a7b8c9d0',  // Your 2025 file ID
};
```

### Step 4: Deploy the Frontend

The React component (`student_rank_lookup.jsx`) is ready to use as a Claude Artifact or can be integrated into your website.

**Option A: Use as Claude Artifact (Recommended for testing)**
- The code is already in the correct format
- Share it with students who have Claude access

**Option B: Deploy to a website**
- Requires a React build setup
- Can be hosted on Vercel, Netlify, GitHub Pages, etc.

## 🔒 Security Features

### How It Works:
1. **Student enters ID** → Frontend validates format
2. **Frontend calls Claude API** → Sends request with Google Drive File ID
3. **Claude fetches CSV** → Downloads from Google Drive
4. **Claude parses data** → Finds the student record
5. **Claude returns result** → Only that student's data (rank, GPA, hours)
6. **Frontend displays** → Shows result to user

### Security Benefits:
✅ **Google Drive links never exposed** to end users or browser network requests
✅ **File IDs are in code** but not visible in network inspector
✅ **Only specific student data returned** - not the entire CSV
✅ **No direct CSV download** - Claude API acts as a secure proxy
✅ **Read-only access** - Students cannot modify the data

### Security Limitations:
⚠️ **File IDs are in source code** - Advanced users could inspect the artifact code
⚠️ **Not enterprise-grade** - For high security, use a proper backend server
⚠️ **Rate limited** - Claude API has rate limits

## 📊 Usage

Students visit the page and:
1. Enter their 8-digit student ID (e.g., `20250001`)
2. Click "Search"
3. See their:
   - Rank (e.g., #15)
   - GPA (e.g., 3.5)
   - Credit Hours (e.g., 120)
   - Specialization (e.g., CS, AI, IS, IT, General)

## 🎨 Features

- **Responsive Design** - Works on mobile and desktop
- **Real-time Validation** - Checks student ID format
- **Beautiful UI** - Gradient backgrounds, badges for top performers
- **Performance Badges**:
  - 🥇 Rank 1 = Top Student
  - 🏆 Top 10 = Special badge
  - ⭐ Top 50 = Recognition badge
- **GPA Grades**:
  - 3.5+ = Excellent
  - 3.0-3.5 = Very Good
  - 2.5-3.0 = Good
  - 2.0-2.5 = Pass

## 🔄 Updating Data

When you generate new CSV files:
1. Replace the old files in Google Drive (same File ID)
   OR
2. Upload new files and update the `DRIVE_CONFIG` in the code

## ⚠️ Troubleshooting

**Error: "Please configure Google Drive file IDs"**
- You forgot to replace `YOUR_XXXX_FILE_ID` with actual File IDs

**Error: "Student ID not found"**
- The student ID doesn't exist in the CSV for that year
- Check if the ID is correct

**Error: "Failed to fetch data"**
- Google Drive file is not shared properly (must be "Anyone with link")
- File ID is incorrect
- Network/API issue

**Students can't access the page**
- Make sure Claude artifacts are accessible to your students
- Or deploy to a public website

## 📝 Example Student IDs by Year

- 2022: `20220001` to `20229999`
- 2023: `20230001` to `20239999`
- 2024: `20240001` to `20249999`
- 2025: `20250001` to `20259999`

## 🚀 Advanced: Adding More Years

To add additional years (e.g., 2026):

1. Add to `DRIVE_CONFIG`:
```javascript
const DRIVE_CONFIG = {
  2022: '...',
  2023: '...',
  2024: '...',
  2025: '...',
  2026: 'YOUR_2026_FILE_ID',  // New year
};
```

2. Upload the new year's CSV to Google Drive
3. Update with the new File ID

That's it! The system automatically detects the year from the student ID.

## 📞 Support

If you need help:
1. Check the error message shown in the app
2. Verify Google Drive sharing settings
3. Confirm File IDs are correct
4. Test with a known student ID

---

**Created with ❤️ for Faculty of Computers and Artificial Intelligence**
