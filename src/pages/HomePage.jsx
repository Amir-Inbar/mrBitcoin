import React, { Component } from 'react';
import { userService } from '../services/userService';
import { bitcoinService } from '../services/bitcoinService';
import MovesList from '../cmps/MovesList';
import { connect } from 'react-redux';
import { signOut } from '../store/actions/userAction';

class _HomePage extends Component {
  state = {
    user: null,
    rate: null,
    marketData: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    this.setState(
      { user: await userService.getUser('Amir') },
      () => this.getBitcoinRate(),
      this.getMarketData()
    );
  };

  getBitcoinRate = async () => {
    const { user } = this.state;
    this.setState(
      {
        rate: await bitcoinService.getRate(user.coins),
      },
      () => {
        console.log(this.state.rate);
      }
    );
  };

  signOut = () => {
    this.props.signOut();
    this.props.history.push('/signup');
  };

  getMarketData = async () => {
    this.setState({ marketData: await bitcoinService.getCurrenciesData() });
  };

  render() {
    const { user, rate, marketData } = this.state;
    if (!user || !rate) return <div className="loading">Loading...</div>;
    console.log(marketData);
    return (
      <section className="homepage-container ">
        <button className="log-out" onClick={this.signOut}>
          Log Out
        </button>
        <div className="user-greet flex">
          <img src={`assets/img/${user.img}`} alt="" />
          <h1 className="user-name">Hey {user.name}!,</h1>
        </div>
        <div className="user-main flex">
          <div className="user-wallet">
            <h1>My Wallet</h1>
            <div className="titles">
              <span>Total Balance:</span>฿{user.coins}
            </div>
            <div className="titles">
              <span>Current BTC in USD :</span>$
              {((user.coins / rate) * user.coins).toFixed(2)}
            </div>
            <MovesList moves={user.moves} />
          </div>
          <div className="market">
            <h1>Market details</h1>
            <div>
              <span>BTC: </span> ${(user.coins / rate).toFixed(2)}
            </div>
            <div>
              {' '}
              <span>ABC:</span> ${(marketData.ABC / rate).toFixed(2)}
            </div>
            <div>
              {' '}
              <span>ETH:</span> ${(marketData.ETH / rate).toFixed(2)}
            </div>
            <div>
              {' '}
              <span>ETC:</span> ${(marketData.ETC / rate).toFixed(2)}
            </div>
            <div>
              {' '}
              <span>PBT:</span> ${(marketData.PBT / rate).toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = {
  signOut,
};

export const HomePage = connect(null, mapDispatchToProps)(_HomePage);
