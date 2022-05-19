import React from 'react';
import { Styles } from '../styles/courseSearch.js';

function CourseSearch({setSearch, search}) {

    
        return (
            <Styles>
                {/* Course Search */}
                <div className="course-search">
                    <h5>Search Course</h5>
                    {/* {search} */}
                    <form action="#">
                        <input type="text" name="search" placeholder="Search Here" onChange={e => setSearch(e.target.value)} />
                        <button type="submit"><i className="las la-search"></i></button>
                    </form>
                </div>
            </Styles>
        )
   
}

export default CourseSearch
