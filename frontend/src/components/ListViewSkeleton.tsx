import React from 'react';
import { IonList, IonItem, IonAvatar, IonLabel, IonSkeletonText } from '@ionic/react';

const ListViewSkeleton: React.FC = () => {
  return (
    <IonList className="user-list" style={{ background: 'transparent' }}>
      {/* Repeat 5 times to simulate a full list */}
      {[1, 2, 3, 4, 5].map((i) => (
        <IonItem key={i} lines="full" style={{ '--background': 'transparent' }}>
          <IonAvatar slot="start">
            <IonSkeletonText animated style={{ width: '48px', height: '48px' }} />
          </IonAvatar>

          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: '50%' }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: '70%' }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: '30%' }} />
            </p>
          </IonLabel>

          <div slot="end">
            <IonSkeletonText animated style={{ width: '60px', height: '24px', borderRadius: '12px' }} />
          </div>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ListViewSkeleton;