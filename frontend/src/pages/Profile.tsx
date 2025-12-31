import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { apiFetcher } from '../utils/api';
import ListViewSkeleton from '../components/ListViewSkeleton';
import ErrorState from '../components/ErrorState';
import ProfileCard from '../components/ProfileCard';

const Profile: React.FC = () => {
  const { data, isLoading, error, mutate } = useSWR('/users/me', apiFetcher);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
        <IonToolbar style={{ textAlign: 'center' }}>
          <IonText color="primary">View Your Profile Information</IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading ? <ListViewSkeleton /> :
          error ? <ErrorState message={error.message} onRetry={() => mutate()} /> :
            <ProfileCard
              user={{
                name: data?.user_name,
                email: 'someone@example.com',
                role: data?.accesspage_name,
                avatar: `https://ui-avatars.com/api/?name=${data?.user_name}`,
                stats: [
                  { label: 'Orders', value: '1,234' },
                  { label: 'Sales', value: '567' },
                  { label: 'Customers', value: '890' },
                ],
              }}
            />}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
