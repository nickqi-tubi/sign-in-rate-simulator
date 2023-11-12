import { useEffect } from 'react';

import user from 'models/user';

import styles from './App.module.scss';

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
