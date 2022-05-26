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

	handleKeypress(event) {
		if (event.key == "Enter") {
			var newArray = this.state.myItems;
			var currentcontent = this.state.content_add.trim();
			if (!currentcontent) {
				return; 
			}


			let matchedInstructor = this.props.list.find(instructor => {
				console.log(instructor?.instructor_profile?.user?.email,currentcontent)
               return instructor?.instructor_profile.user?.email === currentcontent 
            })
		    if(matchedInstructor?.instructor_profile?.user?.email && (matchedInstructor?.instructor_profile?.user?.email=== currentcontent)){
		          console.log(matchedInstructor)
		          if(this.props.sizeOfArray==="1"){
		          	var currentWidth = this.helperspan.offsetWidth;
						// newArray.push({
						// 	content: currentcontent, 
						// 	id: ++this.lastId, 
						// 	itemWidth: currentWidth + 2
						// });
						newArray = [{
							id: ++this.lastId,
							user_id:matchedInstructor?.id,
							content:matchedInstructor?.instructor_profile.user?.email,
						 	first_name: matchedInstructor?.instructor_profile.user?.first_name,
						 	last_name: matchedInstructor?.instructor_profile.user?.last_name,
						itemWidth: currentWidth + 2
						 }]
						this.setState({
							myItems: newArray,
							content_add: "",
							leadInstructor: newArray
						});

						let res =this.props.handleAction(matchedInstructor?.id,1)

		                toast.success(`${currentcontent} has been added as lead Instructor`)
		             return true
		          }else if(this.props.sizeOfArray ==="unlimited"){

		          	var currentWidth = this.helperspan.offsetWidth;
						newArray.push({
							content: currentcontent, 
							id: ++this.lastId, 
							itemWidth: currentWidth + 2,
						user_id:matchedInstructor?.id,
							email:matchedInstructor?.instructor_profile.user?.email,
							first_name: matchedInstructor?.instructor_profile.user?.first_name,
							last_name: matchedInstructor?.instructor_profile.user?.last_name
						});
						
						this.setState({
							myItems: newArray,
							content_add: "",
							leadInstructor: newArray
						});
						toast.success(" "+ this.state.myItems)
                        
						let res =this.props.handleAction([...this.state.myItems],"unlimited")

		                toast.success(`${currentcontent} has been added as collaborator for this course lead Instructor`)
		             return true

		          }else{
                    
		          	console.log("no matched found")
		              toast.error("Some error occured")
		              return false;

		          }
		              
		  }else{
		  	console.log("no matched found")
		    toast.error("no matched found")
		    return false;

		  }
		        
	}      
		      
		        

			

				

				
				

			
			
			
		
	}

	handleBlur(event) {
		this.setState({ content_add: "add +" });
	}

	handleClick(event) {
        // delete event for enter
		if(this.props.sizeOfArray==="1"){
			let currentcontent =""
			let res =this.props.handleAction(currentcontent,1)

			const idToRemove = Number(event.target.dataset["item"]);
		    const newArray = this.state.myItems.filter((listitem) => {return listitem.id !== idToRemove});
		    this.setState({ myItems: newArray });
			return
		}
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


				{this.makeAddedList()}

           <div className="container card-box col-lg-8" style={{padding:"40px"}}>
				
			<input
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