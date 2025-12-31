import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { apiClient, apiFetcher } from '../utils/api';
import { useRef } from 'react';
import { add } from 'ionicons/icons';
import AddTransaction from '../components/AddTransaction';
import { useIonAlert } from '@ionic/react';

const Transactions: React.FC = () => {
  const { data, error, isLoading, mutate } = useSWR('/transactions', apiFetcher);
  const modal = useRef<HTMLIonModalElement>(null);
  const [presentAlert] = useIonAlert();

  const confirm = async () => {
    const customerRef = localStorage.getItem('SGR_CUSTOMER_REF');
    const transactionType = localStorage.getItem('SGR_TRANSACTION_TYPE');
    const amount = localStorage.getItem('SGR_AMOUNT');

    if (!customerRef || !transactionType || !amount) {
      presentAlert({
        header: 'Error',
        message: 'Please select a customer, transaction type, and amount.',
        buttons: ['OK'],
      });
      return;
    }

    const response = await apiClient.post('/transactions', {
      customer_ref: JSON.parse(customerRef),
      transaction_type: JSON.parse(transactionType),
      amount: JSON.parse(amount),
    });

    if (response.status !== 200) {
      presentAlert({
        header: 'Error',
        message: 'Failed to add transaction.',
        buttons: ['OK'],
      });
      return;
    }

    presentAlert({
      header: 'Success',
      message: 'Transaction added successfully.',
      buttons: ['OK'],
    });

    localStorage.removeItem('SGR_CUSTOMER_REF');
    localStorage.removeItem('SGR_TRANSACTION_TYPE');
    localStorage.removeItem('SGR_AMOUNT');

    modal.current?.dismiss();
    await mutate();
  }

  const handleRefresh = async (event: CustomEvent) => {
    await mutate();
    event.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Transactions</IonTitle>
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
            {data.map((transaction: any) => (
              <IonItem key={transaction.transaction_id}>
                <IonLabel>{transaction.transaction_type} | {transaction.amount} | {transaction.customer_ref}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="open-modal">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Transaction</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>Save</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>

          <AddTransaction />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
