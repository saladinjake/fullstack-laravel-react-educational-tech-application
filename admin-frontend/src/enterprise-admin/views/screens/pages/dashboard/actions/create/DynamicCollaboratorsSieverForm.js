import React from "react";
import toast from "react-hot-toast";
const ReactTransitionGroup = require("react-transition-group")
const { CSSTransitionGroup } = ReactTransitionGroup;

class InstructorGeneratedPills extends React.Component {
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
			myItems: [],
			leadCollaborators:[],
			myIds:[]

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

	handleKeypress(event) {
		if (event.key == "Enter") {
			var newArray = this.state.myItems;
			var myIds = this.state.myIds;
			var currentcontent = this.state.content_add.trim();
			if (!currentcontent) {
				  toast.error("Please Enter and instructor email")
				return; 
			}


			let matchedInstructor = this.props.list.find(instructor => {
				// console.log(instructor?.email,currentcontent)
               return instructor?.email === currentcontent 
            })
		    if(matchedInstructor?.email && (matchedInstructor?.email=== currentcontent)){
		         
		       

		          	var currentWidth = this.helperspan.offsetWidth;
						newArray.push({
							content: currentcontent, 
							id: ++this.lastId, 
							itemWidth: currentWidth + 2,
						user_id:matchedInstructor?.id,
							email:matchedInstructor?.email,
							first_name: matchedInstructor?.first_name,
							last_name: matchedInstructor?.last_name
						});
						myIds.push(matchedInstructor?.id)
						
						this.setState({
							myItems: newArray,
							content_add: "",
							leadInstructor: newArray,
							myIds:myIds
						});
						// toast.success(" "+ [...this.state.myIds])
                        
						let res =this.props.handleAction([...this.state.myIds],"unlimited")

		                toast.success(`${currentcontent} has been added as collaborator for this course lead Instructor`)
		             return true

		     }else{
                    
		          	console.log("no matched found")
		              toast.error("Some error occured")
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

		let res =this.props.handleAction(this.state.myItems,"unlimited")
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

       <aside  style={{position:"relative",float:"left", marginTop:"50px"}}>
  
				  <header>
				    
				    
				    <a href={process.env.PUBLIC_URL + "/admin/instructors/"+ listitem.id}>
				      {listitem?.image_url?.length> 0 ? ( <img src={listitem?.image_url} alt="noimage" />) : (<img alt="nogivenimage" src="http://gravatar.com/avatar/eb2d48c7f2cf027bb4cb20483e27c9c9?size=200px" />)}
				    </a>

				   
				    <h1>{listitem.first_name} {listitem.last_name}</h1>
				    
				   
				    <h2>{listitem?.brief_introduction}</h2>
				    
				  </header>
				  
				</aside>

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

          </div>			


		));
		return elements

	}

	render() {
		return (
			<div className="dynamic_input">


				{/*<CSSTransitionGroup
					transitionName="item-transition"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={210}
				>
									{this.makeAddedList()}

				</CSSTransitionGroup>*/}

				<p style={{background:"#f5f5f5", margin: "10px", padding:"4px"}}>Note**: You can search for an instructors who will collaborate on this course  by email 
				


				 <br/><span>(Continue this process for other collaborators by adding their email)</span>
                 <br/><span>(Enter an email and then hit enter )</span>
                </p>
				{this.makeAddedList()}

				
			<input className="form-control"
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
		);
	}
}

export default InstructorGeneratedPills