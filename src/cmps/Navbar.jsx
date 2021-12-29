import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { ImStatsDots } from 'react-icons/im';
import { AiFillContacts } from 'react-icons/ai';
import { SiBitcoin } from 'react-icons/si';
function Navbar(props) {
  return (
    <section className="navbar flex ">
      <Link to="/" title="HomePage" className="logo flex">
        Mr.Bitcoin <SiBitcoin />
      </Link>
      <div className="main-header flex align-center">
        <Link to="/" title="statistic">
          <FaHome />
        </Link>
        <Link to="/statistic" title="statistic">
          <ImStatsDots />
        </Link>
        <Link to="/contacts" title="statistic">
          <AiFillContacts />
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
