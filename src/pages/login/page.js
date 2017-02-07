import React from 'react';
import { browserHistory } from 'react-router';
import styles from './style.css';


export default class LoginPage extends React.Component {
  signUp() {
    browserHistory.push('/view');
  }
  
  render() {
    return (
      <div className={styles.content}>
        <p>default page</p>
        <button className={styles.signUpButton} onClick={this.signUp}>View</button>
      </div>
    );
  }
}
