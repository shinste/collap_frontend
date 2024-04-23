import HomepageHeader from '../components/HomepageHeader';
import NotificationList from '../components/NotificationList';
import Calendar from '../components/Calendar';

const Homepage = () => {


    return (
      <body>
        <HomepageHeader />
        <div className='flex-container' style={{marginTop: '4rem'}}>
          <NotificationList />
          <Calendar /> 
        </div>
      </body>
    );
  }




export default Homepage;