'use client'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from 'firebase/auth'
import { useSearchParams, useRouter } from "next/navigation";

export default function SignInForm() {

  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl");
  
  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target["name"].value;
    const password = e.target["password"].value;
    setPersistence(auth, browserSessionPersistence)
    .then( () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         router.push(returnUrl);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
  <>
    ...
  </>
  );
  }
  