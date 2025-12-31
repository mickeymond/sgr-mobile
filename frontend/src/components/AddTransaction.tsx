import { IonContent, IonItem, IonSelect, IonSelectOption, IonInput } from "@ionic/react";
import useSWR from 'swr';
import { apiFetcher } from '../utils/api';


const AddTransaction: React.FC = () => {
  const { data, error, isLoading } = useSWR('/customers', apiFetcher);

  // Save to localStorage
  const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return (
    <IonContent className="ion-padding">
      <IonItem>
        <IonSelect
          label="Customer"
          placeholder="Select Customer"
          onIonChange={(e) => saveToLocalStorage('SGR_CUSTOMER_REF', e.detail.value)}>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            data?.map((customer: any) => (
              <IonSelectOption key={customer.customer_ref} value={customer.customer_ref}>
                {customer.first_name} {customer.last_name}
              </IonSelectOption>
            ))
          )}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect
          label="Transaction Type"
          placeholder="Select Transaction Type"
          onIonChange={(e) => saveToLocalStorage('SGR_TRANSACTION_TYPE', e.detail.value)}>
          <IonSelectOption value="Deposit">Deposit</IonSelectOption>
          <IonSelectOption value="Withdrawal">Withdrawal</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput
          label="Amount"
          labelPlacement="fixed"
          type="number"
          onIonChange={(e) => saveToLocalStorage('SGR_AMOUNT', e.detail.value)}
        />
      </IonItem>
    </IonContent>
  );
};

export default AddTransaction;
