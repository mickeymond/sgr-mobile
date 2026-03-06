import React from 'react';
import { IonIcon, IonText } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = 'No Results Found', 
  message = 'Try adjusting your search or filters to find what you are looking for.', 
  icon = searchOutline 
}) => {
  return (
    <div className="ion-padding" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', marginTop: '2rem' }}>
      <IonIcon icon={icon} style={{ fontSize: '4rem', color: 'var(--ion-color-medium)', marginBottom: '1rem' }} />
      <IonText color="dark">
        <h2 style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{title}</h2>
      </IonText>
      <IonText color="medium">
        <p style={{ margin: 0, maxWidth: '250px' }}>{message}</p>
      </IonText>
    </div>
  );
};

export default EmptyState;
