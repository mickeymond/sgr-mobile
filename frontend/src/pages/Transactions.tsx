import { IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import useSWR from 'swr';
import { apiClient, apiFetcher } from '../utils/api';
import { useRef } from 'react';
import { add, chevronForward, enter, exit } from 'ionicons/icons';
import AddTransaction from '../components/AddTransaction';
import { useIonAlert } from '@ionic/react';
import ListViewSkeleton from '../components/ListViewSkeleton';
import ErrorState from '../components/ErrorState';

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
            (<>
              <IonList>
                {data.map((transaction: any) => (
                  <IonItem key={transaction.transaction_id} detail={false} button>
                    <IonIcon
                      icon={transaction.transaction_type === 'Deposit' ? enter : exit}
                      color={transaction.transaction_type === 'Deposit' ? 'success' : 'danger'}
                      slot="start"
                    />

                    <IonLabel>
                      <h2>{transaction.transaction_type}</h2>
                      <p>Customer Ref: <strong>{transaction.first_name} {transaction.last_name}</strong></p>
                      <p className="subtext">Amount: <strong>GHS {transaction.amount}</strong></p>
                    </IonLabel>

                    <IonIcon icon={chevronForward} color="medium" slot="end" />
                  </IonItem>
                ))}
              </IonList><IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton id="open-modal">
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab><IonModal ref={modal} trigger="open-modal">
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
            </>)}
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
