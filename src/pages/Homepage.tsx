import HomepageHeader from '../components/HomepageHeader';
import NotificationList from '../components/NotificationList';
import Calendar from '../components/Calendar';

const Homepage = () => {


    return (
      <body>
        <HomepageHeader />
        <div className='flex-container'>
          <NotificationList />
          <Calendar /> 
        </div>
      </body>
    );
  }




export default Homepage;