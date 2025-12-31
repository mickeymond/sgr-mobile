import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { IonText } from '@ionic/react';
import { apiFetcher } from '../utils/api';
import ListViewSkeleton from '../components/ListViewSkeleton';
import ErrorState from '../components/ErrorState';

const Profile: React.FC = () => {
  const { data, isLoading, error, mutate } = useSWR('/users/me', apiFetcher);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isLoading ? <ListViewSkeleton /> :
          error ? <ErrorState message={error.message} onRetry={() => mutate()} /> :
            (
              <>
                <IonText>{data?.user_name}</IonText>
                <IonText>{data?.accesspage_name}</IonText>
              </>
            )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
