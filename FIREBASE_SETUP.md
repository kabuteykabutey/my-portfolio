# Firebase Authentication Setup Guide

To enable **Google** and **GitHub** sign-in for your guestbook, follow these steps in your Firebase Console and GitHub settings.

## 1. Enable Google Sign-in
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **my-portfolioone**.
3. In the left sidebar, click **Authentication** > **Sign-in method**.
4. Click **Add new provider** and select **Google**.
5. Enable it, provide a project support email, and click **Save**.

---

## 2. Enable GitHub Sign-in
This requires creating an OAuth App on GitHub.

### Step A: Create the OAuth App on GitHub
1. Sign in to your [GitHub account](https://github.com/).
2. In the upper-right corner, click your profile photo, then click **Settings**.
3. In the left sidebar, scroll down and click **Developer settings**.
4. Click **OAuth Apps** > **New OAuth App**.
5. Fill in the following:
   - **Application name**: `Kabutey Portfolio Guestbook` (or anything you like)
   - **Homepage URL**: `http://localhost:5173` (or your eventual website URL)
   - **Authorization callback URL**: 
     > [!IMPORTANT]
     > Copy this URL from the Firebase Console. 
     > Go to **Firebase Auth** > **Sign-in method** > **GitHub** > **Setup instructions** to find it. 
     > It usually looks like: `https://my-portfolioone.firebaseapp.com/__/auth/handler`
6. Click **Register application**.

### Step B: Get Credentials
1. On your new GitHub App page, copy the **Client ID**.
2. Click **Generate a new client secret** and copy the **Client Secret**.

### Step C: Configure Firebase
1. Go back to **Firebase Console** > **Authentication** > **Sign-in method**.
2. Click **Add new provider** > **GitHub**.
3. Enable it and paste the **Client ID** and **Client Secret** you just copied.
4. Click **Save**.

---

## 4. Troubleshooting: "Account already exists..."
If you see an error saying **"An account already exists with the same email address..."**, it's because your Google and GitHub accounts use the same email.

To fix this:
1. Go to **Firebase Console** > **Authentication** > **Settings** (tab at the top).
2. Look for **User accounts** (or "User property") in the sidebar.
3. Click **One account per email address**.
4. Change it to **Allow creation of multiple accounts with the same email address**.
5. Click **Save**.

Now you will be able to sign in with either Google or GitHub even if they use the same email!

---

## 5. Enable Gmail Alerts (EmailJS)
To receive email alerts when someone leaves a review, you need to set up **EmailJS**.

1. **Sign up**: Create a free account at [EmailJS](https://www.emailjs.com/).
2. **Add Service**: Connect your Gmail account in the "Email Services" tab. Note your **Service ID**.
3. **Create Template**: In "Email Templates", create a new template with:
   - **Subject**: `New Guestbook Review from {{from_name}}`
   - **Content**: `You received a new review: {{message}} (From: {{user_email}})`
   - Note your **Template ID**.
4. **Get Public Key**: Go to "Account" -> "API Keys" to find your **Public Key**.
5. **Update Code**: Open [guestbook.html](file:///c:/Users/Kabutey/OneDrive/Desktop/my-portfolio/my-portfolio/guestbook.html) and replace the placeholders:
   - `YOUR_EMAILJS_PUBLIC_KEY` (around line 17)
   - `YOUR_SERVICE_ID` (around line 334)
   - `YOUR_TEMPLATE_ID` (around line 334)