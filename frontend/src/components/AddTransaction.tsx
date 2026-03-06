import React, { useState } from 'react';
import { IonContent, IonItem, IonSelect, IonSelectOption, IonInput, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonSearchbar, IonList, IonLabel } from "@ionic/react";
import useSWR from 'swr';
import { apiFetcher } from '../utils/api';
import { Customer } from '../types';

const AddTransaction: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const { data, error, isLoading } = useSWR(`/customers${searchQuery ? '?q=' + encodeURIComponent(searchQuery) : ''}`, apiFetcher);

  // Save to localStorage
  const saveToLocalStorage = (key: string, value: string | number | null | undefined) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    saveToLocalStorage('SGR_CUSTOMER_REF', customer.customer_ref);
    setIsModalOpen(false);
  };

  return (
    <IonContent className="ion-padding">
      <IonItem button onClick={() => setIsModalOpen(true)}>
        <IonLabel>Customer</IonLabel>
        <div slot="end" style={{ color: selectedCustomer ? 'inherit' : 'gray' }}>
          {selectedCustomer ? `${selectedCustomer.first_name} ${selectedCustomer.last_name}` : 'Select Customer'}
        </div>
      </IonItem>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Select Customer</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModalOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar 
              value={searchQuery} 
              onIonInput={(e) => setSearchQuery(e.detail.value!)} 
              debounce={300} 
              placeholder="Search customers..." 
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {isLoading ? (
            <div className="ion-padding">Loading...</div>
          ) : error ? (
            <div className="ion-padding">Error: {error.message}</div>
          ) : data?.length === 0 ? (
            <div className="ion-padding">No customers found.</div>
          ) : (
            <IonList>
              {data?.map((customer: Customer) => (
                <IonItem key={customer.customer_ref} button onClick={() => handleCustomerSelect(customer)}>
                  <IonLabel>
                    <h2>{customer.first_name} {customer.last_name}</h2>
                    {customer.other_name && <p>{customer.other_name}</p>}
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
        </IonContent>
      </IonModal>

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
