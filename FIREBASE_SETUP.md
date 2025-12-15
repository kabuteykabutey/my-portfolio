# Firebase Setup for Guestbook

To enable shared reviews across visitors, this guestbook now uses Firebase Firestore.

## Steps to Set Up:

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. Enable Firestore Database in your project.

3. Go to Project Settings > General > Your apps, and add a web app.

4. Copy the Firebase config object (apiKey, authDomain, etc.).

5. In `guestbook.html`, replace the placeholders in the firebaseConfig with your actual values.

6. Set Firestore rules to allow reads and writes (for testing, allow all; for production, restrict as needed).

Example Firestore Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Change for production
    }
  }
}
```

7. Deploy your site, and reviews will be shared.

Note: Firestore has a free tier, but monitor usage.