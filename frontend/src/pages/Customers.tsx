import { IonAvatar, IonBadge, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { apiFetcher } from '../utils/api';
import ListViewSkeleton from '../components/ListViewSkeleton';
import ErrorState from '../components/ErrorState';

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
        <IonToolbar>
          <IonSearchbar
            placeholder="Search by name, email..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {isLoading ? <ListViewSkeleton /> :
          error ? <ErrorState message={error.message} onRetry={() => mutate()} /> :
            (
              <IonList>
                {data.map((customer: any) => (
                  <IonItem key={customer.customer_ref} detail={false} button className="user-item">
                    <IonAvatar slot="start">
                      <img src={`https://ui-avatars.com/api/?name=${customer.first_name} ${customer.last_name}`} alt={customer.first_name} />
                    </IonAvatar>

                    <IonLabel>
                      <h2 style={{ textDecoration: customer.strike ? 'line-through' : 'none' }}>{customer.first_name} {customer.last_name}</h2>
                      <p>{customer.email}</p>
                      <p className="subtext">{customer.phone}</p>
                    </IonLabel>

                    <div slot="end" className="item-end">
                      <IonBadge color="success" mode="ios">{customer.customer_ref}</IonBadge>
                    </div>
                  </IonItem>
                ))}
              </IonList>
            )}
      </IonContent>
    </IonPage>
  );
};

export default Customers;
