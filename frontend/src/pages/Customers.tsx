import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { apiFetcher } from '../utils/api';

const Customers: React.FC = () => {
  const { data, error, isLoading, mutate } = useSWR('/customers', apiFetcher);

  const handleRefresh = async (event: CustomEvent) => {
    await mutate();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Customers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Customers</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <IonList>
            {data.map((customer: any) => (
              <IonItem key={customer.customer_ref}>
                <IonLabel>{customer.first_name} {customer.last_name}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Customers;
