import React, { useState } from 'react';
import {
  IonContent, IonPage, IonInput, IonItem, IonLabel,
  IonButton, IonHeader, IonToolbar
} from '@ionic/react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
    const token = btoa(`${username}:${password}`);
    localStorage.setItem("SGR_TOKEN", token);
    location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ textAlign: 'center' }}>
          <h1>Welcome Back</h1>
          <p>Sign in to your SGR account</p>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleLogin}>
          <IonItem mode="md" className="ion-margin-bottom">
            <IonLabel position="fixed">Username</IonLabel>
            <IonInput
              type="text"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
              required
            />
          </IonItem>

          <IonItem mode="md" className="ion-margin-bottom">
            <IonLabel position="fixed">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>

          <IonButton expand="block" type="submit">
            Sign In
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;