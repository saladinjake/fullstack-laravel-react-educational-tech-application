import React,{useEffect, useState} from "react";
import AdminNavBar from "components/Navbar/AdminNavbar";
import { BreadcrumbBox } from "components/common/Breadcrumb";
import InstructorBox from "../../components/InstructorBox";
import Footer from "components/Footer";
import {  getCourses } from 'services/course';


import {  getDashboardInfo } from "services/dashboard"
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLearners } from "services/admin.js";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";
const DashBoard = ({ auth: { user } }) => {

    const [courseTotal, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
      const [learnersTotal, setLearners] = useState([]);
      const [summary, setSummary] = useState({})

  useEffect(() => {
    (async function loadContent() {

      try{

          let dashboard = await getDashboardInfo()
        console.log(dashboard.data.data)
        setSummary({...dashboard.data.data})

        let res = await getCourses();
        console.log(res.data.data)
        setDetails([...res.data.data.courses])


        let allLearners = await getLearners();
        console.log(allLearners.data)
        setLearners([...allLearners.data.data]);

        //everything about instructors fetch is not working

      

      }catch(err){
        console.log(err)
        toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

      }

      setLoading(false);
      

    })();
  },[]);


  const activeFilteredCourses = courseTotal.filter(course =>{
    return parseInt( course.status) === 1
  })


  return (
    <div className="main-wrapper">
      <AdminNavBar />
      {/*<BreadcrumbBox title="Admin Dashboard" />*/}

       {loading ? (
                  <Loader width="70" />
                ) : summary?.total_learners ? (
                <div>
      <InstructorBox 
            courseTotal={courseTotal.length} 
            
            user={user}
            learnersTotal={learnersTotal.length}
            summary={summary}

             />
        <Footer />
        </div>

      ) :(
                  <p>No Details Found .</p>
          )}
    </div>
  );
};




DashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DashBoard);


// export default DashBoard;
