import React, {Fragment} from 'react';
import LaunchItem from "./launchItem";
import {useQuery, gql} from "@apollo/client";

const LAUNCHES_QUERY = gql`
   query LaunchesQuery {
      launches {
        mission_name
        flight_number
        launch_year
        launch_success
        launch_date_local
      }
   }
`;

const Launches = () => {
   const { loading, error, data } = useQuery(LAUNCHES_QUERY);
   const renderData = () => {
      if(loading){
         return (
            <h1>Loading...</h1>
         )
      }else  if (error){
         console.log(error)
      }else{
         return <Fragment>
            {
               data.launches.map(launch =>  <LaunchItem key={launch.flight_number} launch={launch}/>)
            }
         </Fragment>
      }
   }
   return (
      <Fragment>
         <h1 className="display-4 my-3">Launches</h1>
         {renderData()}
      </Fragment>
   );
};

export default Launches;
