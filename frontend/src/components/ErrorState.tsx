import React from 'react';
import { IonLabel, IonButton, IonIcon, IonText } from '@ionic/react';
import { alertCircleOutline, logOutOutline, refreshOutline } from 'ionicons/icons';

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorProps> = ({
  message = "We couldn't load the users. Please check your connection.",
  onRetry
}) => {
  return (
    <div className="ion-padding ion-text-center error-container">
      <div className="error-icon-wrapper">
        <IonIcon icon={alertCircleOutline} color="danger" style={{ fontSize: '64px' }} />
      </div>

      <IonText color="dark">
        <h2 style={{ fontWeight: 'bold' }}>Oops! Something went wrong</h2>
      </IonText>

      <IonLabel color="medium">
        <p style={{ margin: '10px 40px' }}>{message}</p>
      </IonLabel>

      {localStorage.getItem("SGR_TOKEN") ?
        <IonButton
          expand="block"
          fill="outline"
          color="primary"
          onClick={onRetry}
          style={{ marginTop: '20px' }}
        >
          <IonIcon slot="start" icon={refreshOutline} />
          Try Again
        </IonButton> :
        <IonButton
          expand="block"
          fill="outline"
          color="danger"
          onClick={() => {
            localStorage.removeItem("SGR_TOKEN");
            location.replace("/");
          }}
          style={{ marginTop: '20px' }}
        >
          <IonIcon slot="start" icon={logOutOutline} />
          Logout
        </IonButton>}
    </div>
  );
};

export default ErrorState;