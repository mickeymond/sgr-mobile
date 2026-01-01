import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, person, cash } from 'ionicons/icons';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/"
              render={() => localStorage.getItem("SGR_TOKEN") ? <Redirect to="/customers" /> : <Login />} />
          </IonRouterOutlet>
          {localStorage.getItem("SGR_TOKEN") && <IonTabBar slot="bottom">
            <IonTabButton tab="customers" href="/customers">
              <IonIcon aria-hidden="true" icon={people} />
              <IonLabel>Customers</IonLabel>
            </IonTabButton>
            <IonTabButton tab="transactions" href="/transactions">
              <IonIcon aria-hidden="true" icon={cash} />
              <IonLabel>Transactions</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon aria-hidden="true" icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
