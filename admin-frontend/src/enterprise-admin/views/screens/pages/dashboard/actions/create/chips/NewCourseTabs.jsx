


import React, { useEffect} from "react";

import $ from "jquery"


import { getAuthProfile } from "../../../../../../../api/services/learner";

const ProfileScreen = () => {

 useEffect(() => {
    (async function loadContent() {
      
       
       //perform any update function or fetch
       $(document).on('click', 'li', function(){
		   $('li').removeClass('active');
		   $('ul').toggleClass('expanded');
		   $(this).addClass('active');
		   var tab_id = $(this).attr('data-tab');
		   $('.tab-content').removeClass('current');
		   $(this).addClass('current');
		   $('#'+tab_id).addClass('current');
		 });
  
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);


  return (
    <><div class="tabs-container">
        <nav class="tabs">
		    <ul>
		      <li class="active" data-tab="tab-1">Course Basic Information</li>
		      <li data-tab="tab-2">Course Analytics</li>
		      <li data-tab="tab-3">Course Overview</li>
		      <li data-tab="tab-4">Media Uploads</li>
		      <li data-tab="tab-5">Instructors</li>
		     
		    </ul>
		  </nav>
	</div>
    </>
  );
};

export default ProfileScreen;
