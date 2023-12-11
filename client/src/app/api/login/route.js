// src/app/api/auth/login.js

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../libs/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Sign in using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
