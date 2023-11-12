import { useEffect } from 'react';

import styles from './App.module.scss';
import user from 'models/user';

const App = () => {
  useEffect(() => {
    console.log('enter App!!', user);
  }, []);

  return (
    <div className={styles.root}>
      <h1>Sign-In Rate Simulator</h1>
    </div>
  );
};

export default App;
