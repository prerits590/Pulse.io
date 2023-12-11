// src/app/api/auth/register.js

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../../../libs/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, setDoc, doc } from 'firebase/firestore';

export default async function POST(request ) {
  console.log("---------------------------????????????????????/")
  return new Request("ok")
  }


