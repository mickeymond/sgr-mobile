import React from 'react';
import {
  IonCard, IonCardContent, IonAvatar, IonText,
  IonButton, IonIcon, IonGrid, IonRow, IonCol
} from '@ionic/react';
import { mailOutline, personAddOutline } from 'ionicons/icons';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    stats: { label: string; value: string }[];
  };
}

const ProfileCard: React.FC<ProfileProps> = ({ user }) => {
  return (
    <IonCard className="profile-card">
      {/* Decorative Header Background */}
      <div className="profile-header-bg"></div>

      <IonCardContent className="ion-text-center profile-content">
        {/* Overlapping Avatar */}
        <div className="avatar-container">
          <IonAvatar className="profile-avatar">
            <img src={user.avatar} alt={user.name} />
          </IonAvatar>
          <div className="status-indicator online"></div>
        </div>

        {/* User Info */}
        <div className="user-info-section">
          <IonText>
            <h2 className="user-name">{user.name}</h2>
          </IonText>
          <IonText>
            <p className="user-role">{user.role}</p>
          </IonText>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <IonButton fill="solid" color="primary" shape="round">
            <IonIcon slot="start" icon={personAddOutline} />
            Follow
          </IonButton>
          <IonButton fill="outline" shape="round">
            <IonIcon icon={mailOutline} />
          </IonButton>
        </div>

        {/* Stats Grid */}
        <IonGrid className="stats-grid">
          <IonRow>
            {user.stats.map((stat, index) => (
              <IonCol key={index}>
                <IonText>
                  <div className="stat-value">{stat.value}</div>
                </IonText>
                <IonText>
                  <div className="stat-label">{stat.label}</div>
                </IonText>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default ProfileCard;