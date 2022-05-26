import React from "react";
import toast from "react-hot-toast";
import { getInstructors, getLearners } from "services/admin"

import { getActivated, getDeactivated, getDeleted, upgradeLearner } from "services/instructor"
import "./card.css"
const ReactTransitionGroup = require("react-transition-group")
const { CSSTransitionGroup } = ReactTransitionGroup;



class InstructorGeneratedPills extends React.Component {


	fetchInstructors = async () => {
	    Promise.all(
	      [
	       
	        // getInstructors(),
	        getLearners()

	      ].map((err) => err.catch(() => err))
	    )
	      .then((res) => {
	       
	         this.setState({list: [...res[0].data.data], loading:false})
	         
	        // setLoading(false);
	      })
	      .catch((err) => {
	        toast.error("Error Occured fetching data");

	        this.setState({loading:true})
	      });
	  };

	async componentDidMount(){
           await this.fetchInstructors()
	}
	constructor(props) {
		super(props);
		console.log(props)
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeypress = this.handleKeypress.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.helperspan = null; // is set via ref
		
		this.state = {
			loading:true,
			currentcolor: [
				"#531CB3",
				"#7149EE",
				"#B754FF",
				"#ED4FEF",
				"#ED49AB",
				"#ED4FEF",
				"#B754FF",
				"#7149EE"
			],
			content_add: "add  +",
			width: 100,
			list:[],
			myItems: [],
			leadInstructor:'',

		};
		this.lastId = -1;
	}


	handleFocus(event) {
		this.setState({ content_add: "" });
	}
	
	handleChange(event) {
		const usr_input = event.target.value;
		this.setState({ content_add: usr_input });
	}


	handleUpgradeToInstructor = async (id) => {

     try{
      await upgradeLearner(id)
      toast.success(`successfully upgraded to instructor`)
      window.location.href= process.env.PUBLIC_URL+ "/admin/instructors"
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured upgrading learner`
      );

    }

  }




  handleActivate = async (id) => {
    try{
      await getActivated(id)
       toast.success(`successfully activated user`)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }


   handleDeactivate = async (id) => {
    try{
      await getDeactivated(id)
       toast.success(`successfully deactivated user`)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }


   handleDelete = async (id) => {
    try{
      await getDeleted(id)
      toast.success(`successfully deleted user`)
    }catch(err){
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );

    }
  }


	handleKeypress(event) {
		if (event.key == "Enter") {
			var newArray = this.state.myItems;
			var currentcontent = this.state.content_add.trim();
			if (!currentcontent) {
				toast.error("no matched found")
				return; 
			}


			let matchedLearners = this.state.list.find(learner => {
				console.log(learner)
				console.log(learner?.email,currentcontent)
               return learner?.email === currentcontent 
            })
		    if(matchedLearners?.email && (matchedLearners?.email=== currentcontent)){
		          console.log(matchedLearners)
		          
		          	var currentWidth = this.helperspan.offsetWidth;
						// newArray.push({
						// 	content: currentcontent, 
						// 	id: ++this.lastId, 
						// 	itemWidth: currentWidth + 2
						// });
						newArray = [{
							id: ++this.lastId,
							user_id:matchedLearners?.id,
							content:matchedLearners?.email,
						 	first_name: matchedLearners?.first_name,
						 	last_name: matchedLearners?.last_name,
						itemWidth: currentWidth + 2
						 }]
						this.setState({
							myItems: newArray,
							content_add: "",
							leadInstructor: newArray
						});

		             return true
		         

		         
		              
		  }else{
		  	console.log("no matched found")
		    toast.error("User not found on our platform")
		    return false;

		  }
		        
	   }      
		      
		        	
	}

	handleBlur(event) {
		this.setState({ content_add: "add +" });
	}

	handleClick(event) {
        
		const idToRemove = Number(event.target.dataset["item"]);
		const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
		this.setState({ myItems: newArray });

		
	}
	
	

	componentDidUpdate(prevProps, prevState) {
		if (prevState.content_add != this.state.content_add) {
			//console.log('did update, content:', this.helperspan.textContent, 'width', this.helperspan.offsetWidth);
			const helperWidth = this.helperspan.offsetWidth;
			this.setState({ width: Math.max(50, helperWidth + 1) });
		}
	}

	makeAddedList() {
		
		const elements =  this.state.myItems.map((listitem, index) => (
			<div>
			


			<aside >
  
				  <header>
				    
				    
				    <a href={process.env.PUBLIC_URL + "/admin/learners/"+ listitem.id}>
				      {listitem?.image_url?.length> 0 ? ( <img src={listitem?.image_url} alt="noimage" />) : (<img alt="nogivenimage" src="http://gravatar.com/avatar/eb2d48c7f2cf027bb4cb20483e27c9c9?size=200px" />)}
				    </a>

				   
				    <h1>{listitem.first_name} {listitem.last_name}</h1>
				    
				   
				    <h2>{listitem?.brief_introduction}</h2>
				    
				  </header>
				  

				  <div class="profile-bio">
				    
				    <p>{listitem?.detailed_introduction}</p>
				    
				  </div>
				  
				 
				  <ul class="p profile-social-links">
				    
				   
				    <li>
				      <a href={listitem?.facebook_url}>
				        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg" />
				      </a>
				    </li>
				    
				    
				    <li>
				      <a href={listitem?.twitter_url}>
				        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg" />
				      </a>
				    </li>
				    

				    <li>
				      <a href={listitem?.linkedin_url}>
				        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg" />
				      </a>
				    </li>
				    
				  
				    
				  </ul>

				  <div className="containerActions">
              <h4>Upgrade {listitem.first_name} {listitem.last_name} ?</h4>

			<button className="btn btn-small" type="submit" onClick={ (e) =>{

                           e.target.textContent ="Loading..."
                            e.target.innerHTML ="Loading..."
                             e.target.value ="Loading..."
                           
                           this.handleUpgradeToInstructor(listitem.user_id)
                           // setTimeout( ()=>{ e.target.innerHTML ="Upgrade To Learner"},3000)
                          
                          }} className="cart-btn btn btn-success">
                            Upgrade User 
            </button>
            </div>

            <li
				key={listitem.id}
				onClick={this.handleClick}
				data-item={listitem.id}
				style={{
					backgroundColor: this.state.currentcolor[
						index % this.state.currentcolor.length
					],
					width: listitem.itemWidth
				}}
			>
				{listitem.content}
			</li>
				  
				</aside>


			<div className="containerActions">
             
			
			



			{/*<button className="btn btn-small" type="submit" onClick={ (e) =>{
                            // e.preventDefault()
                            e.target.textContent ="Loading"
                            e.target.textContent ="Loading..."
                            e.target.innerHTML ="Loading..."
                             e.target.value ="Loading..."
                            
                            this.handleActivate(listitem.user_id)

                            // setTimeout( ()=>{ e.target.innerHTML ="Activate"},3000)
                            // e.target.textContent ="Activate"
                          }} className="cart-btn btn btn-success">
                          Activate
                        </button>


                       





                        <button className="btn btn-small" type="submit" onClick={ (e) =>{
                           // e.preventDefault()
                           e.target.textContent ="Loading"
                            e.target.textContent ="Loading..."
                            e.target.innerHTML ="Loading.."
                             e.target.value ="Loading."
                           
                           this.handleDeactivate(listitem.user_id)
                           
                           // setTimeout( ()=>{ e.target.innerHTML ="Deactivate"},3000)
                          }} className="cart-btn btn btn-info">
                            Deactivate
                        </button>

                        <button className="btn btn-small" type="submit" onClick={ (e) =>{
                             // e.preventDefault()
                              e.target.textContent ="Loading"
                            e.target.textContent ="Loading..."
                            e.target.innerHTML ="Loading.."
                             e.target.value ="Loading."
                             this.handleDelete(listitem.user_id)
                            // setTimeout( ()=>{ e.target.innerHTML ="Delete"},3000)
                             
                             
                        }} className="cart-btn btn btn-danger">
                          Delete
                        </button>



                        <button className="btn btn-main">Send Verification Code</button> */}
</div>


                
			</div>
		));
		return elements

	}

	render() {
		return (
			<div className="dynamic_input">
                  <h4>Enter a unique user email to upgrade to Instructor</h4>
                  <span>(press enter when done)</span>

				{/*<CSSTransitionGroup
					transitionName="item-transition"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={210}
				>
									{this.makeAddedList()}

				</CSSTransitionGroup>*/}


				{this.makeAddedList()}

           <div className="container  col-lg-12" style={{padding:"40px",background:"#fafafa"}}>
				
			<input
			className="form-control"
			style={{width:"100%", backgroundColor:"#fff"}}
					id="add"
					type="text"
					name="initvalue"
					autoComplete="off"
				  maxLength="70"
					onFocus={this.handleFocus}
					onChange={this.handleChange}
					onKeyPress={this.handleKeypress}
					onBlur={this.handleBlur}
					value={this.state.content_add}
					style={{ width: this.state.width }}
					className="form-control"
				/>

				<span id="helperspan" ref={el => (this.helperspan = el)}>
					{this.state.content_add}
				</span>


			</div>

			</div>
		);
	}
}

export default InstructorGeneratedPills